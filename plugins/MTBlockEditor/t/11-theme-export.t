#!/usr/bin/perl

use strict;
use warnings;
use FindBin;
use JSON;
use lib "$FindBin::Bin/../../../t/lib", "$FindBin::Bin/lib";
use Test::More;
use Test::Deep;
use MT::Test::Env;
use MT::Test::App;
use File::Path;

our $test_env;

BEGIN {
    $test_env = MT::Test::Env->new(
        ThemesDirectory => 'TEST_ROOT/themes',
    );
    $ENV{MT_CONFIG} = $test_env->config_file;
    $ENV{MT_APP}    = 'MT::App::CMS';
}

use JSON::XS;
use MT;
use MT::Test;
use MT::Test::Permission;
use MT::Test::MTBlockEditor;
use MT::BlockEditor::Parser;
use Class::Method::Modifiers qw(after);

MT::Test->init_app;

$test_env->prepare_fixture('db');
my $mt   = MT->instance;
my $user = MT::Author->load(1);

my $theme_dir = $test_env->path('themes');

subtest 'export' => sub {
    my $blog = MT->model('blog')->new(
        name => 'Blog',
    );
    $blog->save or die $blog->errstr;

    my $block = MT->model('be_block')->new(
        'preview_header'      => '<script data-message="Hello, World!"></script>',
        'show_preview'        => '1',
        'root_block'          => '',
        'icon'                => 'data:image/svg+xml;<xml></xml>',
        'identifier'          => 'bgcolor_contents',
        'html'                => '<!-- mt-beb t="core-context" m=\'{"1":{"blockElement":"p","className":"color","label":"Color","options":"White\\nBlack\\nGray"},"2":{"text":"White"}}\' --><!-- /mt-beb --><!-- mt-beb t="sixapart-select" m=\'1,2\' --><p class="color">White</p><!-- /mt-beb -->',
        'addable_block_types' => '{"common":[{"index":0,"panel":true,"shortcut":false,"typeId":"core-text"},{"index":1,"panel":true,"shortcut":false,"typeId":"mt-image"},{"index":2,"panel":true,"shortcut":false,"typeId":"mt-file"}]}',
        'can_remove_block'    => '0',
        'created_by'          => $user->id,
        'label'               => 'Test Block',
        'class_name'          => '',
        'blog_id'             => $blog->id,
    );
    $block->save or die $block->errstr;

    my $config_1 = MT->model('be_config')->new(
        'label'                 => 'Test Config 1',
        'block_display_options' => '{"common":[{"index":0,"panel":true,"shortcut":true,"typeId":"core-text"},{"index":1,"panel":true,"shortcut":true,"typeId":"mt-image"},{"index":2,"panel":true,"shortcut":true,"typeId":"mt-file"}]}',
        'created_by'            => $user->id,
        'blog_id'               => $blog->id,
    );
    $config_1->save or die $config_1->errstr;
    my $config_2 = MT->model('be_config')->new(
        'label'                 => 'Test Config 2',
        'block_display_options' => '{"common":[{"index":0,"panel":true,"shortcut":true,"typeId":"core-text"},{"index":1,"panel":true,"shortcut":true,"typeId":"mt-image"},{"index":2,"panel":true,"shortcut":true,"typeId":"mt-file"}]}',
        'created_by'            => $user->id,
        'blog_id'               => $blog->id,
    );
    $config_2->save or die $config_2->errstr;

    my $ct = MT::Test::Permission->make_content_type(
        blog_id => $blog->id,
        name    => 'test content type',
    );

    my $cf = MT::Test::Permission->make_content_field(
        blog_id         => $ct->blog_id,
        content_type_id => $ct->id,
        name            => 'multi line text',
        type            => 'multi_line_text',
    );

    my $fields = [{
        id        => $cf->id,
        label     => 1,
        name      => $cf->name,
        order     => 1,
        type      => $cf->type,
        unique_id => $cf->unique_id,
        options   => {
            be_config => $config_2->id,
        },
    }];
    $ct->fields($fields);
    $ct->save or die $ct->errstr;

    $blog->be_entry_config_id($config_1->id);
    $blog->be_page_config_id($config_2->id);
    $blog->save;

    my $app = MT::Test::App->new('MT::App::CMS');
    $app->login($user);
    $app->post_ok({
        __mode            => 'do_export_theme',
        blog_id           => $blog->id,
        theme_id          => 'BlockEditor',
        theme_name        => 'BlockEditor',
        theme_version     => '1,0',
        theme_author_name => 'Six Apart, Ltd.',
        theme_author_link => 'https://www.sixapart.com/',
        description       => 'BlockEditor test theme',
        include           => [qw(default_content_types be_block be_config be_pref)],
    });
    $app->has_no_permission_error;

    my $exported_theme = MT::Util::YAML::LoadFile(File::Spec->catfile($theme_dir, 'blockeditor', 'theme.yaml'));
    is_deeply(
        $exported_theme, {
            'label'       => 'BlockEditor',
            'description' => 'BlockEditor test theme',
            'elements'    => {
                'be_config' => {
                    'component' => 'MTBlockEditor',
                    'data'      => {
                        'config_2' => {},
                        'config_1' => {}
                    },
                    'importer' => 'be_config'
                },
                'be_block' => {
                    'data'      => { 'bgcolor_contents' => {} },
                    'importer'  => 'be_block',
                    'component' => 'MTBlockEditor'
                },
                'be_pref' => {
                    'data' => {
                        'entry_config' => $config_1->label,
                        'page_config'  => $config_2->label,
                    },
                    'importer'  => 'be_pref',
                    'component' => 'MTBlockEditor'
                },
                'default_content_types' => {
                    'importer' => 'default_content_types',
                    'data'     => [{
                        'name'   => 'test content type',
                        'fields' => [{
                            'name'      => 'multi line text',
                            'label'     => '1',
                            'order'     => '1',
                            'type'      => 'multi_line_text',
                            'be_config' => $config_2->label,
                        }],
                        'description'      => 'This is a sample.',
                        'user_disp_option' => undef
                    }],
                    'component' => undef,
                },
            },
            'version'     => '1,0',
            'author_name' => 'Six Apart, Ltd.',
            'id'          => 'blockeditor',
            'name'        => 'BlockEditor',
            'class'       => 'blog',
            'author_link' => 'https://www.sixapart.com/'
        });

    my $exported_block = MT::Util::from_json($test_env->slurp(File::Spec->catfile($theme_dir, 'blockeditor', 'block_editor_blocks', 'bgcolor_contents.json')));
    is_deeply(
        $exported_block, {
            'show_preview'          => JSON::true,
            'wrap_root_block'       => JSON::false,
            'can_remove_block'      => JSON::false,
            'preview_header'        => '<script data-message="Hello, World!"></script>',
            'block_display_options' => {
                'common' => [{
                        'panel'    => JSON::true,
                        'shortcut' => JSON::false,
                        'index'    => 0,
                        'typeId'   => 'core-text'
                    },
                    {
                        'panel'    => JSON::true,
                        'index'    => 1,
                        'shortcut' => JSON::false,
                        'typeId'   => 'mt-image'
                    },
                    {
                        'panel'    => JSON::true,
                        'typeId'   => 'mt-file',
                        'shortcut' => JSON::false,
                        'index'    => 2
                    }]
            },
            'label'      => 'Test Block',
            'identifier' => 'bgcolor_contents',
            'html'       => {
                'context' => {
                    '2' => { 'text' => 'White' },
                    '1' => {
                        'options' => 'White
Black
Gray',
                        'className'    => 'color',
                        'label'        => 'Color',
                        'blockElement' => 'p'
                    }
                },
                'text' => '<!-- mt-beb t="sixapart-select" m=\'1,2\' --><p class="color">White</p><!-- /mt-beb -->'
            },
            'icon'       => 'data:image/svg+xml;<xml></xml>',
            'class_name' => ''
        });

    my $exported_config = MT::Util::from_json($test_env->slurp(File::Spec->catfile($theme_dir, 'blockeditor', 'block_editor_configs', 'config_1.json')));
    is_deeply(
        $exported_config, {
            'block_display_options' => {
                'common' => [{
                        'index'    => 0,
                        'shortcut' => JSON::true,
                        'typeId'   => 'core-text',
                        'panel'    => JSON::true
                    },
                    {
                        'shortcut' => JSON::true,
                        'typeId'   => 'mt-image',
                        'panel'    => JSON::true,
                        'index'    => 1
                    },
                    {
                        'index'    => 2,
                        'shortcut' => JSON::true,
                        'typeId'   => 'mt-file',
                        'panel'    => JSON::true
                    }]
            },
            'label' => 'Test Config 1'
        });
};

done_testing();
