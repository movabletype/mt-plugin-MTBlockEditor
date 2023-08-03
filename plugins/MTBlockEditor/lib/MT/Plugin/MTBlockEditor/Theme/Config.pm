# Movable Type (r) (C) Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::Theme::Config;

use strict;
use warnings;
use utf8;

use MT::Plugin::MTBlockEditor qw(load_tmpl);

sub condition {
    my ($blog) = @_;
    MT->model('be_config')->exist({ blog_id => $blog->id });
}

sub export_template {
    my $app = shift;
    my ($blog, $saved) = @_;
    my $checked_ids = $saved ? +{ map { $_ => 1 } @{ $saved->{be_config_export_ids} } } : +{};
    my $configs     = [
        map {
            +{
                id      => $_->id,
                label   => $_->label,
                checked => $checked_ids->{ $_->id },
            }
        } MT->model('be_config')->load({ blog_id => $blog->id })];
    return load_tmpl(
        'theme_export.tmpl',
        {
            params_name => 'be_config_export_ids',
            objs        => $configs,
        },
    );
}

sub export {

}

sub finalize {
    1;
}

1;
