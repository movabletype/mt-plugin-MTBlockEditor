# Movable Type (r) (C) Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::Theme::Pref;

use strict;
use warnings;
use utf8;

use MT::Plugin::MTBlockEditor qw(translate_label);

sub apply {
    my ($element, $theme, $obj_to_apply) = @_;
    my $data = $element->{data};
    if (   ref $obj_to_apply ne MT->model('blog')
        && ref $obj_to_apply ne MT->model('website'))
    {
        return $element->errtrans('this element cannot apply for non blog object.');
    }
    my $blog         = $obj_to_apply;
    my $config_model = MT->model('be_config');
    my $updated      = 0;
    for my $key (qw(entry_config page_config)) {
        next unless $data->{$key};
        my $label = translate_label($data->{$key}, $theme);
        my $config = $config_model->load({
            blog_id => [0, $blog->id],
            label   => $label,
        }) or next;
        my $column = "be_${key}_id";
        $blog->$column($config->id);
        $updated++;
    }

    return 1 unless $updated;

    $blog->save
        or return $element->errtrans(
        'Failed to save blog object: [_1]',
        $blog->errstr
        );
    return 1;
}

sub info {
    my ($element, $theme, $blog) = @_;
    my $class = defined $blog ? $blog->class : '';
    return $class
        ? sub {
        MT->translate('default settings of MTBlockEditor for [_1]', MT->translate($class));
        }
        : sub { MT->translate('default settings of MTBlockEditor') };
}

sub condition {
    my ($blog) = @_;
    !!($blog->be_entry_config_id || $blog->be_page_config_id);
}

sub export {
    my $app = shift;
    my ($blog) = @_;

    return +{
        map {
            my $key    = $_;
            my $column = "be_${key}_id";
            my $id     = $blog->$column;
            my $config = $id && MT->model('be_config')->load($id);
            $config ? ($key => $config->label) : ();
        } qw(entry_config page_config)
    };
}

1;
