# Movable Type (r) (C) Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::Theme::Config;

use strict;
use warnings;
use utf8;

use JSON;
use MT::Util;
use MT::Plugin::MTBlockEditor qw(load_tmpl translate_label);

sub apply {
    my ($element, $theme, $blog) = @_;
    my $configs      = $element->{data} || {};
    my $current_lang = MT->current_language;
    my $model        = MT->model('be_config');
    my $fmgr         = MT::FileMgr->new('Local');

    my %objs = ();

    require Storable;
    for my $key (keys %{$configs}) {
        my $c         = Storable::dclone($configs->{$key});
        my $json_file = File::Spec->catdir($theme->path, 'block_editor_configs', $key . '.json');
        if ($fmgr->exists($json_file)) {
            $c = {
                %$c,
                %{ MT::Util::from_json($fmgr->get_data($json_file)) },
            };
        }

        MT->set_language($blog->language);
        my $check_label = translate_label($c->{label}, $theme);
        MT->set_language($current_lang);

        my $obj = $model->load({
            label   => $check_label,
            blog_id => [0, $blog->id],
        });
        if (!$obj) {
            MT->set_language($blog->language);
            $obj = $model->new_from_json($c, $theme);
            MT->set_language($current_lang);

            $obj->blog_id($blog->id);
            $obj->save or die $obj->errstr;
        }

        $objs{$obj->label} = $obj;
    }

    my $iter = MT->model('content_type')->load_iter({ blog_id => $blog->id });
    while (my $ct = $iter->()) {
        my $applied = 0;
        my $fields = $ct->fields;
        for my $field (@$fields) {
            my $config_label = $field->{options}{be_config}
                or next;
            my $config_obj = $objs{$config_label}
                or next;
            $field->{options}{be_config} = $config_obj->id;
            $applied++;
        }
        next unless $applied;
        $ct->fields($fields);
        $ct->save or die $ct->errstr;
    }

    1;
}

sub info {
    my ($element) = @_;
    my $count = scalar %{ $element->{data} };
    sub {
        MT->translate('[_1] custom block presets.', $count);
    };
}

sub condition {
    my ($blog) = @_;
    MT->model('be_config')->exist({ blog_id => $blog->id });
}

sub export_template {
    my $app = shift;
    my ($blog, $saved) = @_;
    my $checked_ids = $saved ? +{ map { $_ => 1 } @{ $saved->{be_config_export_ids} } } : +{};
    my $configs     = [
        map {
            +{
                id      => $_->id,
                label   => $_->label,
                checked => $checked_ids->{ $_->id },
            }
        } MT->model('be_config')->load({ blog_id => $blog->id })];
    return load_tmpl(
        'theme_export.tmpl',
        {
            params_name => 'be_config_export_ids',
            objs        => $configs,
        },
    );
}

sub export {
    my $app = shift;
    my ($blog, $setting) = @_;
    my @configs;
    if ($setting) {
        @configs = MT->model('be_config')->load({ id => $setting->{be_config_export_ids} });
    } else {
        @configs = MT->model('be_config')->load({
            blog_id => $blog->id,
        });
    }
    return unless scalar @configs;

    my $data = {};
    for my $c (@configs) {
        $data->{ 'config_' . $c->id } = $c;
    }
    return $data;
}

sub finalize {
    my ($app, $blog, $theme_hash, $tmpdir, $setting) = @_;

    return 1 unless $theme_hash->{elements}{be_config};
    my $configs = $theme_hash->{elements}{be_config}{data};

    if ($theme_hash->{elements}{default_content_types}) {
        my $types = $theme_hash->{elements}{default_content_types}{data};
        for my $type (@$types) {
            for my $field (@{$type->{fields}}) {
                my $config_id = $field->{be_config}
                    or next;
                my $obj = $configs->{ 'config_' . $config_id }
                    or next;
                $field->{be_config} = $obj->label;
            }
        }
    }

    require MT::FileMgr;
    require File::Spec;
    my $fmgr   = MT::FileMgr->new('Local');
    my $outdir = File::Spec->catdir($tmpdir, 'block_editor_configs');
    $fmgr->mkpath($outdir)
        or return $app->error($app->translate(
        'Failed to make directory for export: [_1]',
        $fmgr->errstr,
        ));

    for my $key (keys %$configs) {
        my $config = $configs->{$key};
        $configs->{$key} = {};    # placeholder
        my $path = File::Spec->catfile($outdir, $key . '.json');
        defined $fmgr->put_data(MT::Util::to_json($config->export_to_json, { utf8 => 1, pretty => 1 }), $path)
            or return $app->error($app->translate(
            'Failed to export data: [_1]',
            $fmgr->errstr,
            ));
    }

    return 1;
}

1;
