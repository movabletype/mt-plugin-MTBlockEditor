package MT::BlockEditor::Parser;

use strict;
use warnings;
use utf8;

use XML::SAX::ParserFactory;
use MT::BlockEditor::Parser::SAXHandler;

sub new {
    my $class = shift;
    my $self  = bless {}, $class;
    my $param = ref $_[0] ? $_[0] : +{@_};
    $self->{__json} = $param->{json};
    $self->{__meta} = +{};
    return $self;
}

my %entity_map = qw(
    & &amp;
    < &lt;
    > &gt;
);

sub parse {
    my $self = shift;
    my ($content) = @_;

    if ($content !~ m{\A\s*<!--\s+mt-beb}sm) {
        return [ +{
                type    => "core-html",
                meta    => {},
                blocks  => [],
                content => [$content],
        } ];
    }

    my %map_reverse = reverse %entity_map;

    $content =~ s{(@{[join '|', keys %entity_map]})}{$entity_map{$1}}ge;
    $content =~ s{&lt;!--\s+(/?mt-beb.*?)--&gt;}{
        my $tag = $1;
        $tag =~ s{(@{[join '|', keys %map_reverse]})}{$map_reverse{$1}}ge;
        "<$tag>";
    }ge;

    my $handler = MT::BlockEditor::Parser::SAXHandler->new(
        json => $self->{__json},
        meta => $self->{__meta},
    );
    my $parser = XML::SAX::ParserFactory->parser( Handler => $handler );

    $parser->parse_string(<<XML, { Source => { Encoding => 'UTF-8' } });
<xml>
$content
</xml>
XML

    my $blocks = $handler->blocks;
    $self->_parse_recursive($blocks);

    return $blocks;
}

sub _parse_recursive {
    my $self = shift;
    my ($blocks) = @_;

    for my $b (@$blocks) {
        if (my $html = delete $b->{html}) {
            $b->{blocks} = $self->parse($html);
        }
        $self->_parse_recursive($b->{blocks});
    }

}

1;
