#!/usr/bin/perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../../../t/lib", "$FindBin::Bin/lib";
use Test::More;
use Test::Deep;
use MT::Test::Env;
our $test_env;

BEGIN {
    $test_env       = MT::Test::Env->new;
    $ENV{MT_CONFIG} = $test_env->config_file;
    $ENV{MT_APP}    = 'MT::App::CMS';
}

use JSON::XS;
use MT;
use MT::BackupRestore;
use MT::Serialize;
use MT::Test;
use MT::Test::Permission;
use MT::Test::MTBlockEditor;
use MT::BlockEditor::Parser;
use Class::Method::Modifiers qw(after);

MT::Test->init_app;

$test_env->prepare_fixture('db_data');
my $mt   = MT->instance;
my $user = MT::Author->load(1);
$mt->user($user);
$mt->config->ThemesDirectory(Cwd::realpath("$FindBin::Bin/themes"));

subtest 'apply' => sub {
    my $blog = MT->model('blog')->new(
        name => 'Blog',
    );
    $blog->save or die $blog->errstr;

    my $theme;
    ok(
        $theme = MT::Theme->_load_from_themes_directory('block-editor'),
        'Load from themes directory'
    );
    ok $theme->apply($blog);

    my @blocks = MT->model('be_block')->load({ blog_id => $blog->id });
    is scalar @blocks, 1, 'Import a block';
    my $block = $blocks[0];
    cmp_deeply $block->column_values, superhashof({
        'preview_header'      => '<script data-message="Hello, World!"></script>',
        'show_preview'        => '1',
        'root_block'          => '',
        'icon'                => 'data:image/svg+xml;base64,PHN2ZyBpZD0i44Os44Kk44Ok44O8XzEiIGRhdGEtbmFtZT0i44Os44Kk44Ok44O8IDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDUxMiA1MTIiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojNjY2O30uY2xzLTJ7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48cmVjdCBjbGFzcz0iY2xzLTEiIHk9IjMwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjQ1MiIgcng9IjYxLjQzIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTIzLjI1LDMxMmExNC4xMiwxNC4xMiwwLDAsMCw5LjcxLTMuMjksMTEuNTEsMTEuNTEsMCwwLDAsMy44OS04Ljc0SDE1Ny4xYTI3LjcxLDI3LjcxLDAsMCwxLTQuNDgsMTUuMDcsMjkuNjEsMjkuNjEsMCwwLDEtMTIuMDcsMTAuNjIsMzcuNzQsMzcuNzQsMCwwLDEtMTYuOTMsMy43OHEtMTcuMzQsMC0yNy4zNi0xMVQ4Ni4yNSwyODh2LTEuNDJxMC0xOC42OSw5Ljk0LTI5Ljg0dDI3LjI4LTExLjE0cTE1LjE3LDAsMjQuMzMsOC42NHQ5LjMsMjNIMTM2Ljg1QTE0Ljg1LDE0Ljg1LDAsMCwwLDEzMywyNjYuOTMsMTMsMTMsMCwwLDAsMTIzLjEsMjYzcS03LjU2LDAtMTEuNCw1LjUxdC0zLjg1LDE3Ljg1djIuMjVxMCwxMi41LDMuODEsMThUMTIzLjI1LDMxMloiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNjYuMTEsMjg2Ljc1YTQ4LDQ4LDAsMCwxLDQuNjQtMjEuNDYsMzMuOTEsMzMuOTEsMCwwLDEsMTMuMzQtMTQuNTgsMzguODksMzguODksMCwwLDEsMjAuMjItNS4xNnExNi4zNywwLDI2LjcxLDEwdDExLjU1LDI3LjIybC4xNSw1LjU0cTAsMTguNjItMTAuMzksMjkuODd0LTI3Ljg4LDExLjI2cS0xNy40OSwwLTI3LjkxLTExLjIydC0xMC40My0zMC41MVptMjEuNiwxLjU0cTAsMTEuNTQsNC4zNCwxNy42M3QxMi40LDYuMWExNC4zNCwxNC4zNCwwLDAsMCwxMi4yNi02cTQuNDEtNiw0LjQxLTE5LjI4LDAtMTEuMzEtNC40MS0xNy41MmExNC4zMywxNC4zMywwLDAsMC0xMi40LTYuMjIsMTQuMDksMTQuMDksMCwwLDAtMTIuMjYsNi4xOFExODcuNzEsMjc1LjM0LDE4Ny43MSwyODguMjlaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjc4LjgsMzI3LjlIMjU3LjEyVjIxMy4wOUgyNzguOFoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yOTMuMjUsMjg2Ljc1YTQ4LDQ4LDAsMCwxLDQuNjMtMjEuNDYsMzQsMzQsMCwwLDEsMTMuMzQtMTQuNTgsMzguOTEsMzguOTEsMCwwLDEsMjAuMjItNS4xNnExNi4zNywwLDI2LjcyLDEwdDExLjU1LDI3LjIybC4xNSw1LjU0cTAsMTguNjItMTAuMzksMjkuODd0LTI3Ljg4LDExLjI2cS0xNy40OSwwLTI3LjkyLTExLjIydC0xMC40Mi0zMC41MVptMjEuNiwxLjU0cTAsMTEuNTQsNC4zMywxNy42M3QxMi40MSw2LjFhMTQuMzUsMTQuMzUsMCwwLDAsMTIuMjYtNnE0LjQxLTYsNC40MS0xOS4yOCwwLTExLjMxLTQuNDEtMTcuNTJBMTQuMzUsMTQuMzUsMCwwLDAsMzMxLjQ0LDI2M2ExNC4xLDE0LjEsMCwwLDAtMTIuMjYsNi4xOFEzMTQuODUsMjc1LjM0LDMxNC44NSwyODguMjlaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNDI4LjU4LDI2Ny4yN2E1OC40Nyw1OC40NywwLDAsMC03Ljc3LS42cS0xMi4yNiwwLTE2LjA3LDguM1YzMjcuOWgtMjEuNlYyNDdoMjAuNDFsLjU5LDkuNzJxNi41MS0xMS4xNSwxOC0xMS4xNGEyMi41MSwyMi41MSwwLDAsMSw2LjcyLDFaIi8+PC9zdmc+',
        'identifier'          => 'bgcolor_contents',
        'html'                => '<!-- mt-beb t="core-context" m=\'{"1":{"blockElement":"p","className":"color","label":"Color","options":"White\\nBlack\\nGray"},"2":{"text":"White"}}\' --><!-- /mt-beb --><!-- mt-beb t="sixapart-select" m=\'1,2\' --><p class="color">White</p><!-- /mt-beb -->',
        'addable_block_types' => '{"common":[{"index":0,"panel":true,"shortcut":false,"typeId":"core-text"},{"index":1,"panel":true,"shortcut":false,"typeId":"mt-image"},{"index":2,"panel":true,"shortcut":false,"typeId":"mt-file"}]}',
        'can_remove_block'    => '0',
        'created_by'          => $user->id,
        'label'               => 'Test Block',
        'class_name'          => '',
        'blog_id'             => $blog->id,
    });

    my @configs = MT->model('be_config')->load({ blog_id => $blog->id });
    is scalar @configs, 2, 'Import configs';
    my ($config_1, $config_2) = sort { $a->label cmp $b->label } @configs;
    cmp_deeply $config_1->column_values, superhashof({
        'label'                 => 'Test Config 1',
        'block_display_options' => '{"common":[{"index":0,"panel":true,"shortcut":true,"typeId":"core-text"},{"index":1,"panel":true,"shortcut":true,"typeId":"mt-image"},{"index":2,"panel":true,"shortcut":true,"typeId":"mt-file"}]}',
        'created_by'            => $user->id,
        'blog_id'               => $blog->id,
    });

    my @content_types = MT->model('content_type')->load({ blog_id => $blog->id });
    is scalar @content_types, 1, 'Import a content type';
    my $content_type = $content_types[0];
    my ($field) = MT->model('content_field')->load({ content_type_id => $content_type->id });
    ok $field;
    is $field->options->{be_config}, $config_2->id;

    is $blog->be_entry_config_id, $config_1->id;
    is $blog->be_page_config_id, $config_2->id;
};

done_testing();
