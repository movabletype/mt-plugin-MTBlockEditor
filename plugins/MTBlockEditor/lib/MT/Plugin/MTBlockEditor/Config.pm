package MT::Plugin::MTBlockEditor::Config;

use strict;
use warnings;
use utf8;

use MT::Plugin::MTBlockEditor qw(translate);
use base qw( MT::Object );

__PACKAGE__->install_properties(
    {   column_defs => {
            id                    => 'integer not null auto_increment',
            blog_id               => 'integer not null',
            block_display_options => 'text not null',
            label                 => {
                type     => 'string',
                size     => 50,
                not_null => 1,
            },
        },

        indexes => { 'blog_id' => 1, },

        child_of => [ 'MT::Blog', 'MT::Website' ],
        audit    => 1,

        datasource  => 'be_config',
        primary_key => 'id',
    }
);

sub class_label {
    return translate("Custom Block Preset");
}

sub class_label_plural {
    return translate("Custom Block Presets");
}

1;
