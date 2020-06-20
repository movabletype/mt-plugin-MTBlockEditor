package MT::Plugin::MTBlockEditor::Config;

use strict;
use warnings;
use utf8;

use base qw( MT::Object );

__PACKAGE__->install_properties(
    {   column_defs => {
            id                    => 'integer not null auto_increment',
            blog_id               => 'integer not null',
            block_display_options => 'text not null',
        },

        indexes => { 'blog_id' => 1, },

        child_of => [ 'MT::Blog', 'MT::Website' ],
        audit    => 1,

        datasource  => 'be_config',
        primary_key => 'id',
    }
);

1;
