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

    require Storable;
    for my $key (keys %{$configs}) {
        my $c = Storable::dclone($configs->{$key});

        # XXX: In the future, be able to read external files with $key as filename

        MT->set_language($blog->language);
        $c->{label} = translate_label($c->{label}, $theme);
        MT->set_language($current_lang);

        $model->exist({
            label   => $c->{label},
            blog_id => [0, $blog->id],
        }) and next;

        for my $k (keys %{ $c->{block_display_options} }) {
            for my $opt (@{ $c->{block_display_options}{$k} }) {
                $opt->{panel}    = $opt->{panel}    ? JSON::true : JSON::false if exists $opt->{panel};
                $opt->{shortcut} = $opt->{shortcut} ? JSON::true : JSON::false if exists $opt->{shortcut};
            }
        }
        $c->{block_display_options} = MT::Util::to_json($c->{block_display_options});

        my $obj = $model->new(
            %$c,
            blog_id => $blog->id,
        );
        $obj->save or die $obj->errstr;
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

    require JSON;
    my $json_decoder = JSON->new->utf8(0)->boolean_values(0, 1);

    my $data = {};
    for my $c (@configs) {
        my $key = $c->label;
        for (my $number = 1; $number <= 100; $number++) {
            last unless $data->{$key};
            $key = $c->label . '_' . $number;
        }
        $data->{$key} = +{
            block_display_options => $json_decoder->decode($c->block_display_options || '{}'),
            map { $_ => $c->$_ } qw( label ),
        };
    }
    return $data;
}

1;
