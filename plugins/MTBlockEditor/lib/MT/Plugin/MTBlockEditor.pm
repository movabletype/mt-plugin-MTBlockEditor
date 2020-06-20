# Movable Type (r) (C) 2006-2020 Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.
#
# $Id$

package MT::Plugin::MTBlockEditor;

use strict;
use warnings;

use constant { SHORTCUT_COUNT_DEFAULT => 3 };

our @EXPORT_OK = qw( plugin translate blocks load_tmpl tmpl_param);
use base qw(Exporter);

sub component {
    __PACKAGE__ =~ m/::([^:]+)\z/;
}

sub translate {
    MT->component( component() )->translate(@_);
}

sub plugin {
    MT->component( component() );
}

sub tmpl_param {
    +{
        mt_block_editor_version => plugin()->version,
    };
}

sub load_tmpl {
    my $tmpl = plugin()->load_tmpl(@_);
    $tmpl->param(tmpl_param());
    $tmpl;
}

sub blocks {
    my ($param) = @_;
    my $blog_id = $param->{blog_id};

    my $model        = MT->model('be_block');
    my @column_names = @{ $model->column_names() };
    my @blocks       = $model->load(
        { blog_id => [ 0, $blog_id ], },
        {   sort      => 'id',
            direction => 'ascend',
        }
    );
    [   map {
            my $obj = $_;
            +{  map { $_ => $obj->$_ } @column_names,
                qw(
                    type_id is_default_visible
                    is_default_block is_default_hidden is_form_element
                    )
            }
        } @{ MT->model('be_block')->DEFAULT_BLOCKS },
        @blocks
    ];
}

1;
