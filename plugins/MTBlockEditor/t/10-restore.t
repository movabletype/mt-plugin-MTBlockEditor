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
use MT::BackupRestore;
use MT::Test;
use MT::Test::Permission;
use MT::Test::MTBlockEditor;
use Class::Method::Modifiers qw(after);

MT::Test->init_app;

$test_env->prepare_fixture('db');

my $admin = MT::Author->load(1);
MT->instance->user($admin);

subtest 'blog' => sub {
    my $old_block_count  = MT->model('be_block')->count;
    my $old_config_count = MT->model('be_config')->count;

    my (@errors, %error_assets);
    my ($deferred, $blogs, $assets) = MT::BackupRestore->restore_directory(
        "$FindBin::Bin/backup/blog", \@errors, \%error_assets,
        MT->config->SchemaVersion,
        0, sub { print $_[0], "\n"; });
    my $blog_id = $blogs->[0];

    ok !@errors;
    ok !%error_assets;
    ok !%$deferred;

    is(MT->model('be_block')->count, $old_block_count + 1);
    my ($block) = MT->model('be_block')->load;
    is $block->blog_id, $blog_id;

    is(MT->model('be_config')->count, $old_config_count + 1);
    my ($config) = MT->model('be_config')->load;
    is $config->blog_id, $blog_id;
};

subtest 'system' => sub {
    my $old_block_count  = MT->model('be_block')->count;
    my $old_config_count = MT->model('be_config')->count;

    subtest 'first' => sub {
        my (@errors, %error_assets);
        my ($deferred, $blogs, $assets) = MT::BackupRestore->restore_directory(
            "$FindBin::Bin/backup/system", \@errors, \%error_assets,
            MT->config->SchemaVersion,
            0, sub { print $_[0], "\n"; });

        ok !@errors;
        ok !%error_assets;
        ok !%$deferred;

        is(MT->model('be_block')->count, $old_block_count + 1);
        my ($block) = MT->model('be_block')->load(undef, { sort => 'id', direction => 'descend' });
        is $block->blog_id, 0;

        is(MT->model('be_config')->count, $old_config_count + 1);
        my ($config) = MT->model('be_config')->load(undef, { sort => 'id', direction => 'descend' });
        is $config->blog_id, 0;
    };

    subtest 'second' => sub {
        my (@errors, %error_assets);
        my ($deferred, $blogs, $assets) = MT::BackupRestore->restore_directory(
            "$FindBin::Bin/backup/system", \@errors, \%error_assets,
            MT->config->SchemaVersion,
            0, sub { print $_[0], "\n"; });

        is_deeply \@errors, [
            qq{An identifier "global_block" is already used in the global scope.\n},
        ];
        ok !%error_assets;
        ok !%$deferred;

        is(MT->model('be_block')->count, $old_block_count + 1, 'should not be added');

        is(MT->model('be_config')->count, $old_config_count + 2, 'MT::Plugin::MTBlockEditor::Config can be registered in duplicate');
        my ($config) = MT->model('be_config')->load(undef, { sort => 'id', direction => 'descend' });
        is $config->blog_id, 0;
    };
};

done_testing();
