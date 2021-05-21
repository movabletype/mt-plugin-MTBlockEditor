use strict;
use warnings;
use utf8;

use FindBin;
use lib "$FindBin::Bin/../../../t/lib", "$FindBin::Bin/lib";

use JSON::XS;
use Test::Base;
use MT::Test::Env;

plan tests => 1 * blocks;

our $test_env;

BEGIN {
    $test_env
        = MT::Test::Env->new( PluginPath => [ Cwd::realpath("$FindBin::Bin/../../../plugins") ], );

    $ENV{MT_APP}    = 'MT::App::CMS';
    $ENV{MT_CONFIG} = $test_env->config_file;
}

use MT::Test;
MT::Test->init_app;

sub block_editor {
    MT->instance->apply_text_filters( shift, [qw(block_editor)] );
}

filters { input => [qw( block_editor )], };
run_is input => 'expected';

__END__

=== block editor data
--- input
<!-- mt-beb t="core-text"--><p>test</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-block-editor-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>left</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>right</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb -->
--- expected
<p>test</p><div class="mt-block-editor-columns" style="display: flex"><div class="mt-block-editor-column"><p>left</p></div><div class="mt-block-editor-column"><p>right</p></div></div>

=== plain text
--- input
plain text
--- expected
plain text
