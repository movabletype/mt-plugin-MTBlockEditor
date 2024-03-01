# Movable Type (r) (C) 2006-2020 Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.
#
# $Id$

package MT::Plugin::MTBlockEditor::L10N::en_us;

use strict;
use warnings;

use base 'MT::Plugin::MTBlockEditor::L10N';
use vars qw( %Lexicon );

my $block_editor_plugin = eval { MT->component('BlockEditor') };

%Lexicon = (
    "BLOCK_LABEL_CORE_TEXT"           => "Text Block",
    "BLOCK_LABEL_CORE_TABLE"          => "Table",
    "BLOCK_LABEL_CORE_HORIZONTALRULE" => "Horizontal Rule",
    "BLOCK_LABEL_CORE_HTML"           => "HTML",
    "BLOCK_LABEL_CORE_COLUMNS"        => "Columns",
    "BLOCK_LABEL_MT_IMAGE"            => "Image",
    "BLOCK_LABEL_MT_FILE"             => "File",
    "BLOCK_LABEL_SIXAPART_OEMBED"     => "oEmbed",
    "BLOCK_LABEL_SIXAPART_INPUT"      => "Text",
    "BLOCK_LABEL_SIXAPART_TEXTAREA"   => "Textarea",
    "BLOCK_LABEL_SIXAPART_SELECT"     => "Select",

    "Manage Custom Block Preset" => 'Manage Preset',

    (
        $block_editor_plugin
        ? (
            'Movable Type Block Editor'            => 'MT Block Editor',
            'Movable Type Block Editor Settings'   => 'MT Block Editor Settings',
            'Preset For Movable Type Block Editor' => 'Preset For MT Block Editor',
            )
        : (
            'Movable Type Block Editor'            => 'Block Editor',
            'Movable Type Block Editor Settings'   => 'Block Editor Settings',
            'Preset For Movable Type Block Editor' => 'Preset For Block Editor',
            'MT Block Editor Setting'              => 'Block Editor Setting',
        )
    ),
);

1;
