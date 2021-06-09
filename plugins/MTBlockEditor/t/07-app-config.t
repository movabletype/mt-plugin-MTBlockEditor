#!/usr/bin/perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../../../t/lib", "$FindBin::Bin/lib";
use Test::More;
use MT::Test::Env;
our $test_env;

BEGIN {
    $test_env = MT::Test::Env->new;
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
    subtest 'system scope' => sub {
        subtest 'has permission' => sub {
            for my $u ($admin) {
                my $label = 'New System Config By ' . $u->id;
                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user           => $u,
                        __request_method      => 'POST',
                        __mode                => 'save',
                        _type                 => 'be_config',
                        blog_id               => 0,
                        label                 => $label,
                        block_display_options => MT::Util::to_json($MT::Test::MTBlockEditor::block_display_options),
                    });
                $out = delete $app->{__test_output};

                like $out, qr/Status: 302/;

                my ($created_id) = $out =~ m{\bid=([0-9]+)};
                my $created = MT->model('be_config')->load($created_id);
                ok $created;
                is $created->label,   $label;
                is $created->blog_id, 0;
            }
        };

        subtest 'has not permission' => sub {
            for my $u ($designer, $author) {
                my $count = MT->model('be_config')->count;
                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user           => $u,
                        __request_method      => 'POST',
                        __mode                => 'save',
                        _type                 => 'be_config',
                        blog_id               => 0,
                        label                 => 'By author',
                        block_display_options => MT::Util::to_json($MT::Test::MTBlockEditor::block_display_options),
                    });
                $out = delete $app->{__test_output};
                unlike $out, qr{\bid=([0-9]+)};
                is $count,   MT->model('be_config')->count;
            }
        };
    };

    subtest 'blog scope' => sub {
        subtest 'has permission' => sub {
            for my $u ($admin, $designer) {
                my $label = 'New Config By ' . $u->id;
                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user           => $u,
                        __request_method      => 'POST',
                        __mode                => 'save',
                        _type                 => 'be_config',
                        blog_id               => $blog->id,
                        label                 => $label,
                        block_display_options => MT::Util::to_json($MT::Test::MTBlockEditor::block_display_options),
                    });
                $out = delete $app->{__test_output};

                like $out, qr/Status: 302/;

                my ($created_id) = $out =~ m{\bid=([0-9]+)};
                my $created = MT->model('be_config')->load($created_id);
                ok $created;
                is $created->label, $label;
            }
        };

        subtest 'has not permission' => sub {
            my $count = MT->model('be_config')->count;
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user           => $author,
                    __request_method      => 'POST',
                    __mode                => 'save',
                    _type                 => 'be_config',
                    blog_id               => $blog->id,
                    label                 => 'By author',
                    block_display_options => MT::Util::to_json($MT::Test::MTBlockEditor::block_display_options),
                });
            $out = delete $app->{__test_output};
            unlike $out, qr{\bid=([0-9]+)};
            is $count,   MT->model('be_config')->count;
        };
    };
};

subtest 'read' => sub {
    subtest 'system scope' => sub {
        my $config = MT::Test::MTBlockEditor::make_be_config(
            blog_id => 0,
        );
        subtest 'has permission' => sub {
            for my $u ($admin) {
                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user      => $u,
                        __request_method => 'GET',
                        __mode           => 'view',
                        _type            => 'be_config',
                        blog_id          => 0,
                        id               => $config->id,
                    });
                $out = delete $app->{__test_output};
                like $out, qr/Status: 200/;
                like $out, qr/value="@{[$config->label]}"/;
            }
        };

        subtest 'has not permission' => sub {
            for my $u ($designer, $author) {
                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user      => $u,
                        __request_method => 'GET',
                        __mode           => 'view',
                        _type            => 'be_config',
                        blog_id          => 0,
                        id               => $config->id,
                    });
                $out = delete $app->{__test_output};
                unlike $out, qr/Status: 200/;
            }
        };
    };

    subtest 'blog scope' => sub {
        my $config = MT::Test::MTBlockEditor::make_be_config();
        subtest 'has permission' => sub {
            for my $u ($admin, $designer) {
                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user      => $u,
                        __request_method => 'GET',
                        __mode           => 'view',
                        _type            => 'be_config',
                        blog_id          => $blog->id,
                        id               => $config->id,
                    });
                $out = delete $app->{__test_output};
                like $out, qr/Status: 200/;
                like $out, qr/value="@{[$config->label]}"/;
            }
        };

        subtest 'has not permission' => sub {
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $author,
                    __request_method => 'GET',
                    __mode           => 'view',
                    _type            => 'be_config',
                    blog_id          => $blog->id,
                    id               => $config->id,
                });
            $out = delete $app->{__test_output};
            unlike $out, qr/Status: 200/;
        };
    };
};

subtest 'update' => sub {
    subtest 'system scope' => sub {
        subtest 'has permission' => sub {
            for my $u ($admin) {
                my $config = MT::Test::MTBlockEditor::make_be_config(
                    label   => 'Test',
                    blog_id => 0,
                );

                my $new_label = 'Update Config By ' . $u->id;
                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user           => $u,
                        __request_method      => 'POST',
                        __mode                => 'save',
                        _type                 => 'be_config',
                        blog_id               => 0,
                        id                    => $config->id,
                        label                 => $new_label,
                        block_display_options => MT::Util::to_json($MT::Test::MTBlockEditor::block_display_options),
                    });
                $out = delete $app->{__test_output};

                like $out, qr/Status: 302/;

                $config->refresh;
                is $config->label, $new_label;
            }
        };

        subtest 'has not permission' => sub {
            for my $u ($designer, $author) {
                my $config = MT::Test::MTBlockEditor::make_be_config(
                    label   => 'Test',
                    blog_id => 0,
                );

                my $new_label = 'Updated By Author';
                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user           => $author,
                        __request_method      => 'POST',
                        __mode                => 'save',
                        _type                 => 'be_config',
                        blog_id               => 0,
                        id                    => $config->id,
                        label                 => $new_label,
                        block_display_options => MT::Util::to_json($MT::Test::MTBlockEditor::block_display_options),
                    });

                $out = delete $app->{__test_output};
                unlike $out, qr{\bid=([0-9]+)};

                $config->refresh;
                isnt $config->label, $new_label;
            }
        };
    };

    subtest 'blog scope' => sub {
        subtest 'has permission' => sub {
            for my $u ($admin, $designer) {
                my $config = MT::Test::MTBlockEditor::make_be_config(label => 'Test');

                my $new_label = 'Update Config By ' . $u->id;
                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user           => $u,
                        __request_method      => 'POST',
                        __mode                => 'save',
                        _type                 => 'be_config',
                        blog_id               => $blog->id,
                        id                    => $config->id,
                        label                 => $new_label,
                        block_display_options => MT::Util::to_json($MT::Test::MTBlockEditor::block_display_options),
                    });
                $out = delete $app->{__test_output};

                like $out, qr/Status: 302/;

                $config->refresh;
                is $config->label, $new_label;
            }
        };

        subtest 'has not permission' => sub {
            my $config = MT::Test::MTBlockEditor::make_be_config(label => 'Test');

            my $new_label = 'Updated By Author';
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user           => $author,
                    __request_method      => 'POST',
                    __mode                => 'save',
                    _type                 => 'be_config',
                    blog_id               => $blog->id,
                    id                    => $config->id,
                    label                 => $new_label,
                    block_display_options => MT::Util::to_json($MT::Test::MTBlockEditor::block_display_options),
                });

            $out = delete $app->{__test_output};
            unlike $out, qr{\bid=([0-9]+)};

            $config->refresh;
            isnt $config->label, $new_label;

        };
    }
};

subtest 'delete' => sub {
    subtest 'system scope' => sub {
        subtest 'has permission' => sub {
            for my $u ($admin) {
                my $config = MT::Test::MTBlockEditor::make_be_config(blog_id => 0);

                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user      => $u,
                        __request_method => 'POST',
                        __mode           => 'delete',
                        _type            => 'be_config',
                        blog_id          => $blog->id,
                        id               => $config->id,
                    });

                ok !MT->model('be_config')->exist({ id => $config->id });
            }
        };

        subtest 'has not permission' => sub {
            for my $u ($designer, $author) {
                my $config = MT::Test::MTBlockEditor::make_be_config(blog_id => 0);

                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user      => $author,
                        __request_method => 'POST',
                        __mode           => 'delete',
                        _type            => 'be_config',
                        blog_id          => $blog->id,
                        id               => $config->id,
                    });

                ok !!MT->model('be_config')->exist({ id => $config->id });
            }
        };
    };

    subtest 'blog scope' => sub {
        subtest 'has permission' => sub {
            for my $u ($admin, $designer) {
                my $config = MT::Test::MTBlockEditor::make_be_config();

                $app = _run_app(
                    'MT::App::CMS',
                    {
                        __test_user      => $u,
                        __request_method => 'POST',
                        __mode           => 'delete',
                        _type            => 'be_config',
                        blog_id          => $blog->id,
                        id               => $config->id,
                    });

                ok !MT->model('be_config')->exist({ id => $config->id });
            }
        };

        subtest 'has not permission' => sub {
            my $config = MT::Test::MTBlockEditor::make_be_config();

            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $author,
                    __request_method => 'POST',
                    __mode           => 'delete',
                    _type            => 'be_config',
                    blog_id          => $blog->id,
                    id               => $config->id,
                });

            ok !!MT->model('be_config')->exist({ id => $config->id });
        };
    };
};

done_testing();
