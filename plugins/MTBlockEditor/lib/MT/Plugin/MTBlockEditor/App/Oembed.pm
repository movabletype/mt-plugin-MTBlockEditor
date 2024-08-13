# Movable Type (r) (C) 2006-2020 Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::App::Oembed;

use strict;
use warnings;
use utf8;

use MT::Util;
use MT::Plugin::MTBlockEditor qw(translate);

sub get_oembed_url {
    my ($url) = @_;

    # hatena
    return "https://hatenablog.com/oembed?url=${url}"
        if $url =~ m/\.(?:
    hatenablog\.com |
    hatenablog\.jp |
    hateblo\.jp |
    hatenadiary\.jp |
    hatenadiary\.com
    )/ix;

    # youtube
    return "https://www.youtube.com/oembed?url=${url}"
        if $url =~ /youtube|youtu\.be/i;

    # soundcloud
    return "https://soundcloud.com/oembed?url=${url}"
        if $url =~ /soundcloud/i;

    # mixcloud
    return "https://www.mixcloud.com/oembed/?url=${url}"
        if $url =~ /mixcloud/i;

    # vimeo
    return "https://vimeo.com/api/oembed.json?url=${url}"
        if $url =~ /vimeo/i;

    # slideshare
    return "https://www.slideshare.net/api/oembed/2?url=${url}"
        if $url =~ /slideshare/i;

    # twitter
    return "https://publish.twitter.com/oembed?url=${url}"
        if $url =~ /twitter/i;

    # FIXME: access token is required
    # instagram
    # if ( $url =~ /instagram|instagr\.am/i ) {
    #     $url =~ s/^(.+)\?.+$/$1/;
    #     return "https://graph.facebook.com/v10.0/instagram_oembed?url=${url}";
    # }

    # tiktok
    return "https://www.tiktok.com/oembed?url=${url}"
        if $url =~ /tiktok\.com\/.*\/video\/.*/i;

    return "";
}

sub response {
    my ($app, $json, $status) = @_;

    $app->response_code($status)
        if defined $status;
    $app->send_http_header("application/json; charset=utf-8");
    $app->print_encode($json);
    $app->{no_print_body} = 1;
}

sub error {
    my ($app, $msg, $status) = @_;
    response($app, MT::Util::to_json({ error => { message => $msg, }, }), $status);
}

sub resolve {
    my ($app)     = @_;
    my $url       = $app->param('url');
    my $maxwidth  = $app->param('maxwidth');
    my $maxheight = $app->param('maxheight');

    return error($app, translate('Invalid request.'), 400) unless $url;

    my $oembed_url = get_oembed_url($url);

    return error($app, translate('Unsupported URL.'), 400) unless $oembed_url;

    my $ua  = MT->new_ua;
    my $res = $ua->get($oembed_url . "&format=json" . ($maxwidth ? "&maxwidth=${maxwidth}" : "") . ($maxheight ? "&maxheight=${maxheight}" : ""));

    if ($res->code >= 500) {
        MT->log({
            message  => translate('Can not get oEmbed data from [_1]: [_2]', $oembed_url, $res->decoded_content),
            class    => 'system',
            category => 'MTBlockEditor',
            level    => MT::Log::ERROR(),
        });
        return error($app, translate('Can not get oEmbed data from [_1]: [_2]', $oembed_url, translate('An error occurred.')), 500);
    }

    return error($app, translate('Can not get oEmbed data from [_1]: [_2]', $oembed_url, $res->decoded_content), 500)
        unless $res->is_success;

    response($app, Encode::decode('UTF-8', $res->content));
}

1;
