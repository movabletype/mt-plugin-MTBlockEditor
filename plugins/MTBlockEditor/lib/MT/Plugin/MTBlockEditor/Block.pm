package MT::Plugin::MTBlockEditor::Block;

use strict;
use warnings;
use utf8;

use MT::Plugin::MTBlockEditor qw(translate);
use base qw(MT::Object Class::Accessor::Fast);

use constant {
    ROOT_BLOCK_DEFAULT => 'div',
    MAX_ICON_SIZE      => 10 * 1024,          # 10KB
    MAX_ICON_SIZE_HARD => 10 * 1024 * 1.4,    # 10KB * overhead of base64
};

__PACKAGE__->install_properties(
    {   column_defs => {
            id         => 'integer not null auto_increment',
            blog_id    => 'integer not null',
            identifier => {
                type     => 'string',
                size     => 50,
                not_null => 1,
            },
            class_name => {
                type     => 'string',
                size     => 50,
                not_null => 1,
                default  => "",
            },
            label => {
                type     => 'string',
                size     => 50,
                not_null => 1,
            },
            icon             => 'text not null',
            html             => 'text not null',
            preview_header   => 'text not null',
            can_remove_block => {
                type     => 'boolean',
                not_null => 1,
                default  => 1,
            },
            root_block => {
                type     => 'string',
                size     => 16,
                not_null => 1,
                default  => "div",
            },
            addable_block_types => 'text not null',
        },

        indexes => {
            'identifier' => 1,
            'blog_id'    => 1,
        },

        child_of => [ 'MT::Blog', 'MT::Website' ],
        audit    => 1,

        datasource  => 'be_block',
        primary_key => 'id',
    }
);

__PACKAGE__->mk_accessors(qw(is_default_block is_default_hidden is_form_element));

sub DEFAULT_BLOCKS {
    [   map( { __PACKAGE__->new(
                    is_default_block => 1,
                    identifier       => $_,
                    label            => MT->translate( 'BLOCK_LABEL_' . ( uc($_) =~ s/-/_/gr ) ),
            ) }
            qw(core-text mt-image mt-file core-html sixapart-oembed core-horizontalrule core-table core-columns)
        ),
        map( { __PACKAGE__->new(
                    is_default_block  => 1,
                    is_default_hidden => 1,
                    is_form_element   => 1,
                    identifier        => $_,
                    label             => MT->translate( 'BLOCK_LABEL_' . ( uc($_) =~ s/-/_/gr ) ),
        ) } qw(sixapart-input sixapart-textarea sixapart-select) ),
    ];
}

sub class_label {
    return translate("Custom Block");
}

sub class_label_plural {
    return translate("Custom Blocks");
}

sub type_id {
    my $self = shift;
    $self->is_default_block ? $self->identifier : 'custom-' . $self->identifier;
}

sub is_default_visible {
    !shift->is_default_hidden;
}

1;
