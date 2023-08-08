# Movable Type (r) (C) Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::Theme::Config;

use strict;
use warnings;
use utf8;

use MT::Plugin::MTBlockEditor qw(load_tmpl);

sub apply {
    my ($element, $theme, $blog) = @_;
    my $configs      = $element->{data} || {};
    my $current_lang = MT->current_language;

    require JSON;
    my $json_encoder = JSON->new->utf8(0);
    for my $k (qw(panel shortcut)) {
        $json_encoder->filter_json_single_key_object(
            $k,
            sub {
                my ($obj) = @_;
                return $obj if ref $obj;
                return $obj ? JSON::true : JSON::false;
            });
    }

    my $model = MT->model('be_config');

    for my $key (keys %{$configs}) {
        my $c = $configs->{$key};
        MT->set_language($blog->language);
        $c->{label} = $theme->translate_templatized($c->{label});
        MT->set_language($current_lang);
        $c->{block_display_options} = $json_encoder->encode($c->{block_display_options});

        # XXX: In the future, be able to read external files with $key as filename

        $model->exist({
            label   => $c->{label},
            blog_id => [0, $blog->id],
        }) and next;

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
