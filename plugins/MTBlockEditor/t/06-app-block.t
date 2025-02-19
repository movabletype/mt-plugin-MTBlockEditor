#!/usr/bin/perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../../../t/lib", "$FindBin::Bin/lib";
use Test::More;
use CGI;
use MT::Test::Env;
our $test_env;

BEGIN {
    $test_env = MT::Test::Env->new(AdminThemeID => $ENV{MT_TEST_ENV_ADMIN_THEME_ID} // 'admin2023');
    $ENV{MT_CONFIG} = $test_env->config_file;
}

use MT;
use MT::Util;
use MT::Test;
use MT::Test::Permission;
use MT::Test::MTBlockEditor;

MT::Test->init_app;

$test_env->prepare_fixture('db');

my $blog_id = 1;
my $blog    = MT::Blog->load($blog_id);

my $admin = MT::Author->load(1);

my $author = MT::Test::Permission->make_author(
    name     => 'author',
    nickname => 'author',
);
my $author_role = MT::Role->load({ name => MT->translate('Author') });
require MT::Association;
MT::Association->link($author => $author_role => $blog);

my $designer = MT::Test::Permission->make_author(
    name     => 'designer',
    nickname => 'designer',
);
my $designer_role = MT::Role->load({ name => MT->translate('Designer') });
require MT::Association;
MT::Association->link($designer => $designer_role => $blog);

my ($app, $out);

subtest 'create' => sub {
    subtest 'has permission' => sub {
        for my $u ($admin, $designer) {
            my $label = 'New Block By ' . $u->id;
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user         => $u,
                    __request_method    => 'POST',
                    __mode              => 'save',
                    _type               => 'be_block',
                    blog_id             => $blog->id,
                    label               => $label,
                    identifier          => 'identifier' . $u->id,
                    icon                => '',
                    html                => '',
                    class_name          => '',
                    preview_header      => '',
                    can_remove_block    => 1,
                    root_block          => 'div',
                    addable_block_types => '{}',
                });
            $out = delete $app->{__test_output};

            like $out, qr/Status: 302/;

            my ($created_id) = $out =~ m{\bid=([0-9]+)};
            my $created = MT->model('be_block')->load($created_id);
            ok $created;
            is $created->label, $label;
        }
    };

    subtest 'has not permission' => sub {
        my $count = MT->model('be_block')->count;
        $app = _run_app(
            'MT::App::CMS',
            {
                __test_user         => $author,
                __request_method    => 'POST',
                __mode              => 'save',
                _type               => 'be_block',
                blog_id             => $blog->id,
                label               => 'By author',
                identifier          => 'identifier' . $author->id,
                icon                => '',
                html                => '',
                class_name          => '',
                preview_header      => '',
                can_remove_block    => 1,
                root_block          => 'div',
                addable_block_types => '{}',
            });
        $out = delete $app->{__test_output};
        unlike $out, qr{\bid=([0-9]+)};
        is $count, MT->model('be_block')->count;
    };
};

subtest 'read' => sub {
    my $existing_block = MT::Test::MTBlockEditor::make_be_block(label => '"Existing Block"');
    my $block = MT::Test::MTBlockEditor::make_be_block();
    subtest 'has permission' => sub {
        for my $u ($admin, $designer) {
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $u,
                    __request_method => 'GET',
                    __mode           => 'view',
                    _type            => 'be_block',
                    blog_id          => $blog->id,
                    id               => $block->id,
                });
            $out = delete $app->{__test_output};
            like $out, qr/Status: 200/;
            like $out, qr/value="@{[$block->label]}"/;
            like $out, qr/\Q<div class="col" for="block-show-@{[$existing_block->type_id]}">@{[CGI::escapeHTML($existing_block->label)]}<\/div>\E/;
        }
    };

    subtest 'has not permission' => sub {
        $app = _run_app(
            'MT::App::CMS',
            {
                __test_user      => $author,
                __request_method => 'GET',
                __mode           => 'view',
                _type            => 'be_block',
                blog_id          => $blog->id,
                id               => $block->id,
            });
        $out = delete $app->{__test_output};
        unlike $out, qr/Status: 200/;
    };
};

subtest 'update' => sub {
    subtest 'has permission' => sub {
        for my $u ($admin, $designer) {
            my $block = MT::Test::MTBlockEditor::make_be_block(label => 'Test');

            my $new_label = 'Update Block By ' . $u->id;
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $u,
                    __request_method => 'POST',
                    __mode           => 'save',
                    _type            => 'be_block',
                    blog_id          => $blog->id,
                    id               => $block->id,
                    label            => $new_label,
                });
            $out = delete $app->{__test_output};

            like $out, qr/Status: 302/;

            $block->refresh;
            is $block->label, $new_label;
        }
    };

    subtest 'has not permission' => sub {
        my $block = MT::Test::MTBlockEditor::make_be_block(label => 'Test');

        my $new_label = 'Updated By Author';
        $app = _run_app(
            'MT::App::CMS',
            {
                __test_user      => $author,
                __request_method => 'POST',
                __mode           => 'save',
                _type            => 'be_block',
                blog_id          => $blog->id,
                id               => $block->id,
                label            => $new_label,
            });

        $out = delete $app->{__test_output};
        unlike $out, qr{\bid=([0-9]+)};

        $block->refresh;
        isnt $block->label, $new_label;

    };
};

subtest 'delete' => sub {
    subtest 'has permission' => sub {
        for my $u ($admin, $designer) {
            my $block = MT::Test::MTBlockEditor::make_be_block();

            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $u,
                    __request_method => 'POST',
                    __mode           => 'delete',
                    _type            => 'be_block',
                    blog_id          => $blog->id,
                    id               => $block->id,
                });

            ok !MT->model('be_block')->exist({ id => $block->id });
        }
    };

    subtest 'has not permission' => sub {
        my $block = MT::Test::MTBlockEditor::make_be_block();

        $app = _run_app(
            'MT::App::CMS',
            {
                __test_user      => $author,
                __request_method => 'POST',
                __mode           => 'delete',
                _type            => 'be_block',
                blog_id          => $blog->id,
                id               => $block->id,
            });

        ok !!MT->model('be_block')->exist({ id => $block->id });
    };
};

done_testing();
