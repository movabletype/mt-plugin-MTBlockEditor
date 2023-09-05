use strict;
use warnings;
use utf8;

use FindBin;
use lib "$FindBin::Bin/../../../t/lib";

use JSON::XS;
use Test::More;
use Test::Exception;
use MT::Test::Env;

our $test_env;

BEGIN {
    $test_env = MT::Test::Env->new(PluginPath => [Cwd::realpath("$FindBin::Bin/../../../plugins")],);

    $ENV{MT_APP}    = 'MT::App::CMS';
    $ENV{MT_CONFIG} = $test_env->config_file;
}

use MT::Util::UniqueID qw(create_md5_id);
use MT::Test;
use MT::Test::Fixture;

MT::Test->init_app;

$test_env->prepare_fixture('db');

my $website_name       = 'MTBlockEditor-website-' . time();
my $deferent_site_name = 'MTBlockEditor-deferent_site-' . time();
my $super              = 'super';

my $objs = MT::Test::Fixture->prepare({
    author  => [{ 'name' => $super },],
    website => [{
            name     => $website_name,
            site_url => 'http://example.com/blog/',
        },
        {
            name     => $deferent_site_name,
            site_url => 'http://example.com/blog/',
        },
    ],
});

my $website       = $objs->{website}{$website_name};
my $deferent_site = $objs->{website}{$deferent_site_name};

my $model = MT->model('be_block');

my %valid_params = (
    blog_id             => $website->id,
    label               => create_md5_id(),
    icon                => '',
    html                => '',
    class_name          => '',
    preview_header      => '',
    can_remove_block    => 1,
    root_block          => 'div',
    addable_block_types => '{}',
);

subtest 'insert()' => sub {
    subtest 'with full params' => sub {
        ok $model->new(%valid_params, (identifier => create_md5_id(),))->insert;
    };

    subtest 'without not_null string params' => sub {
        ok $model->new(
            blog_id    => $website->id,
            label      => create_md5_id(),
            identifier => create_md5_id(),
        )->insert;
    };
};

subtest 'save()' => sub {
    subtest 'identifier' => sub {
        ok $model->new(%valid_params, (identifier => create_md5_id(),))->save;

        ok $model->new(%valid_params, (identifier => '0',))->save;

        ok !$model->new(%valid_params, (identifier => '',))->save;

        ok !$model->new(%valid_params, (identifier => 'a-b',))->save;

        subtest 'duplicated' => sub {
            subtest 'same site' => sub {
                my $identifier = create_md5_id();

                ok $model->new(%valid_params, (identifier => $identifier))->save;

                ok !$model->new(%valid_params, (identifier => $identifier))->save;
            };

            subtest 'deferent site' => sub {
                my $identifier = create_md5_id();

                ok $model->new(
                    %valid_params,
                    (
                        blog_id    => $deferent_site->id,
                        identifier => $identifier
                    ))->save;

                ok $model->new(%valid_params, (identifier => $identifier))->save;
            };

            subtest 'global then site ' => sub {
                my $identifier = create_md5_id();

                ok $model->new(
                    %valid_params,
                    (
                        blog_id    => 0,
                        identifier => $identifier
                    ))->save;

                ok !$model->new(%valid_params, (identifier => $identifier))->save;
            };

            subtest 'global then global' => sub {
                my $identifier = create_md5_id();

                ok $model->new(
                    %valid_params,
                    (
                        blog_id    => 0,
                        identifier => $identifier
                    ))->save;

                ok !$model->new(
                    %valid_params,
                    (
                        blog_id    => 0,
                        identifier => $identifier
                    ))->save;
            };

            subtest 'site then global' => sub {
                my $identifier = create_md5_id();

                ok $model->new(%valid_params, (identifier => $identifier))->save;

                ok !$model->new(
                    %valid_params,
                    (
                        blog_id    => 0,
                        identifier => $identifier
                    ))->save;
            };
        };
    };

    subtest 'label' => sub {
        ok $model->new(
            %valid_params,
            (
                identifier => create_md5_id(),
                label      => '0',
            ))->save;

        ok !$model->new(
            %valid_params,
            (
                identifier => create_md5_id(),
                label      => '',
            ))->save;
    };

    subtest 'icon' => sub {
        ok $model->new(
            %valid_params,
            (
                identifier => create_md5_id(),
                icon       => "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cstyle%3E.st0%7Bfill:%23666%7D%3C/style%3E%3Cpath class='st0' d='M464 448H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48v288c0 26.5-21.5 48-48 48zM112 120c-30.9 0-56 25.1-56 56s25.1 56 56 56 56-25.1 56-56-25.1-56-56-56zM64 384h384V272l-87.5-87.5c-4.7-4.7-12.3-4.7-17 0L208 320l-55.5-55.5c-4.7-4.7-12.3-4.7-17 0L64 336v48z'/%3E%3C/svg%3E",
            ))->save;

        ok $model->new(
            %valid_params,
            (
                identifier => create_md5_id(),
                icon       => "a" x $model->MAX_ICON_SIZE_HARD,
            ))->save;

        ok !$model->new(
            %valid_params,
            (
                identifier => create_md5_id(),
                icon       => "a" x $model->MAX_ICON_SIZE_HARD . "a",
            ))->save;
    };

    subtest 'class_name' => sub {
        ok $model->new(
            %valid_params,
            (
                identifier => create_md5_id(),
                class_name => '0',
            ))->save;

        ok $model->new(
            %valid_params,
            (
                identifier => create_md5_id(),
                class_name => 'a' x 100,
            ))->save;

        ok !$model->new(
            %valid_params,
            (
                identifier => create_md5_id(),
                class_name => 'a' x 101,
            ))->save;
    };
};

subtest 'type_id()' => sub {
    subtest 'user defined block' => sub {
        my $block = $model->new(%valid_params, (identifier => create_md5_id(),));
        is $block->type_id, 'custom-' . $block->identifier;
    };

    subtest 'default block' => sub {
        is $model->DEFAULT_BLOCKS->[0]->type_id, 'core-text';
    };
};

subtest 'should_be_compiled();' => sub {
    subtest 'has script element' => sub {
        my $block = $model->new(
            %valid_params,
            (
                preview_header => <<HTML,
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css"  />
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
HTML
                identifier => create_md5_id(),
            ));
        ok $block->should_be_compiled;
    };

    subtest 'has no script element' => sub {
        my $block = $model->new(
            %valid_params,
            (
                preview_header => <<HTML,
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css" />
HTML
                identifier => create_md5_id(),
            ));
        ok !$block->should_be_compiled;
    };
};

subtest 'to_xml()' => sub {
    require MT::BackupRestore;

    subtest 'root_block="div"' => sub {
        my $obj = $model->new(%valid_params, root_block => 'div');
        like $obj->to_xml, qr/\A<\w+[^>]+root_block=(['"])div\1/;
    };

    subtest 'root_block=""' => sub {
        my $obj = $model->new(%valid_params, root_block => '');
        like $obj->to_xml, qr/\A<\w+ root_block=(['"])\1 /;
    };
};

done_testing;
