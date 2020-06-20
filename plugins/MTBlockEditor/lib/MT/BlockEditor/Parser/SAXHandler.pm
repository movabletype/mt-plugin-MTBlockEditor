package MT::BlockEditor::Parser::SAXHandler;

use strict;
use warnings;
use utf8;

use parent qw(XML::SAX::Base);

sub new {
    my $class = shift;
    my $self  = bless {}, $class;
    my $param = ref $_[0] ? $_[0] : +{@_};
    $self->{__json} = $param->{json};
    $self->{__meta} = $param->{meta};
    return $self;
}

sub start_document {
    my $self = shift;
    $self->{__top_blocks} = [];
    $self->{__cur_blocks} = [];
}

sub start_element {
    my $self = shift;
    my $data = shift;

    return unless $data->{Name} =~ m/\Amt-beb\z/i;

    my %attrs =
        map { $data->{Attributes}{$_}{Name} => $data->{Attributes}{$_}{Value} }
        keys %{ $data->{Attributes} };
    my $type = $attrs{"t"} || "core-text";
    my $meta = ( !exists $attrs{"m"} ) ? +{} : do {
        my @metas = map {
            $_ =~ m/^[^{]/
                ? $self->{__meta}{$_} || +{}
                : $self->{__json}->decode($_);
        } grep {$_} $attrs{"m"} =~ m/(\w+)(?:,|\z)|(.+)/gs;

        scalar @metas == 1
            ? $metas[0]
            : +{ map {%$_} @metas };
    };

    if ( $type eq 'core-context' ) {
        while ( my ( $k, $v ) = each(%$meta) ) {
            $self->{__meta}{$k} = $v;
        }
        push @{ $self->{__cur_blocks} }, undef;
        return;
    }

    my $block = +{
        type    => $type,
        meta    => $meta,
        html    => $attrs{"h"},
        blocks  => [],
        content => [''],
    };
    push @{ $self->{__cur_blocks} }, $block;
}

sub characters {
    my $self = shift;
    my ($data) = @_;

    return unless @{ $self->{__cur_blocks} };

    $self->{__cur_blocks}[-1]{content}[-1] .= $data->{Data};
}

sub end_element {
    my $self = shift;
    my ($data) = @_;

    return unless $data->{Name} =~ m/\Amt-beb\z/i;

    my $block = pop @{ $self->{__cur_blocks} };

    return unless $block;

    pop @{ $block->{content} } if $block->{content}[-1] eq '';

    if ( !@{ $self->{__cur_blocks} } ) {

        # current block is a top block
        push @{ $self->{__top_blocks} }, $block;
    }
    else {
        # is a sub block
        pop @{ $self->{__cur_blocks}[-1]{content} } if $self->{__cur_blocks}[-1]{content}[-1] eq '';
        push @{ $self->{__cur_blocks}[-1]{content} }, @{ $block->{content} }, '';
        push @{ $self->{__cur_blocks}[-1]{blocks} }, $block;
    }
}

sub blocks {
    my $self = shift;
    $self->{__top_blocks};
}

1;
