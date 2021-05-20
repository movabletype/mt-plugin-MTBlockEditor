package MT::Test::MTBlockEditor;

use strict;
use warnings;

use JSON;
use MT::Util;

our $block_display_options = {
    "common" => [{
            "typeId"   => "core-text",
            "index"    => 0,
            "panel"    => JSON::true,
            "shortcut" => JSON::true
        },
        {
            "typeId"   => "mt-image",
            "index"    => 1,
            "panel"    => JSON::true,
            "shortcut" => JSON::true
        },
        {
            "typeId"   => "mt-file",
            "index"    => 2,
            "panel"    => JSON::true,
            "shortcut" => JSON::true
        },
        {
            "typeId"   => "core-html",
            "index"    => 3,
            "panel"    => JSON::true,
            "shortcut" => JSON::false
        },
        {
            "typeId"   => "sixapart-oembed",
            "index"    => 4,
            "panel"    => JSON::true,
            "shortcut" => JSON::false
        },
        {
            "typeId"   => "core-horizontalrule",
            "index"    => 5,
            "panel"    => JSON::true,
            "shortcut" => JSON::false
        },
        {
            "typeId"   => "core-table",
            "index"    => 6,
            "panel"    => JSON::true,
            "shortcut" => JSON::false
        },
        {
            "typeId"   => "core-columns",
            "index"    => 7,
            "panel"    => JSON::true,
            "shortcut" => JSON::false
        }] };

sub make_be_config {
    my %overrides = @_;

    my $values = {
        blog_id               => 1,                                           # Maybe it exists
        label                 => 'Test Config ' . rand(),
        block_display_options => MT::Util::to_json($block_display_options),
        %overrides,
    };

    my $obj = MT->model('be_config')->new();
    $obj->set_values($values);
    $obj->save
        or die "Couldn't save be_config record: " . $obj->errstr;

    return $obj;
}

sub make_be_block {
    my %overrides = @_;

    my $values = {
        blog_id             => 1,                        # Maybe it exists
        label               => 'Test Block ' . rand(),
        identifier          => int(rand(2**32)),
        icon                => '',
        html                => '',
        class_name          => '',
        preview_header      => '',
        can_remove_block    => 1,
        root_block          => 'div',
        addable_block_types => '{}',
        %overrides,
    };

    my $obj = MT->model('be_block')->new();
    $obj->set_values($values);
    $obj->save
        or die "Couldn't save be_block record: " . $obj->errstr;

    return $obj;
}

1;
