package MT::BlockEditor::Parser;

use strict;
use warnings;
use utf8;

use XML::SAX::ParserFactory;
use MT::BlockEditor::Parser::SAXHandler;
use MT::BlockEditor::Parser::ReplaceSAXHandler;

our $NO_FALLBACK = "";

sub new {
    my $class = shift;
    my $self  = bless {}, $class;
    my $param = ref $_[0] ? $_[0] : +{@_};
    $self->{__json} = $param->{json};
    return $self;
}

my %entity_map = qw(
    & &amp;
    < &lt;
    > &gt;
);

sub _preprocess_content {
    my $self = shift;
    my ($content) = @_;

    my %map_reverse = reverse %entity_map;

    $content =~ s{(@{[join '|', keys %entity_map]})}{$entity_map{$1}}ge;
    $content =~ s{&lt;!--\s+(/?mt-beb.*?)--&gt;}{
        my $tag = $1;
        $tag =~ s{(@{[join '|', keys %map_reverse]})}{$map_reverse{$1}}ge;
        "<$tag>";
    }ge;

    return $content;
}

sub _parse_recursive {
    my $self = shift;
    my ($blocks, $meta) = @_;

    for my $b (@$blocks) {
        if (my $html = delete $b->{html}) {
            $b->{blocks} = $self->parse({
                content       => $html,
                fallback_type => $NO_FALLBACK,
                meta          => $meta,
            });
        }
        $self->_parse_recursive($b->{blocks});
    }

}

sub parse {
    my $self = shift;
    my ($args) = @_;

    my $fallback_type = exists $args->{fallback_type} ? $args->{fallback_type} : "core-html";
    my $content       = $args->{content};
    my $meta          = $args->{meta} || {};

    if ($fallback_type && $content !~ m{\A\s*<!--\s+mt-beb}sm) {
        return [
            +{
                type    => $fallback_type,
                meta    => {},
                blocks  => [],
                content => [$content],
            }];
    }

    $content = $self->_preprocess_content($content);

    my $handler = MT::BlockEditor::Parser::SAXHandler->new(
        json => $self->{__json},
        meta => $meta,
    );
    my $parser = XML::SAX::ParserFactory->parser(Handler => $handler);

    $parser->parse_string("<xml>$content</xml>", { Source => { Encoding => 'UTF-8' } });

    my $blocks = $handler->blocks;
    $self->_parse_recursive($blocks, $meta);

    return $blocks;
}

sub replace {
    my $self = shift;
    my ($args) = @_;

    my $content = $args->{content};

    return $content unless defined $content;

    if ($content !~ m{\A\s*<!--\s+mt-beb}sm) {
        require MT::Util::Log;
        MT::Util::Log::init();
        MT::Util::Log->warn('MT::BlockEditor::Parser::replace is called for content not edited by MTBlockEditor: ' . substr($content, 0, 100));
        return $content;
    }

    $content = $self->_preprocess_content($content);

    my $handler = MT::BlockEditor::Parser::ReplaceSAXHandler->new(
        json         => $self->{__json},
        meta_handler => $args->{meta_handler} // sub { $_[0] },
        text_handler => $args->{text_handler} // sub { $_[0] },
    );
    my $parser = XML::SAX::ParserFactory->parser(Handler => $handler);

    $parser->parse_string("<xml>$content</xml>", { Source => { Encoding => 'UTF-8' } });

    return $handler->replaced_string;
}

1;
