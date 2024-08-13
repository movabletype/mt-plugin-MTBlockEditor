# Movable Type (r) (C) 2006-2020 Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::App::CMS;

use strict;
use warnings;
use utf8;

use MT::Util qw(encode_html);
use Class::Method::Modifiers qw(install_modifier);
use MT::Plugin::MTBlockEditor qw(plugin blocks to_custom_block_types_json tmpl_param);

my $Initialized;

sub init_app {
    my ($cb, $app) = @_;

    return if $Initialized;

    require MT::ContentFieldType::Common;
    install_modifier(
        'MT::ContentFieldType::Common',
        'around',
        'html_text' => sub {
            my $orig = shift;
            my ($prop, $content_data, $app, $opts) = @_;

            my $cb = $content_data->data->{ $prop->content_field_id . '_convert_breaks' };
            return $orig->(@_) if !$cb || $cb ne 'block_editor';

            my $text = $content_data->data->{ $prop->content_field_id };
            return '' unless defined $text;
            $text = MT->apply_text_filters($text, [$cb]);

            if (length $text > 40) {
                return MT::Util::encode_html(substr($text, 0, 40)) . '...';
            } else {
                return MT::Util::encode_html($text);
            }
        });

    require MT::Asset::Image;
    install_modifier(
        'MT::Asset::Image',
        'around',
        'as_html' => sub {
            my $orig   = shift;
            my ($self) = @_;
            my $html   = $orig->(@_);
            my $app    = MT->instance;

            if (   $app
                && $app->can('param')
                && ($app->param('edit_field') || '') =~ m/^mt-block-editor-/)
            {
                $html =~ s{img \K}{data-id="@{[$self->id]}" data-url="@{[$self->url]}" };
            }

            $html;
        });

    $Initialized = 1;
}

sub insert_after {
    my ($tmpl, $id, $tokens) = @_;

    my $before = $id ? $tmpl->getElementById($id) : undef;

    if (!ref $tokens) {
        $tokens = plugin()->load_tmpl($tokens)->tokens;
    }

    foreach my $t (@$tokens) {
        $tmpl->insertAfter($t, $before);
        $before = $t;
    }
}

sub load_extensions {
    my ($param) = @_;

    my $regs = MT::Component->registry('editors', 'block_editor');
    if ($regs && ref $regs eq 'ARRAY') {
        for my $reg (@$regs) {
            my $plugin = $reg->{plugin};
            my $tmpls  = $param->{block_editor_extensions} ||= {
                templates  => [],
                extensions => [],
                config     => {},
            };

            foreach my $k ('extension') {
                my $conf = $reg->{$k};
                next unless defined $conf;
                if (!ref $conf) {
                    $conf = {
                        template => $conf,
                        order    => 5,
                    };
                }

                if (my $tmpl = $plugin->load_tmpl($conf->{template})) {
                    push(
                        @{ $tmpls->{ $k . 's' } },
                        { %$conf, tmpl => $tmpl, v => $plugin->version });
                }
            }

            $tmpls->{config} = { %{ $tmpls->{config} }, %{ $reg->{'config'} } }
                if $reg->{'config'};
            delete $tmpls->{config}{plugin};
        }
    }
}

sub _template_param_edit_content {
    my ($id, $variant, $cb, $app, $param, $tmpl) = @_;

    my $blog    = $app->blog;
    my $blog_id = $blog ? $blog->id : 0;

    my $tmpl_param = tmpl_param();
    while (my ($k, $v) = each %$tmpl_param) {
        $param->{$k} = $v;
    }

    $param->{shortcut_count_default} = MT::Plugin::MTBlockEditor->SHORTCUT_COUNT_DEFAULT;
    my @block_types = grep { $_->is_default_visible } @{ blocks({ blog_id => $blog_id }) };
    $param->{custom_block_types_json}      = to_custom_block_types_json(\@block_types);
    $param->{block_type_ids}               = [map { $_->type_id } @block_types];
    $param->{block_editor_iframe_base_url} = $blog ? $blog->site_url : '';

    my %block_display_options_map;
    for (MT->model('be_config')->load({ blog_id => [0, $blog_id] })) {
        $block_display_options_map{ $_->id } = $_->block_display_options;
    }
    $param->{block_display_options_map} = \%block_display_options_map;
    $param->{loader_variant}            = $variant;

    load_extensions($param);
    insert_after($tmpl, $id, 'loader.tmpl');
}

sub template_param_edit_content_data {
    my ($cb, $app, $param, $tmpl) = @_;

    my %field_data = ();

    my $content_type_id = $app->param('content_type_id')
        or return;
    my $content_type = MT::ContentType->load($content_type_id)
        or return;
    $field_data{content_type} = {
        name      => $content_type->name,
        unique_id => $content_type->unique_id,
    };

    # FIXME: The core of MT breaks the cache data
    delete $content_type->{__cached_fields};
    for my $field (@{ $content_type->field_objs }) {
        $field_data{fields}{ $field->id } = {
            unique_id => $field->unique_id,
            name      => $field->name,
        };
    }

    my $before = $tmpl->getElementById('entry-publishing-widget');
    my $t      = $tmpl->createTextNode(qq{<input type="hidden" id="be-field-data" value="@{[encode_html(MT::Util::to_json(\%field_data))]}" />});
    $tmpl->insertAfter($t, $before);

    _template_param_edit_content('content_data', '_content_data', @_);
}

sub template_param_edit_entry {
    my ($cb, $app, $param, $tmpl) = @_;

    my $blog      = $app->blog;
    my $config_id = int((
              $param->{object_type} eq 'entry'
            ? $blog->be_entry_config_id
            : $blog->be_page_config_id
        )
            || 0
    );

    my $before = $tmpl->getElementById('text');
    my $t      = $tmpl->createTextNode(qq{<input type="hidden" id="text-be_config" value="$config_id" />});
    $tmpl->insertAfter($t, $before);

    _template_param_edit_content('text', '_entry', @_);
}

sub template_param_cfg_entry {
    my ($cb, $app, $param, $tmpl) = @_;

    my $blog = $app->blog;
    for my $k (qw(be_entry_config_id be_page_config_id)) {
        $param->{$k} = $blog->$k;
    }
    $param->{be_configs} = [MT->model('be_config')->load({ blog_id => [0, $blog->id] })];

    insert_after($tmpl, 'wysiwyg-editor-setting', 'cfg_entry.tmpl');
}

sub template_source_multi_line_text {
    my ($cb, $app, $tmpl) = @_;

    my $blog    = $app->blog;
    my $blog_id = $blog ? $blog->id : 0;

    my $configs = [MT->model('be_config')->load({ blog_id => [0, $blog_id] })];

    return unless @$configs;

    $$tmpl =~ s{(</mtapp:ContentFieldOptionScript>)}{
this.options.be_configs = {
@{[ map { my $id = $_->id; qq{$id: '',} } @$configs ]}
};
if ( this.options.be_config ) {
  this.options.be_configs[this.options.be_config] = "selected"
}

$1
}i;

    $$tmpl =~ s{(</mt:app:ContentFieldOptionGroup>)}{
<__trans_section component="@{[plugin()->id]}">
<mtapp:ContentFieldOption
   id="multi_line_text-be_config"
   label="<__trans phrase="Preset For Movable Type Block Editor">">
  <select ref="be_config" name="be_config" id="multi_line_text-be_config" class="custom-select form-control form-select">
    @{[ map { my ($id, $label) = ($_->id, encode_html($_->label)); qq{
      <option value="$id" selected={ options.be_configs[$id] }>$label</option>
    } } @$configs ]}
  </select>
</mtapp:ContentFieldOption>
</__trans_section>

$1
}i;
}

sub template_source_field_html_multi_line_text {
    my ($cb, $app, $tmpl) = @_;

    $$tmpl .= <<MTML;
<input type="hidden" id="content-field-<mt:var name="content_field_id">-be_config" value="<mt:var name="options{be_config}" escape="html">" />
MTML
}

sub cms_pre_save_blog {
    my ($eh, $app, $obj) = @_;

    if ($app->can_do('save_blog_config')) {
        for my $k (qw(be_entry_config_id be_page_config_id)) {
            if (defined(my $id = $app->param($k))) {
                $obj->$k($id);
            }
        }
    }

    1;
}

sub menu_condition {
    my $app  = MT->instance;
    my $user = $app->user;
    my $blog = $app->blog;
    return 1 if $user->is_superuser;

    my $terms;
    push @$terms, { author_id => $user->id };
    if ($blog) {
        my @blog_ids;
        push @blog_ids, $blog->id;
        if (!$blog->is_blog) {
            push @blog_ids, map { $_->id } @{ $blog->blogs };
        }
        push @$terms, [
            '-and', [{
                    blog_id     => \@blog_ids,
                    permissions => { like => "\%'edit_templates'\%" },
                },
                '-or',
                {
                    blog_id     => 0,
                    permissions => { like => "\%'edit_templates'\%" },
                },
            ]];
    } else {
        push @$terms, [
            '-and',
            [{
                    blog_id     => 0,
                    permissions => { like => "\%'edit_templates'\%" },
                },
                '-or',
                {
                    blog_id     => \' > 0',
                    permissions => { like => "\%'edit_templates'\%" },
                }]];
    }

    my $cnt = MT->model('permission')->count($terms);
    return ($cnt && $cnt > 0) ? 1 : 0;
}

1;
