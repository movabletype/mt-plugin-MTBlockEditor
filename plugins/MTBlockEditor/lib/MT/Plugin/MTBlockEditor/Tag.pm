package MT::Plugin::MTBlockEditor::Tag;

use strict;
use warnings;
use utf8;

use Encode;
use JSON;
use MT::BlockEditor::Parser;
use MT::Plugin::MTBlockEditor qw(translate);

sub _br_to_newline {
    my ($str) = @_;
    $str =~ s{<br/?>}{\n}g;
    $str;
}

sub _hdlr_blocks {
    my ($ctx, $args, $cond) = @_;

    my $blocks = do {
        if (grep { defined $args->{$_} } qw(name var tag)) {
            my $value;
            if (defined(my $var = $args->{name} || $args->{var})) {
                $value = defined $ctx->var($var) ? $ctx->var($var) : '';

                if (ref($value)) {
                    if (UNIVERSAL::isa($value, 'MT::Template')) {
                        local $value->{context} = $ctx;
                        $value = $value->output();
                    } elsif (UNIVERSAL::isa($value, 'MT::Template::Tokens')) {
                        local $ctx->{__stash}{tokens} = $value;
                        $value = $ctx->slurp($args, $cond) or return;
                    }
                }
            } elsif (defined(my $tag = $args->{tag})) {
                $tag =~ s/^MT:?//i;
                require Storable;
                my $local_args = Storable::dclone($args);
                delete $local_args->{tag};
                $local_args->{convert_breaks} = 0;
                local $ctx->{'__stash'}{'tokens_else'} = undef;
                local $ctx->{_errstr} = undef;
                $value = $ctx->tag($tag, $local_args, $cond);
            }

            $value
                ? MT::BlockEditor::Parser->new(json => JSON->new)->parse({ content => $value })
                : [];
        } elsif (my $block = $ctx->{__stash}{block_editor_block}) {
            $block->{blocks};
        } else {
            [];
        }
    };

    return MT::Template::Context::_hdlr_pass_tokens_else(@_) unless @$blocks;

    my $res     = '';
    my $tok     = $ctx->stash('tokens');
    my $builder = $ctx->stash('builder');
    my $glue    = $args->{glue};
    my $vars    = $ctx->{__stash}{vars} ||= {};

    for (my $i = 0; $i <= $#$blocks; $i++) {
        my $b = $blocks->[$i];

        local $vars->{__first__}   = !$i;
        local $vars->{__last__}    = $i == $#$blocks;
        local $vars->{__odd__}     = ($i % 2) == 0;     # 0-based $i
        local $vars->{__even__}    = ($i % 2) == 1;
        local $vars->{__counter__} = $i + 1;

        local $ctx->{__stash}{block_editor_block} = $b;

        my $content_size = scalar @{ $b->{content} };
        local $vars->{__value__} =
              $content_size == 0 ? ""
            : $content_size == 1 ? $b->{content}[0]
            :                      MT::Plugin::MTBlockEditor::Block::Teamplate::Buffer->new($b->{content});
        local $vars->{type} = $b->{type};

        if ($b->{type} eq 'mt-image' && !exists $b->{meta}{alt}) {
            $b->{meta}{alt} =
                  $vars->{__value__} =~ m{ alt=(["'])(.*?)\1}i
                ? $2
                : "";
            $b->{meta}{caption} =
                $vars->{__value__} =~ m{<figcaption>(.*?)</figcaption>}i
                ? _br_to_newline($1)
                : "";
        } elsif ($b->{type} eq 'mt-file' && !exists $b->{meta}{text}) {
            $b->{meta}{text} =
                $vars->{__value__} =~ m{<a[^>]*>(.*?)</a>}i
                ? _br_to_newline($1)
                : "";
        }
        local $vars->{meta} = $b->{meta};

        my $out = $builder->build($ctx, $tok, $cond);
        return $ctx->error($builder->errstr) unless defined $out;
        $res .= $glue if defined $glue && $i && length($res) && length($out);
        $res .= $out;
    }

    $res;
}

sub _hdlr_block_asset {
    my ($ctx, $args, $cond) = @_;

    my $b = $ctx->{__stash}{block_editor_block};

    return ''
        unless $b
        && (grep { $b->{type} eq $_ } qw (mt-image mt-file))
        && $b->{meta}{assetId};

    $ctx->handler_for('asset')->invoke($ctx, { id => $b->{meta}{assetId} }, $cond);
}

package MT::Plugin::MTBlockEditor::Block::Teamplate::Buffer;

use base qw( MT::Template );

sub new {
    my $class = shift;
    my $array = ref $_[0] eq 'ARRAY' ? [@{ $_[0] }] : [@_];
    my $self  = +{ array => $array };
    bless $self, $class;
    $self;
}

sub output {
    join '', @{ $_[0]->{array} };
}

sub TO_JSON {
    shift->output;
}

1;
