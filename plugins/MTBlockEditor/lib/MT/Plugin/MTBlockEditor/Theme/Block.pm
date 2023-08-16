# Movable Type (r) (C) Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::Theme::Block;

use strict;
use warnings;
use utf8;

use JSON;
use MT::Util;
use MT::Plugin::MTBlockEditor qw(load_tmpl);

sub apply {
    my ($element, $theme, $blog) = @_;
    my $blocks       = $element->{data} || {};
    my $current_lang = MT->current_language;
    my $model        = MT->model('be_block');
    my $fmgr         = MT::FileMgr->new('Local');

    require Storable;
    for my $identifier (keys %{$blocks}) {
        my $b         = Storable::dclone($blocks->{$identifier});
        my $json_file = File::Spec->catdir($theme->path, 'block_editor_blocks', $identifier . '.json');
        if ($fmgr->exists($json_file)) {
            $b = {
                %$b,
                %{ MT::Util::from_json($fmgr->get_data($json_file)) },
            };
        }

        $model->exist({
            identifier => $b->{identifier},
            blog_id    => [0, $blog->id],
        }) and next;

        MT->set_language($blog->language);
        my $obj = $model->new_from_json($b, $theme);
        MT->set_language($current_lang);

        $obj->blog_id($blog->id);
        $obj->save or die $obj->errstr;
    }

    1;
}

sub info {
    my ($element) = @_;
    my $count = scalar %{ $element->{data} };
    sub {
        MT->translate('[_1] custom blocks.', $count);
    };
}

sub condition {
    my ($blog) = @_;
    MT->model('be_block')->exist({ blog_id => $blog->id });
}

sub export_template {
    my ($app, $blog, $saved) = @_;
    my $checked_ids = $saved ? +{ map { $_ => 1 } @{ $saved->{be_block_export_ids} } } : +{};
    my $blocks      = [
        map {
            +{
                id      => $_->id,
                label   => $_->label,
                checked => $checked_ids->{ $_->id },
            }
        } MT->model('be_block')->load({ blog_id => $blog->id })];
    return load_tmpl(
        'theme_export.tmpl',
        {
            params_name => 'be_block_export_ids',
            objs        => $blocks,
        },
    );
}

sub export {
    my ($app, $blog, $setting) = @_;
    my @blocks;
    if ($setting) {
        @blocks = MT->model('be_block')->load({ id => $setting->{be_block_export_ids} });
    } else {
        @blocks = MT->model('be_block')->load({
            blog_id => $blog->id,
        });
    }
    return unless scalar @blocks;

    return { map { $_->identifier => $_ } @blocks };
}

sub finalize {
    my ($app, $blog, $theme_hash, $tmpdir, $setting) = @_;

    return 1 unless $theme_hash->{elements}{be_block};
    my $blocks = $theme_hash->{elements}{be_block}{data};

    require MT::FileMgr;
    require File::Spec;
    my $fmgr   = MT::FileMgr->new('Local');
    my $outdir = File::Spec->catdir($tmpdir, 'block_editor_blocks');
    $fmgr->mkpath($outdir)
        or return $app->error($app->translate(
        'Failed to make directory for export: [_1]',
        $fmgr->errstr,
        ));

    for my $identifier (keys %$blocks) {
        my $block = $blocks->{$identifier};
        $blocks->{$identifier} = {};    # placeholder
        my $path = File::Spec->catfile($outdir, $identifier . '.json');
        defined $fmgr->put_data(MT::Util::to_json($block->export_to_json, { utf8 => 1, pretty => 1 }), $path)
            or return $app->error($app->translate(
            'Failed to export data: [_1]',
            $fmgr->errstr,
            ));
    }

    return 1;
}

1;
