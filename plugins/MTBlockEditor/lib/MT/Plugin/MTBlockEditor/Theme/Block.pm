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

    require Storable;
    for my $key (keys %{$blocks}) {
        my $b = Storable::dclone($blocks->{$key});

        # XXX: In the future, be able to read external files with $key as filename

        $model->exist({
            identifier => $b->{identifier},
            blog_id    => [0, $blog->id],
        }) and next;

        MT->set_language($blog->language);
        $b->{label} = $theme->translate_templatized($b->{label});
        $b->{html}  = _apply_html($b->{html}, $theme);
        MT->set_language($current_lang);

        for my $k (keys %{ $b->{addable_block_types} }) {
            for my $opt (@{ $b->{addable_block_types}{$k} }) {
                $opt->{panel}    = $opt->{panel}    ? JSON::true : JSON::false if exists $opt->{panel};
                $opt->{shortcut} = $opt->{shortcut} ? JSON::true : JSON::false if exists $opt->{shortcut};
            }
        }
        $b->{addable_block_types} = MT::Util::to_json($b->{addable_block_types});

        my $obj = $model->new(
            %$b,
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
        MT->translate('[_1] custom blocks.', $count);
    };
}

sub condition {
    my ($blog) = @_;
    MT->model('be_block')->exist({ blog_id => $blog->id });
}

sub export_template {
    my $app = shift;
    my ($blog, $saved) = @_;
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
    my $app = shift;
    my ($blog, $setting) = @_;
    my @blocks;
    if ($setting) {
        @blocks = MT->model('be_block')->load({ id => $setting->{be_block_export_ids} });
    } else {
        @blocks = MT->model('be_block')->load({
            blog_id => $blog->id,
        });
    }
    return unless scalar @blocks;

    require JSON;
    my $json_decoder = JSON->new->utf8(0)->boolean_values(0, 1);

    my $data = {};
    for my $b (@blocks) {
        $data->{ $b->identifier } = +{
            addable_block_types => $json_decoder->decode($b->addable_block_types || '{}'),
            html                => _export_html($b->html),
            map { $_ => $b->$_ } qw(
                can_remove_block
                class_name
                icon
                identifier
                label
                preview_header
                root_block
            ),
        };
    }

    return $data;
}

sub _apply_html {
    my ($html, $theme) = @_;

    return $html unless ref $html eq 'HASH';

    my $translated_meta = {};
    for my $meta_key (keys %{ $html->{context} }) {
        my $meta_hash = $html->{context}{$meta_key};
        my $result    = {};
        for my $k (keys %{$meta_hash}) {
            my $v = $meta_hash->{$k};
            next if ref $v;
            $result->{$k} = $k eq 'label' ? translate_label($v) : $theme->translate_templatized($v);
        }
        $translated_meta->{$meta_key} = $result;
    }

    qq{<!-- mt-beb t="core-context" m='@{[MT::Util::to_json($translated_meta)]}' --><!-- /mt-beb -->} . $html->{text};
}

sub _export_html {
    my ($html) = @_;

    $html =~ s{\A<!--\s*mt-beb\s*t="core-context"\s*m='([^']+)'\s*--><!--\s*/mt-beb\s*-->}{}
        or return $html;
    my $meta_json = $1;

    require JSON;
    my $json_decoder = JSON->new->utf8(0)->boolean_values(0, 1);

    +{
        context => $json_decoder->decode($meta_json),
        text    => $html,
    };
}

1;
