package MT::Plugin::MTBlockEditor::Config;

use strict;
use warnings;
use utf8;

use MT::Util                  qw();
use MT::Plugin::MTBlockEditor qw(translate translate_label);
use base                      qw( MT::Object );

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

    my $label = $self->label;

    return $self->error(translate("Invalid value"))
        unless defined($label) && $label ne '';

    my @same_labels = ref($self)->load({
            ($self->id ? (id => { op => '!=', value => $self->id }) : ()),
            label => $label,
        },
        { fetchonly => { blog_id => 1 }, });

    return $self->error(translate('An label "[_1]" is already used in the site scope.', $label))
        if $self->blog_id
        ? grep { $self->blog_id == $_->blog_id } @same_labels
        : grep { $_->blog_id } @same_labels;

    return $self->error(translate('An label "[_1]" is already used in the global scope.', $label))
        if grep { !$_->blog_id } @same_labels;

    return 1;
}

sub _validate_block_display_options {
    my $self = shift;

    my $options = eval { MT::Util::from_json($self->block_display_options) };
    return $self->error(translate("Invalid value"))
        unless ref($options) eq 'HASH' && ref($options->{common}) eq 'ARRAY';

    return 1;
}

sub new_from_json {
    my $class = shift;
    my ($column_values, $component) = @_;

    $component ||= component();

    $class->new(
        label                 => translate_label($column_values->{label}, $component),
        block_display_options => MT::Util::to_json(delete $column_values->{block_display_options} || {}),
    );
}

sub export_to_json {
    my $self = shift;
    {
        label                 => $self->label,
        block_display_options => MT::Util::from_json($self->block_display_options || '{}'),
    };
}

# define for MT::BackupRestore
sub parents {
    my $obj = shift;
    {
        blog_id  => [MT->model('blog'), MT->model('website')],
        optional => 1,
    };
}

1;
