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

# Entry
my $entry1 = MT::Test::Permission->make_entry(
    blog_id     => $blog->id,
    author_id   => $author->id,
    authored_on => '20180829000000',
    title       => 'entry',
    status      => MT::EntryStatus::RELEASE(),
);

# Content
my $content_type = MT::Test::Permission->make_content_type(blog_id => $blog_id);
my $cf_multi     = MT::Test::Permission->make_content_field(
    blog_id         => 1,
    content_type_id => $content_type->id,
    name            => 'multi',
    type            => 'multi_line_text',
);
$content_type->fields([{
        id        => $cf_multi->id,
        name      => $cf_multi->name,
        options   => { label => $cf_multi->name, },
        order     => 1,
        type      => $cf_multi->type,
        unique_id => $cf_multi->unique_id,
    },
]);
$content_type->save or die $content_type->errstr;

my $cd1 = MT::Test::Permission->make_content_data(
    blog_id         => $blog_id,
    content_type_id => $content_type->id,
    label           => 'label',
    data            => { $cf_multi->id => 'single line text' },
    identifier      => 'my content data',
    status          => MT::ContentStatus::RELEASE(),
);

my ($app, $out);

subtest 'entry' => sub {
    $app = _run_app(
        'MT::App::CMS',
        {
            __test_user      => $admin,
            __request_method => 'GET',
            __mode           => 'view',
            _type            => 'entry',
            blog_id          => $blog->id,
            id               => $entry1->id,
        });
    $out = delete $app->{__test_output};

    # loaded
    like $out, qr{mt-block-editor\.js};
    like $out, qr{<option value="block_editor">Movable Type Block Editor</option>};
};

subtest 'content_data' => sub {
    $app = _run_app(
        'MT::App::CMS',
        {
            __test_user      => $admin,
            __request_method => 'GET',
            __mode           => 'view',
            _type            => 'content_data',
            content_type_id  => $content_type->id,
            blog_id          => $blog->id,
            id               => $cd1->id,
        });
    $out = delete $app->{__test_output};

    # loaded
    like $out, qr{mt-block-editor\.js};
    like $out, qr{<option value="block_editor">Movable Type Block Editor</option>};
};

subtest 'cfg_entry' => sub {
    subtest 'view' => sub {
        my $config = MT::Test::MTBlockEditor::make_be_config();

        $app = _run_app(
            'MT::App::CMS',
            {
                __test_user      => $admin,
                __request_method => 'GET',
                __mode           => 'cfg_entry',
                blog_id          => $blog->id,
            });
        $out = delete $app->{__test_output};

        like $out, qr{<option value="@{[$config->id]}"[^>]*>\Q@{[$config->label]}\E</option>};
    };
};

subtest 'update config' => sub {
    my $config_entry = MT::Test::MTBlockEditor::make_be_config();
    my $config_page  = MT::Test::MTBlockEditor::make_be_config();

    $app = _run_app(
        'MT::App::CMS',
        {
            __test_user        => $admin,
            __request_method   => 'POST',
            __mode             => 'save',
            _type              => 'website',
            id                 => $blog->id,
            be_entry_config_id => $config_entry->id,
            be_page_config_id  => $config_page->id,
        });

    $blog->refresh;
    is $blog->be_entry_config_id, $config_entry->id;
    is $blog->be_page_config_id,  $config_page->id;
};

done_testing();
