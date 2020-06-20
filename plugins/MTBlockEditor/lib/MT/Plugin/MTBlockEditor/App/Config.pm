# Movable Type (r) (C) 2006-2020 Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::App::Config;

use strict;
use warnings;
use utf8;

use MT::Plugin::MTBlockEditor qw(plugin translate blocks load_tmpl);

sub view {
    my ($app) = @_;
    my $blog = $app->blog
        or return;

    $app->add_breadcrumb( translate('Movable Type Block Editor Settings') );

    my $param = {
        saved                  => scalar $app->param('saved'),
        shortcut_count_default => MT::Plugin::MTBlockEditor->SHORTCUT_COUNT_DEFAULT,
        block_types            => blocks( { blog_id => $blog->id } ),
    };

    my $obj = MT->model('be_config')->load( { blog_id => $blog->id } );
    if ($obj) {
        $param->{block_display_options} = $obj->block_display_options;
    }

    return load_tmpl( 'config.tmpl', $param );
}

sub update {
    my ($app) = @_;
    my $blog = $app->blog
        or return;

    my $obj = MT->model('be_config')->load( { blog_id => $blog->id } )
        || MT->model('be_config')->new( blog_id => $blog->id );
    $obj->block_display_options( $app->param('block_display_options') );
    $obj->save;

    $app->add_return_arg( 'saved' => 1 );
    $app->call_return;
}

1;
