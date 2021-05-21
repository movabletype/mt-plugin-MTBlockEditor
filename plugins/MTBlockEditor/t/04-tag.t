use strict;
use warnings;
use utf8;

use FindBin;
use lib "$FindBin::Bin/../../../t/lib";

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
use MT::Test::Image;
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

my $objs = MT::Test::Fixture->prepare({
    author => [{ 'name' => $super },],
    blog   => [{
            name     => $website_name,
            site_url => 'http://example.com/blog/',
        },
    ],
    entry => [{
            author         => $super,
            blog           => $website_name,
            basename       => $entry_basename,
            convert_breaks => 'block_editor',
            text           => <<TEXT,
<!-- mt-beb t="core-text"--><p>test</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-block-editor-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>left</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>right</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb -->
TEXT
        },
    ],
    image => {
        'test.jpg' => {
            label       => 'Sample Image 1',
            description => 'Sample photo',
        },
    },
});
our $author = $objs->{author}{$super};
our $blog   = $objs->{blog}{$website_name};
our $entry  = $objs->{entry}{$entry_basename};
our $image  = $objs->{image}{'test.jpg'};
our $pdf    = do {
    my $pdf = MT::Asset->new;
    $pdf->blog_id($blog->id);
    $pdf->url($blog->site_url . 'test.pdf');
    $pdf->file_path(File::Spec->catfile($ENV{MT_HOME}, "t", 'files', 'test.pdf'));
    $pdf->file_name('test.pdf');
    $pdf->file_ext('pdf');
    $pdf->mime_type('application/pdf');
    $pdf->label('PDF file');
    $pdf->created_by($author->id);
    $pdf->save or die "Couldn't save asset: " . $pdf->errstr;
    $pdf;
};

MT::Test::Tag->run_perl_tests(
    $blog->id,
    sub {
        my ($ctx, $block) = @_;

        if (my $content = $block->content) {
            $ctx->var('content', $content);
        }
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
<mt:Var name="__value__" -/>
</mt:BlockEditorBlocks>
--- expected
<p>test</p>
<p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p>
--- content eval
qq{<!-- mt-beb t="core-text"--><p>test</p><!-- /mt-beb --><!-- mt-beb t="mt-image" m="{&quot;assetId&quot;:@{[$main::image->id]},&quot;assetUrl&quot;:&quot;https://blog-taaas-jp.movabletype.io/.assets/form-with-multipart.png&quot;,&quot;alignment&quot;:&quot;none&quot;,&quot;width&quot;:&quot;640&quot;}"--><p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p><!-- /mt-beb -->}

=== mt:BlockEditorBlockAsset
--- template
<mt:BlockEditorBlocks name="content">
<mt:If name="type" eq="mt-image" ->
<mt:BlockEditorBlockAsset ->
<amp-img alt="<mt:AssetLabel />"
  src="<mt:AssetUrl />"
  width="<mt:AssetProperty property="image_width" />"
  height="<mt:AssetProperty property="image_height" />"
  layout="responsive">
</amp-img>
</mt:BlockEditorBlockAsset>
<mt:Else ->
<mt:Var name="__value__" -/>
</mt:If>
</mt:BlockEditorBlocks>
--- expected eval
qq{<p>test</p>
<amp-img alt="@{[$main::image->label]}"
  src="@{[$main::image->url]}"
  width="@{[$main::image->image_width]}"
  height="@{[$main::image->image_height]}"
  layout="responsive">
</amp-img>}
--- content eval
qq{<!-- mt-beb t="core-text"--><p>test</p><!-- /mt-beb --><!-- mt-beb t="mt-image" m="{&quot;assetId&quot;:@{[$main::image->id]},&quot;assetUrl&quot;:&quot;https://blog-taaas-jp.movabletype.io/.assets/form-with-multipart.png&quot;,&quot;alignment&quot;:&quot;none&quot;,&quot;width&quot;:&quot;640&quot;}"--><p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p><!-- /mt-beb -->}

=== mt:BlockEditorBlockAsset for mt-file
--- template
<mt:BlockEditorBlocks name="content">
<mt:If name="type" eq="mt-file">
<mt:BlockEditorBlockAsset>
<a href="<mt:AssetUrl />"><mt:AssetLabel /></a>
</mt:BlockEditorBlockAsset>
<mt:Else>
<mt:Var name="__value__" />
</mt:If>
</mt:BlockEditorBlocks>
--- expected eval
qq{<a href="@{[$main::pdf->url]}">@{[$main::pdf->label]}</a>}
--- content eval
qq{<!-- mt-beb t="mt-file" m="{&quot;assetId&quot;:&quot;@{[$main::pdf->id]}&quot;}"--><div><a href="https://mt-net.taaas.jp/.assets/%E4%BC%BC%E9%A1%94%E7%B5%B5%E3%83%86%E3%82%99%E3%83%BC%E3%82%BF01-2.png">この写真を見る</a></div><!-- /mt-beb -->}

=== meta for mt-image
--- template
<mt:BlockEditorBlocks name="content">
<mt:If name="type" eq="mt-image" ->
alt: <mt:Var name="meta{alt}" />
caption: <mt:Var name="meta{caption}" />
width: <mt:Var name="meta{width}" />
<mt:Else ->
<mt:Var name="__value__" -/>
</mt:If>
</mt:BlockEditorBlocks>
--- expected
<p>test</p>
alt: alt-text
caption: 
width: 640
--- content eval
qq{<!-- mt-beb t="core-text"--><p>test</p><!-- /mt-beb --><!-- mt-beb t="mt-image" m="{&quot;assetId&quot;:@{[$main::image->id]},&quot;alignment&quot;:&quot;none&quot;,&quot;width&quot;:&quot;640&quot;}"--><p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="alt-text" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p><!-- /mt-beb -->}

=== meta for mt-image with caption
--- template
<mt:BlockEditorBlocks name="content">
<mt:If name="type" eq="mt-image" ->
alt: <mt:Var name="meta{alt}" />
caption: <mt:Var name="meta{caption}" />
width: <mt:Var name="meta{width}" />
<mt:Else ->
<mt:Var name="__value__" -/>
</mt:If>
</mt:BlockEditorBlocks>
--- expected
<p>test</p>
alt: alt-text
caption: caption text
width: 640
--- content eval
qq{<!-- mt-beb t="core-text"--><p>test</p><!-- /mt-beb --><!-- mt-beb t="mt-image" m="{&quot;assetId&quot;:@{[$main::image->id]},&quot;alignment&quot;:&quot;none&quot;,&quot;width&quot;:&quot;640&quot;}"--><figure><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="alt-text" width="640" height="467" style="max-width:100%;height:auto;display:block"/><figcaption>caption text</figcaption></figure><!-- /mt-beb -->}

=== meta for mt-file
--- template
<mt:BlockEditorBlocks name="content">
<mt:If name="type" eq="mt-file" ->
text: <mt:Var name="meta{text}" />
<mt:Else ->
<mt:Var name="__value__" -/>
</mt:If>
</mt:BlockEditorBlocks>
--- expected
<p>test</p>
text: file.pdfをダウンロード
--- content eval
qq{<!-- mt-beb t="core-text"--><p>test</p><!-- /mt-beb --><!-- mt-beb t="mt-file" m='{"assetId":"@{[$main::pdf->id]}"}' --><div><a href="https://blog-taaas-jp.movabletype.io/.assets/form-with-multipart.png">file.pdfをダウンロード</a></div><!-- /mt-beb -->}

=== compiled custom block
--- template
<mt:BlockEditorBlocks name="content">
<mt:If name="type" eq="custom-carousel" ->
<mt:BlockEditorBlocks ->
alt: <mt:Var name="meta{alt}" />
caption: <mt:Var name="meta{caption}" />
</mt:BlockEditorBlocks>
<mt:Var name="__value__" -/>
<mt:Else ->
<mt:Var name="__value__" -/>
</mt:If>
</mt:BlockEditorBlocks>
--- expected
alt: alt text 1
caption: caption 1
alt: alt text 2
caption: caption 2


<div class="swiper-container">
<div class="swiper-wrapper">
<div class="swiper-slide">
<figure><img src="https://tamano-20200407.movabletype.io.vagrant.local/.assets/thumbnail/2020-04-26-IMG_4767-640wri.jpg" alt="alt text 1" width="640" height="427" />
<figcaption>caption 1</figcaption>
</figure>
</div>
<div class="swiper-slide">
<figure><img src="https://tamano-20200407.movabletype.io.vagrant.local/.assets/thumbnail/2020-04-26-IMG_4771-640wri.jpg" alt="alt text 2" width="640" height="427" />
<figcaption>caption 2</figcaption>
</figure>
</div>
</div>
<div class="swiper-pagination">&nbsp;</div>
<div class="swiper-button-prev">&nbsp;</div>
<div class="swiper-button-next">&nbsp;</div>
<div class="swiper-scrollbar">&nbsp;</div>
</div>
--- content
<!-- mt-beb t="custom-carousel" h='&lt;!-- mt-beb t="mt-image" m=&#x27;{"assetId":10708,"alignment":"none","width":"640"}&#x27; --&gt;&lt;figure style="display:inline-block"&gt;&lt;img src="https://tamano-20200407.movabletype.io.vagrant.local/.assets/thumbnail/2020-04-26-IMG_4767-640wri.jpg" alt="alt text 1" width="640" height="427" style="max-width:100%;height:auto"/&gt;&lt;figcaption&gt;caption 1&lt;/figcaption&gt;&lt;/figure&gt;&lt;!-- /mt-beb --&gt;&lt;!-- mt-beb t="mt-image" m=&#x27;{"assetId":10709,"alignment":"none","width":"640"}&#x27; --&gt;&lt;figure style="display:inline-block"&gt;&lt;img src="https://tamano-20200407.movabletype.io.vagrant.local/.assets/thumbnail/2020-04-26-IMG_4771-640wri.jpg" alt="alt text 2" width="640" height="427" style="max-width:100%;height:auto"/&gt;&lt;figcaption&gt;caption 2&lt;/figcaption&gt;&lt;/figure&gt;&lt;!-- /mt-beb --&gt;' -->
<div class="swiper-container">
<div class="swiper-wrapper">
<div class="swiper-slide">
<figure><img src="https://tamano-20200407.movabletype.io.vagrant.local/.assets/thumbnail/2020-04-26-IMG_4767-640wri.jpg" alt="alt text 1" width="640" height="427" />
<figcaption>caption 1</figcaption>
</figure>
</div>
<div class="swiper-slide">
<figure><img src="https://tamano-20200407.movabletype.io.vagrant.local/.assets/thumbnail/2020-04-26-IMG_4771-640wri.jpg" alt="alt text 2" width="640" height="427" />
<figcaption>caption 2</figcaption>
</figure>
</div>
</div>
<div class="swiper-pagination">&nbsp;</div>
<div class="swiper-button-prev">&nbsp;</div>
<div class="swiper-button-next">&nbsp;</div>
<div class="swiper-scrollbar">&nbsp;</div>
</div>
<!-- /mt-beb -->

=== html
--- template
<mt:BlockEditorBlocks name="content">
<mt:If name="type" eq="core-html" ->
<mt:Var name="__value__" -/>
</mt:If>
</mt:BlockEditorBlocks>
--- expected
<p>plain html text</p>
--- content
<p>plain html text</p>
