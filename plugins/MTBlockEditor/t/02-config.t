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

use MT::Util::UniqueID qw(create_uuid);
use MT::Test;
use MT::Test::Fixture;

MT::Test->init_app;

$test_env->prepare_fixture('db');

my $website_name = 'MTBlockEditor-website-' . time();
my $super        = 'super';

my $objs = MT::Test::Fixture->prepare({
    author  => [{ 'name' => $super },],
    website => [{
            name     => $website_name,
            site_url => 'http://example.com/blog/',
        },
    ],
});

my $website = $objs->{website}{$website_name};

my $model = MT->model('be_config');

subtest 'create()' => sub {
    ok $model->new(
        blog_id               => $website->id,
        label                 => create_uuid(),
        block_display_options => '{"common":[]}',
    )->save;

    subtest 'label' => sub {
        ok $model->new(
            blog_id               => $website->id,
            label                 => '0',
            block_display_options => '{"common":[]}',
        )->save;

        ok !$model->new(
            blog_id               => $website->id,
            label                 => '',
            block_display_options => '{"common":[]}',
        )->save;
    };

    subtest 'block_display_options' => sub {
        ok $model->new(
            blog_id               => $website->id,
            label                 => 'ok1',
            block_display_options => '{"common":["xx"]}',
        )->save;

        ok !$model->new(
            blog_id               => $website->id,
            label                 => 'ok2',
            block_display_options => 'aaa',
        )->save;

        ok !$model->new(
            blog_id               => $website->id,
            label                 => 'ok3',
            block_display_options => '{}',
        )->save;

        ok !$model->new(
            blog_id               => $website->id,
            label                 => 'ok4',
            block_display_options => '{"post":[]}',
        )->save;
    };
};

done_testing;
