# Movable Type (r) (C) 2007-2019 Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::App::Config;

use strict;
use warnings;
use utf8;

use MT::Plugin::MTBlockEditor qw(plugin blocks to_addable_blocks to_custom_block_types_json load_tmpl);

sub edit_be_config {
    my ($app, $param) = @_;

    my $blog    = $app->blog;
    my $blog_id = $blog ? $blog->id : 0;
    return $app->permission_denied() if !$app->can_do('edit_be_configs');

    my $id = $app->param('id');
    return $app->permission_denied() if $id && $id !~ m/\A[0-9]+\z/;

    if ($id) {
        my $obj = MT->model('be_config')->load({ blog_id => $blog_id, id => $id });
        return $app->return_to_dashboard(redirect => 1) unless $obj;
        while (my ($key, $val) = each %{ $obj->column_values() }) {
            $param->{$key} ||= $val;
        }
    }

    $param->{saved}                  = !!$app->param('saved');
    $param->{shortcut_count_default} = MT::Plugin::MTBlockEditor->SHORTCUT_COUNT_DEFAULT;
    my $block_types = blocks({ blog_id => $blog_id });
    $param->{block_types}             = to_addable_blocks($block_types);
    $param->{custom_block_types_json} = to_custom_block_types_json($block_types);

    $app->add_breadcrumb(
        plugin()->translate("Custom Block Presets"),
        $app->uri(
            mode => 'list',
            args => {
                _type   => 'be_config',
                blog_id => $blog_id,
            },
        ));
    if ($param->{id}) {
        $app->add_breadcrumb($param->{label});
    } else {
        $app->add_breadcrumb($app->translate('Create Custom Block Preset'));
    }

    $app->build_page(load_tmpl('edit_config.tmpl'), $param);
}

sub can_save_be_config {
    my ($eh, $app, $obj) = @_;
    my $author = $app->user;
    return 1 if $author->is_superuser();

    my $blog_id;
    if (defined $obj and ref $obj) {
        $blog_id = $obj->blog_id;
    } elsif (defined $obj) {

        # we got the id of this block
        my $loaded_obj = MT->model('be_config')->load($obj);
        return 0 unless $loaded_obj;
        $blog_id = $loaded_obj->blog_id;
    } elsif ($app->blog) {
        $blog_id = $app->blog->id;
    } else {
        $blog_id = 0;
    }

    return $author->permissions($blog_id)->can_do('edit_be_configs');
}

sub can_delete_be_config {
    my ($eh, $app, $obj) = @_;
    my $author = $app->user;
    return 1 if $author->is_superuser();

    $obj = MT->model('be_config')->load($obj) unless ref $obj;
    my $blog_id = $obj ? $obj->blog_id : ($app->blog ? $app->blog->id : 0);

    return $author->permissions($blog_id)->can_do('edit_be_configs');
}

1;
