# Movable Type (r) (C) 2006-2020 Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.
#
# $Id$

package MT::Plugin::MTBlockEditor;

use strict;
use warnings;

use MT::Util;

use constant { SHORTCUT_COUNT_DEFAULT => 3 };

our @EXPORT_OK = qw(
    component plugin translate blocks to_addable_blocks to_custom_block_types_json
    load_tmpl tmpl_param translate_label
);
use base qw(Exporter);

sub component {
    __PACKAGE__ =~ m/::([^:]+)\z/;
}

sub translate {
    MT->component(component())->translate(@_);
}

sub translate_label {
    my ($label, $component) = @_;

    $component ||= plugin();
    my $translated_label = $component->translate($label);
    $label eq $translated_label ? $component->translate_templatized($label) : $translated_label;
}

sub plugin {
    MT->component(component());
}

sub tmpl_param {
    +{ mt_block_editor_version => plugin()->version, };
}

sub load_tmpl {
    my $tmpl = plugin()->load_tmpl(@_);
    $tmpl->param(tmpl_param());
    $tmpl;
}

sub blocks {
    my ($param) = @_;
    my $blog_id = $param->{blog_id};

    my @blocks = MT->model('be_block')->load(
        { blog_id => [0, $blog_id], },
        {
            sort      => 'id',
            direction => 'ascend',
        });

    [
        @{ MT->model('be_block')->DEFAULT_BLOCKS },
        @blocks
    ];
}

sub to_addable_blocks {
    my ($block_types) = @_;

    my @column_names = @{ MT->model('be_block')->column_names() };
    [
        map {
            my $obj = $_;
            +{
                map {
                    my $v = $obj->$_;
                    $v = $v->() if ref($v) eq 'CODE';
                    $_ => $v
                } @column_names,
                qw(
                    type_id is_default_visible
                    is_default_block is_default_hidden
                ) }
        } grep { !$_->is_form_element } @$block_types
    ];
}

sub to_custom_block_types_json {
    my ($block_types) = @_;
    MT::Util::to_json(
        [grep { !$_->is_default_block } @$block_types],
        { convert_blessed => 1 });
}

1;
