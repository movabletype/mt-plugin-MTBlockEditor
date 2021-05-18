use strict;
use warnings;
use utf8;

use FindBin;
use lib qw(lib extlib), "$FindBin::Bin/../lib";

use Test::More;
use MT::Test::Env;
our $test_env;
BEGIN {
    $test_env = MT::Test::Env->new;
    $ENV{MT_CONFIG} = $test_env->config_file;
}

use MT;
use MT::Test;
use MT::Test::Fixture;
use MT::Test::Tag;

plan tests => 1 * blocks;

filters {
    template => [qw( chomp )],
    expected => [qw( chomp )],
};

MT::Test->init_app;
$test_env->prepare_fixture('db');

my $website_name   = 'MTBlockEditor-tag-' . time();
my $super          = 'super';
my $entry_basename = 'block_editor';

my $objs = MT::Test::Fixture->prepare(
    {   author  => [ { 'name' => $super }, ],
        blog => [
            {   name     => $website_name,
                site_url => 'http://example.com/blog/',
            },
        ],
        entry => [
            {
                author => $super,
                blog   => $website_name,
                basename => $entry_basename,
                convert_breaks => 'block_editor',
                text           => <<TEXT,
<!-- mt-beb t="core-text"--><p>test</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-block-editor-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>left</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>right</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb -->
TEXT
            },
        ],
        #        image => {
        #            'test.jpg' => {
        #                label       => 'Sample Image 1',
        #                description => 'Sample photo',
        #            },
        #        },
    }
);
my $blog = $objs->{blog}{$website_name};
my $entry = $objs->{entry}{$entry_basename};
my $image = $objs->{image}{'test.jpg'};

MT::Test::Tag->run_perl_tests($blog->id, sub {
    my ($ctx, $block) = @_;
    $ctx->stash('entry' => $entry);
});

__END__

=== Load blocks via MT tag
--- template
<mt:BlockEditorBlocks tag="EntryBody">
<mt:Var name="__value__" -/>
</mt:BlockEditorBlocks>
--- expected
<p>test</p>
<div class="mt-block-editor-columns" style="display: flex"><div class="mt-block-editor-column"><p>left</p></div><div class="mt-block-editor-column"><p>right</p></div></div>

=== Load blocks via MT tag via variables
--- template
<mt:BlockEditorBlocks tag="EntryBody">
<mt:Var name="x" value="$__value__" /><mt:Var name="x" -/>
</mt:BlockEditorBlocks>
--- expected
<p>test</p>
<div class="mt-block-editor-columns" style="display: flex"><div class="mt-block-editor-column"><p>left</p></div><div class="mt-block-editor-column"><p>right</p></div></div>

=== Use mt:BlockEditorBlocks recursively
--- template
<mt:BlockEditorBlocks tag="EntryBody">
<mt:If name="type" eq="core-columns" ->
<div class="row">
<mt:BlockEditorBlocks ->
  <div class="col">
<mt:BlockEditorBlocks ->
    <mt:Var name="__value__" -/>
</mt:BlockEditorBlocks>
  </div>
</mt:BlockEditorBlocks>
</div>
<mt:Else>
<mt:Var name="__value__" -/>
</mt:If>
</mt:BlockEditorBlocks>
--- expected
<p>test</p>
<div class="row">
<div class="col">
<p>left</p></div>
<div class="col">
<p>right</p></div>
</div>

=== Load blocks from variable
--- template
<mt:BlockEditorBlocks name="content">
<mt:Var name="__value__" />
</mt:BlockEditorBlocks>
--- expected
<p>test</p>
<p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p>
--- content eval
qq{<!-- mt-beb t="core-text"--><p>test</p><!-- /mt-beb --><!-- mt-beb t="mt-image" m="{&quot;assetId&quot;:@{[$main::image->id]},&quot;assetUrl&quot;:&quot;https://blog-taaas-jp.movabletype.io/.assets/form-with-multipart.png&quot;,&quot;alignment&quot;:&quot;none&quot;,&quot;width&quot;:&quot;640&quot;}"--><p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p><!-- /mt-beb -->}

