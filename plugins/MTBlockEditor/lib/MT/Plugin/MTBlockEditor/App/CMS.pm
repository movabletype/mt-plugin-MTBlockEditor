# Movable Type (r) (C) 2007-2019 Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::App::CMS;

use strict;
use warnings;

use MT::Plugin::MTBlockEditor qw(plugin blocks load_tmpl);
use MT::Plugin::MTBlockEditor::App;

sub edit_be_block {
    my ( $app, $param ) = @_;

    my $blog    = $app->blog;
    my $blog_id = $blog ? $blog->id : 0;
    return $app->permission_denied() if !$app->can_do('edit_be_blocks');

    my $id = $app->param('id');
    return $app->permission_denied() if $id && $id !~ m/\A[0-9]+\z/;

    if ($id) {
        my $obj
            = MT->model('be_block')->load( { blog_id => $blog_id, id => $id } );
        return $app->return_to_dashboard( redirect => 1 ) unless $obj;
        while ( my ( $key, $val ) = each %{ $obj->column_values() } ) {
            $param->{$key} ||= $val;
        }
        $param->{wrap_root_block} = 1 if $obj->root_block eq $obj->ROOT_BLOCK_DEFAULT;
    }
    else {
        $param->{identifier} = '';
    }

    $param->{saved} = !!$app->param('saved');

    $param->{shortcut_count_default} = MT::Plugin::MTBlockEditor->SHORTCUT_COUNT_DEFAULT;
    my @block_types
        = grep { $_->{identifier} ne $param->{identifier} } @{ blocks( { blog_id => $blog_id } ) };
    $param->{block_types}      = \@block_types;
    $param->{block_type_ids}   = [ map { $_->{type_id} } @block_types ];
    $param->{max_icon_size}    = MT->model('be_block')->MAX_ICON_SIZE;
    $param->{max_icon_size_hr} = (MT->model('be_block')->MAX_ICON_SIZE / 1024) . 'KB';

    $app->add_breadcrumb(
        plugin()->translate("Custom Blocks"),
        $app->uri(
            mode => 'list',
            args => {
                _type   => 'be_block',
                blog_id => $blog_id,
            },
        )
    );
    if ( $param->{id} ) {
        $app->add_breadcrumb( $param->{label} );
    }
    else {
        $app->add_breadcrumb( $app->translate('Create Custom Block') );
    }

    $app->setup_editor_param($param);
    MT::Plugin::MTBlockEditor::App::load_extensions( $param );
    $app->build_page( load_tmpl('edit_block.tmpl'), $param );
}

sub cms_save_filter_be_block {
    my ( $cb, $app ) = @_;

    $app->param(
          root_block => $app->param('wrap_root_block')
        ? MT->model('be_block')->ROOT_BLOCK_DEFAULT
        : ''
    );
    $app->param(can_remove_block => $app->param('can_remove_block') ? 1 : 0);

    1;
}

sub can_save_be_block {
    my ( $eh, $app, $obj ) = @_;
    my $author = $app->user;
    return 1 if $author->is_superuser();

    my $blog_id;
    if ( defined $obj and ref $obj ) {
        $blog_id = $obj->blog_id;
    }
    elsif ( defined $obj ) {

        # we got the id of this block
        my $loaded_obj = MT->model('be_block')->load($obj);
        return 0 unless $loaded_obj;
        $blog_id = $loaded_obj->blog_id;
    }
    elsif ( $app->blog ) {
        $blog_id = $app->blog->id;
    }
    else {
        $blog_id = 0;
    }

    return $author->permissions($blog_id)->can_do('edit_be_blocks');
}

sub can_delete_be_block {
    my ( $eh, $app, $obj ) = @_;
    my $author = $app->user;
    return 1 if $author->is_superuser();

    $obj = MT->model('be_block')->load($obj) unless ref $obj;
    my $blog_id = $obj ? $obj->blog_id : ( $app->blog ? $app->blog->id : 0 );

    return $author->permissions($blog_id)->can_do('edit_be_blocks');
}


sub edit_be_config {
    my ( $app, $param ) = @_;

    my $blog    = $app->blog;
    my $blog_id = $blog ? $blog->id : 0;
    return $app->permission_denied() if !$app->can_do('edit_be_configs');

    my $id = $app->param('id');
    return $app->permission_denied() if $id && $id !~ m/\A[0-9]+\z/;

    if ($id) {
        my $obj
            = MT->model('be_config')->load( { blog_id => $blog_id, id => $id } );
        return $app->return_to_dashboard( redirect => 1 ) unless $obj;
        while ( my ( $key, $val ) = each %{ $obj->column_values() } ) {
            $param->{$key} ||= $val;
        }
    }

    $param->{saved}                  = !!$app->param('saved');
    $param->{shortcut_count_default} = MT::Plugin::MTBlockEditor->SHORTCUT_COUNT_DEFAULT;
    $param->{block_types}            = blocks( { blog_id => $blog->id } );

    $app->add_breadcrumb(
        plugin()->translate("Custom Block Presets"),
        $app->uri(
            mode => 'list',
            args => {
                _type   => 'be_config',
                blog_id => $blog_id,
            },
        )
    );
    if ( $param->{id} ) {
        $app->add_breadcrumb( $param->{label} );
    }
    else {
        $app->add_breadcrumb( $app->translate('Create Custom Block Preset') );
    }

    $app->build_page( load_tmpl('edit_config.tmpl'), $param );
}

sub can_save_be_config {
    my ( $eh, $app, $obj ) = @_;
    my $author = $app->user;
    return 1 if $author->is_superuser();

    my $blog_id;
    if ( defined $obj and ref $obj ) {
        $blog_id = $obj->blog_id;
    }
    elsif ( defined $obj ) {

        # we got the id of this block
        my $loaded_obj = MT->model('be_config')->load($obj);
        return 0 unless $loaded_obj;
        $blog_id = $loaded_obj->blog_id;
    }
    elsif ( $app->blog ) {
        $blog_id = $app->blog->id;
    }
    else {
        $blog_id = 0;
    }

    return $author->permissions($blog_id)->can_do('edit_be_configs');
}

sub can_delete_be_config {
    my ( $eh, $app, $obj ) = @_;
    my $author = $app->user;
    return 1 if $author->is_superuser();

    $obj = MT->model('be_config')->load($obj) unless ref $obj;
    my $blog_id = $obj ? $obj->blog_id : ( $app->blog ? $app->blog->id : 0 );

    return $author->permissions($blog_id)->can_do('edit_be_configs');
}

1;
