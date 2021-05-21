package MT::Plugin::MTBlockEditor::Config;

use strict;
use warnings;
use utf8;

use MT::Util qw();
use MT::Plugin::MTBlockEditor qw(translate);
use base qw( MT::Object );

__PACKAGE__->install_properties({
    column_defs => {
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

    child_of => ['MT::Blog', 'MT::Website'],
    audit    => 1,

    datasource  => 'be_config',
    primary_key => 'id',
});

sub class_label {
    return translate("Custom Block Preset");
}

sub class_label_plural {
    return translate("Custom Block Presets");
}

sub save {
    my $self = shift;

    return unless $self->_validate_label;
    return unless $self->_validate_block_display_options;

    $self->SUPER::save(@_);
}

sub _validate_label {
    my $self = shift;

    return $self->error(translate("Invalid value"))
        unless defined($self->label) && $self->label ne '';

    return 1;
}

sub _validate_block_display_options {
    my $self = shift;

    my $options = MT::Util::from_json($self->block_display_options);
    return $self->error(translate("Invalid value"))
        unless ref($options) eq 'HASH' && ref($options->{common}) eq 'ARRAY';

    return 1;
}

1;
