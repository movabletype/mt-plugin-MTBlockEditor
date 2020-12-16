# Movable Type (r) (C) 2006-2020 Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::App;

use strict;
use warnings;
use utf8;

use Class::Method::Modifiers qw(around);
use MT::Plugin::MTBlockEditor qw(plugin blocks tmpl_param);

sub init_app {
    my ($cb, $app) = @_;

    require MT::ContentFieldType::Common;
    around 'MT::ContentFieldType::Common::html_text', sub {
        my $orig = shift;
        my ( $prop, $content_data, $app, $opts ) = @_;

        my $cb = $content_data->data->{ $prop->content_field_id . '_convert_breaks' };
        return $orig->(@_) if $cb ne 'block_editor';

        my $text = $content_data->data->{ $prop->content_field_id };
        return '' unless defined $text;
        $text = MT->apply_text_filters($text, [$cb]);

        if ( length $text > 40 ) {
            return MT::Util::encode_html( substr( $text, 0, 40 ) ) . '...';
        }
        else {
            return MT::Util::encode_html($text);
        }
    };

    require MT::Asset::Image;
    around 'MT::Asset::Image::as_html', sub {
        my $orig = shift;
        my ($self) = @_;
        my $html = $orig->(@_);
        my $app = MT->instance;

        if ($app && $app->can('param') && ($app->param('edit_field') || '') =~ m/^mt-block-editor-/) {
            $html =~ s{img \K}{data-id="@{[$self->id]}" data-url="@{[$self->url]}" };
        }

        $html;
    };
}

sub insert_after {
    my ( $tmpl, $id, $tokens ) = @_;

    my $before = $id ? $tmpl->getElementById($id) : undef;

    if ( !ref $tokens ) {
        $tokens = plugin()->load_tmpl($tokens)->tokens;
    }

    foreach my $t (@$tokens) {
        $tmpl->insertAfter( $t, $before );
        $before = $t;
    }
}

sub load_extensions {
    my ($param) = @_;

    my $regs = MT::Component->registry('editors', 'block_editor');
    if ($regs && ref $regs eq 'ARRAY') {
        for my $reg (@$regs) {
            my $plugin = $reg->{plugin};
            my $tmpls  = $param->{block_editor_extensions} ||= {
                templates  => [],
                extensions => [],
                config     => {},
            };

            foreach my $k ( 'extension' ) {
                my $conf = $reg->{$k};
                next unless defined $conf;
                if ( !ref $conf ) {
                    $conf = {
                        template => $conf,
                        order    => 5,
                    };
                }

                if ( my $tmpl = $plugin->load_tmpl( $conf->{template} ) )
                {
                    push(
                        @{ $tmpls->{ $k . 's' } },
                        { %$conf, tmpl => $tmpl, v => $plugin->version }
                    );
                }
            }

            $tmpls->{config}
                = { %{ $tmpls->{config} }, %{ $reg->{'config'} } }
                if $reg->{'config'};
            delete $tmpls->{config}{plugin};
        }
    }
}

sub template_param_edit_content_data {
    my ( $cb, $app, $param, $tmpl ) = @_;

    my $blog    = $app->blog;
    my $blog_id = $blog ? $blog->id : 0;

    my $tmpl_param = tmpl_param();
    while (my ($k, $v) = each %$tmpl_param) {
        $param->{$k} = $v;
    }

    $param->{shortcut_count_default} = MT::Plugin::MTBlockEditor->SHORTCUT_COUNT_DEFAULT;
    my @block_types = grep { $_->{is_default_visible} } @{ blocks( { blog_id => $blog_id } ) };
    $param->{block_types}    = \@block_types;
    $param->{block_type_ids} = [ map { $_->{type_id} } @block_types ];
    if (my $obj = MT->model('be_config')->load( { blog_id => $blog_id } )) {
        $param->{blog_block_display_options} = $obj->block_display_options;
    }

    load_extensions( $param );
    insert_after( $tmpl, 'content_data', 'loader.tmpl' );
}

1;
