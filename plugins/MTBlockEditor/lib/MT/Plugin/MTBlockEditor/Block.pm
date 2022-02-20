package MT::Plugin::MTBlockEditor::Block;

use strict;
use warnings;
use utf8;

use JSON;
use MT::Util;
use MT::Plugin::MTBlockEditor qw(translate);
use base qw(MT::Object Class::Accessor::Fast);

use constant {
    ROOT_BLOCK_DEFAULT => 'div',
    MAX_ICON_SIZE      => 10 * 1024,          # 10KB
    MAX_ICON_SIZE_HARD => 10 * 1024 * 1.4,    # 10KB * overhead of base64
};

__PACKAGE__->install_properties({
    column_defs => {
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
            default  => ROOT_BLOCK_DEFAULT,
        },
        addable_block_types => 'text not null',
        show_preview        => {
            type     => 'boolean',
            not_null => 1,
            default  => 1,
        },
    },

    indexes => {
        'identifier' => 1,
        'blog_id'    => 1,
    },

    defaults => {
        root_block       => ROOT_BLOCK_DEFAULT,
        can_remove_block => 1,
        show_preview     => 1,
    },

    child_of => ['MT::Blog', 'MT::Website'],
    audit    => 1,

    datasource  => 'be_block',
    primary_key => 'id',
});

__PACKAGE__->mk_accessors(qw(is_default_block is_default_hidden is_form_element));

my $plugin_block_type_loaded = 0;
my @plugin_block_types       = ();

sub plugin_block_types {
    if ($plugin_block_type_loaded) {
        return @plugin_block_types;
    }
    $plugin_block_type_loaded = 1;

    my $regs = MT::Component->registry('editors', 'block_editor', 'block_types');
    if ($regs && ref $regs eq 'ARRAY') {
        for my $reg (@$regs) {
            for my $identifier (keys %$reg) {
                my $d = $reg->{$identifier};
                push @plugin_block_types,
                    __PACKAGE__->new(
                    is_default_block => 1,
                    identifier       => $identifier,
                    map { $_ => defined($d->{$_}) ? $d->{$_} : '' } qw(label is_default_hidden is_form_element identifier)
                    );
            }
        }
    }

    return @plugin_block_types;
}

sub _identifier_to_label {
    my ($str) = @_;
    $str = uc($str);
    $str =~ s/-/_/g;
    translate('BLOCK_LABEL_' . $str);
}

sub DEFAULT_BLOCKS {
    [
        map({
                __PACKAGE__->new(
                    is_default_block => 1,
                    identifier       => $_,
                    label            => _identifier_to_label($_),
                )
        } qw(core-text mt-image mt-file core-html sixapart-oembed core-horizontalrule core-table core-columns)),
        map({
                (my $label_id = uc($_)) =~ s/-/_/g;
                __PACKAGE__->new(
                    is_default_block  => 1,
                    is_default_hidden => 1,
                    is_form_element   => 1,
                    identifier        => $_,
                    label             => _identifier_to_label($_),
                )
        } qw(sixapart-input sixapart-textarea sixapart-select)),
        plugin_block_types(),
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

sub should_be_compiled {
    my $self = shift;
    $self->preview_header =~ m/<\s*script/i;
}

sub is_default_visible {
    !shift->is_default_hidden;
}

sub _fillin_default_values {
    my $self = shift;

    my $defs = $self->column_defs;
    while (my ($col, $def) = each %$defs) {
        next if !$def->{not_null};
        next if defined $self->$col;
        next if $def->{type} ne 'text' && !exists $def->{default};
        $self->$col($def->{type} eq 'text' ? '' : $def->{default});
    }
}

sub insert {
    my $self = shift;

    $self->_fillin_default_values;

    return unless $self->validate;

    $self->SUPER::insert(@_);
}

sub save {
    my $self = shift;

    return unless $self->validate;

    $self->SUPER::save(@_);
}

sub validate {
    my $self = shift;

    return unless $self->_validate_label;
    return unless $self->_validate_identifier;
    return unless $self->_validate_icon;

    1;
}

sub _validate_label {
    my $self = shift;

    return $self->error(translate("Invalid value"))
        unless defined($self->label) && $self->label ne '';

    return 1;
}

sub _validate_identifier {
    my $self       = shift;
    my $identifier = $self->identifier;

    return $self->error(translate('The identifier is required.'))
        unless defined($identifier) && $identifier ne '';

    return $self->error(translate('Invalid value'))
        unless $identifier =~ m/\A[a-zA-Z0-9_]+\z/;

    my @same_identifiers = ref($self)->load({
            ($self->id ? (id => { op => '!=', value => $self->id }) : ()),
            identifier => $identifier,
        },
        { fetchonly => { blog_id => 1 }, });

    return $self->error(translate('An identifier "[_1]" is already used in the site scope.', $identifier))
        if $self->blog_id
        ? grep { $self->blog_id == $_->blog_id } @same_identifiers
        : grep { $_->blog_id } @same_identifiers;

    return $self->error(translate('An identifier "[_1]" is already used in the global scope.', $identifier))
        if grep { !$_->blog_id } @same_identifiers;

    return 1;
}

sub _validate_icon {
    my $self = shift;

    return $self->error(translate('Invalid value'))
        if length $self->icon > MAX_ICON_SIZE_HARD;

    return 1;
}

sub TO_JSON {
    my $self = shift;
    +{
        typeId            => $self->type_id,
        className         => $self->class_name,
        label             => $self->label,
        icon              => $self->icon,
        html              => $self->html,
        canRemoveBlock    => $self->can_remove_block ? JSON::true : JSON::false,
        rootBlock         => $self->root_block,
        previewHeader     => $self->preview_header,
        shouldBeCompiled  => $self->should_be_compiled ? JSON::true : JSON::false,
        addableBlockTypes => MT::Util::from_json($self->addable_block_types || '{}'),
        showPreview       => $self->show_preview ? JSON::true : JSON::false,
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
