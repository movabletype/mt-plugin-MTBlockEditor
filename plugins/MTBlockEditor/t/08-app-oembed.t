#!/usr/bin/perl

use strict;
use warnings;
use utf8;
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
use MT::Test::Fixture;

MT::Test->init_app;

$test_env->prepare_fixture('db');

my $objs  = MT::Test::Fixture->prepare({ author => [{ 'name' => 'admin' },], });
my $admin = $objs->{author}{admin};

my ($app, $out);

my @services = ({
        name => "twitter",
        url  => "https://twitter.com/sixapartkk/status/1225330880022896640",
    },
    {
        name => "youtube",
        url  => "https://www.youtube.com/watch?v=-u48E3qV554",
    },
    {
        name => "slideshare",
        url  => "https://www.slideshare.net/sakk/movable-type-11711896",
    },
    # will be implemented soon
    # {   name => "instagram",
    #     url  => "https://www.instagram.com/p/0IUQeCTQWt/",
    # },
    {
        name => "soundcloud",
        url  => "https://soundcloud.com/scumgang6ix9ine/trollz-6ix9ine-with-nicki-minaj"
    },
    {
        name => "mixcloud",
        url  => "https://www.mixcloud.com/melodicdistraction/equinox-with-luna-february-20/"
    },
    {
        name => "vimeo",
        url  => "https://vimeo.com/160301271"
    },
    {
        name => "tiktok",
        url  => "https://www.tiktok.com/\@mr_yabatan/video/6833310883846835457?region=JP&mid=5000000001355149519&u_code=0&preview_pb=0&language=ja&_d=d0k36k1h5i8587&share_item_id=6833310883846835457&timestamp=1591173511&utm_campaign=client_share&app=tiktok&utm_medium=ios&tt_from=more&utm_source=more&iid=6834037252592469762&source=h5_t"
    },
    {
        name => "hatenablog",
        url  => "https://staff.hatenablog.com/entry/2014/08/29/141633"
    },
    {
        name => "hateblo",
        url  => "http://bandaicandy.hateblo.jp/entry/20200419_rider"
    },
    {
        name => "hatenadiary",
        url  => "https://hiboma.hatenadiary.jp/entry/2019/12/04/150718"
    },
);

subtest 'mt_be_oembed' => sub {
    for my $s (@services) {
        subtest $s->{name} => sub {
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $admin,
                    __request_method => 'GET',
                    __mode           => 'mt_be_oembed',
                    url              => $s->{url},
                });
            my ($headers, $body) = split(/\r\n\r\n/, delete($app->{__test_output}));
            my $res = eval { MT::Util::from_json(Encode::decode('UTF-8', $body)) };
            ok $res && $res->{html};
        }
    }

    subtest 'YouTube' => sub {
        subtest 'without size' => sub {
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $admin,
                    __request_method => 'GET',
                    __mode           => 'mt_be_oembed',
                    url              => 'https://www.youtube.com/watch?v=-u48E3qV554',
                });

            my ($headers, $body) = split(/\r\n\r\n/, delete($app->{__test_output}));
            my $res = eval { MT::Util::from_json(Encode::decode('UTF-8', $body)) };
            ok $res;
            is $res->{width},  200;
            is $res->{height}, 113;
        };

        subtest 'with maxwidth' => sub {
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $admin,
                    __request_method => 'GET',
                    __mode           => 'mt_be_oembed',
                    url              => 'https://www.youtube.com/watch?v=-u48E3qV554',
                    maxwidth         => 600,
                });

            my ($headers, $body) = split(/\r\n\r\n/, delete($app->{__test_output}));
            my $res = eval { MT::Util::from_json(Encode::decode('UTF-8', $body)) };
            ok $res;
            is $res->{width},  356;
            is $res->{height}, 200;
        };

        subtest 'with maxheight' => sub {
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $admin,
                    __request_method => 'GET',
                    __mode           => 'mt_be_oembed',
                    url              => 'https://www.youtube.com/watch?v=-u48E3qV554',
                    maxheight        => 200,
                });

            my ($headers, $body) = split(/\r\n\r\n/, delete($app->{__test_output}));
            my $res = eval { MT::Util::from_json(Encode::decode('UTF-8', $body)) };
            ok $res;
            is $res->{width},  200;
            is $res->{height}, 113;
        };

        subtest 'with maxwidth and maxheight' => sub {
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $admin,
                    __request_method => 'GET',
                    __mode           => 'mt_be_oembed',
                    url              => 'https://www.youtube.com/watch?v=-u48E3qV554',
                    maxwidth         => 800,
                    maxheight        => 450,
                });

            my ($headers, $body) = split(/\r\n\r\n/, delete($app->{__test_output}));
            my $res = eval { MT::Util::from_json(Encode::decode('UTF-8', $body)) };
            ok $res;
            is $res->{width},  800;
            is $res->{height}, 450;
        };
    };

    subtest 'Twitter' => sub {
        subtest 'valid URL' => sub {
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $admin,
                    __request_method => 'GET',
                    __mode           => 'mt_be_oembed',
                    url              => 'https://twitter.com/sixapartkk/status/1225330880022896640',
                });

            my ($headers, $body) = split(/\r\n\r\n/, delete($app->{__test_output}));
            my $res = eval { MT::Util::from_json(Encode::decode('UTF-8', $body)) };
            ok $res;
            like $res->{html}, qr{5周年を記念};
        };

        subtest 'invalid URL' => sub {
            $app = _run_app(
                'MT::App::CMS',
                {
                    __test_user      => $admin,
                    __request_method => 'GET',
                    __mode           => 'mt_be_oembed',
                    url              => 'https://twitter.com/sixapartkk/status/1225330880022896640-xxx',
                });

            my ($headers, $body) = split(/\r\n\r\n/, delete($app->{__test_output}));
            like $headers, qr/Status: 500/;

            my $res = eval { MT::Util::from_json(Encode::decode('UTF-8', $body)) };
            ok $res;
            ok $res->{error}{message};
        };
    };

    subtest 'invalid request' => sub {
        $app = _run_app(
            'MT::App::CMS',
            {
                __test_user      => $admin,
                __request_method => 'GET',
                __mode           => 'mt_be_oembed',
            });

        my ($headers, $body) = split(/\r\n\r\n/, delete($app->{__test_output}));
        like $headers, qr/Status: 400/;

        my $res = eval { MT::Util::from_json(Encode::decode('UTF-8', $body)) };
        ok $res;
        ok $res->{error}{message};
    };

    subtest 'unsupported' => sub {
        $app = _run_app(
            'MT::App::CMS',
            {
                __test_user      => $admin,
                __request_method => 'GET',
                __mode           => 'mt_be_oembed',
                url              => 'https://blog.sixapart.jp/',
            });

        my ($headers, $body) = split(/\r\n\r\n/, delete($app->{__test_output}));
        like $headers, qr/Status: 400/;

        my $res = eval { MT::Util::from_json(Encode::decode('UTF-8', $body)) };
        ok $res;
        ok $res->{error}{message};
    };
};

done_testing();
