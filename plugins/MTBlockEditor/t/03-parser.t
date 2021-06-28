use strict;
use warnings;
use utf8;

use JSON::XS;
use FindBin;
use Test::More;

use lib qw(lib extlib), "$FindBin::Bin/../lib";

use_ok 'MT::BlockEditor::Parser';

my $parser = MT::BlockEditor::Parser->new(json => JSON::XS->new);

subtest 'parse()' => sub {
    subtest 'columns' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb --><p>test</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-block-editor-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>left</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>right</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb -->
DATA
        is_deeply $blocks, [{
                'blocks'  => [],
                'content' => ['<p>test</p>'],
                'type'    => 'core-text',
                'meta'    => {}
            },
            {
                'blocks' => [{
                        'blocks' => [{
                            'blocks'  => [],
                            'content' => ['<p>left</p>'],
                            'type'    => 'core-text',
                            'meta'    => {}
                        }],
                        'content' => [
                            '<div class="mt-block-editor-column">',
                            '<p>left</p>',
                            '</div>',
                        ],
                        'type' => 'core-column',
                        'meta' => {}
                    },
                    {
                        'blocks' => [{
                            'blocks'  => [],
                            'content' => ['<p>right</p>'],
                            'type'    => 'core-text',
                            'meta'    => {}
                        }],
                        'content' => [
                            '<div class="mt-block-editor-column">',
                            '<p>right</p>',
                            '</div>',
                        ],
                        'type' => 'core-column',
                        'meta' => {} }
                ],
                'content' => [
                    '<div class="mt-block-editor-columns" style="display: flex">',
                    '<div class="mt-block-editor-column">',
                    '<p>left</p>',
                    '</div>',
                    '<div class="mt-block-editor-column">',
                    '<p>right</p>',
                    '</div>',
                    '</div>',
                ],
                'type' => 'core-columns',
                'meta' => {} }];
    };

    subtest 'mt-image' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb --><p>test</p><!-- /mt-beb --><!-- mt-beb t="mt-image" m="{&quot;assetId&quot;:1,&quot;assetUrl&quot;:&quot;https://blog-taaas-jp.movabletype.io/.assets/form-with-multipart.png&quot;,&quot;alignment&quot;:&quot;none&quot;,&quot;width&quot;:&quot;640&quot;}"--><p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p><!-- /mt-beb -->
DATA
        is_deeply $blocks, [{
                'blocks'  => [],
                'content' => ['<p>test</p>'],
                'type'    => 'core-text',
                'meta'    => {}
            },
            {
                'blocks'  => [],
                'content' => ['<p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p>'],
                'type'    => 'mt-image',
                'meta'    => {
                    'width'     => '640',
                    'assetUrl'  => 'https://blog-taaas-jp.movabletype.io/.assets/form-with-multipart.png',
                    'alignment' => 'none',
                    'assetId'   => 1
                } }];
    };

    subtest 'meta : simple' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"}}' --><!-- /mt-beb --><!-- mt-beb m="001" -->test1<!-- /mt-beb --><!-- mt-beb m="001" -->test2<!-- /mt-beb -->
DATA
        is_deeply $blocks, [{
                'blocks'  => [],
                'content' => ['test1'],
                'type'    => 'core-text',
                'meta'    => {
                    label => 'Test Label',
                }
            },
            {
                'blocks'  => [],
                'content' => ['test2'],
                'type'    => 'core-text',
                'meta'    => {
                    label => 'Test Label',
                }
            },
        ];
    };

    subtest 'meta : broken - 1' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"}}' --><!-- /mt-beb --><!-- mt-beb m="002" -->test<!-- /mt-beb -->
DATA
        is_deeply $blocks, [{
                'blocks'  => [],
                'content' => ['test'],
                'type'    => 'core-text',
                'meta'    => {}
            },
        ];
    };

    subtest 'meta : broken - 2' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb m='002,{"label":"Test Label"}' -->test<!-- /mt-beb -->
DATA
        is_deeply $blocks, [{
                'blocks'  => [],
                'content' => ['test'],
                'type'    => 'core-text',
                'meta'    => {
                    label => 'Test Label',
                }
            },
        ];
    };

    subtest 'meta : blank' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"}}' --><!-- /mt-beb --><!-- mt-beb m="" -->test<!-- /mt-beb -->`
DATA
        is_deeply $blocks, [{
                'blocks'  => [],
                'content' => ['test'],
                'type'    => 'core-text',
                'meta'    => {}
            },
        ];
    };

    subtest 'meta : multiple' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"},"002":{"helpText":"Test Help"}}' --><!-- /mt-beb --><!-- mt-beb m="001,002" -->test<!-- /mt-beb -->
DATA
        is_deeply $blocks, [{
                'blocks'  => [],
                'content' => ['test'],
                'type'    => 'core-text',
                'meta'    => {
                    label    => 'Test Label',
                    helpText => 'Test Help',
                }
            },
        ];
    };

    subtest 'meta : multiple with object' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"},"002":{"helpText":"Test Help"}}' --><!-- /mt-beb --><!-- mt-beb m='001,002,{"className":"Test Class"}' -->test<!-- /mt-beb -->
DATA
        is_deeply $blocks, [{
                'blocks'  => [],
                'content' => ['test'],
                'type'    => 'core-text',
                'meta'    => {
                    label     => 'Test Label',
                    helpText  => 'Test Help',
                    className => 'Test Class',
                }
            },
        ];
    };

    subtest 'multibyte charactors' => sub {
        my $data = q{
        <!-- mt-beb t="core-context" m='{"1":{"assetId":"","alignment":"","useThumbnail":false},"2":{"label":"ラベル1"},"3":{"label":"ラベル2"},"4":{"label":"oEmbed 1"},"5":{"url":""},"6":{"url":"https://twitter.com/JAXA_Kiboriyo/status/1406846182022782980","width":500,"maxwidth":"500","maxheight":"500","providerName":"Twitter"}}' --><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-be-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test1</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test2</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-be-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test3</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test4</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="custom-o" --><div><!-- mt-beb t="mt-image" m='1' --><p><img src="" alt="" width="" height="" class="asset asset-image" style="max-width:100%;height:auto;display:block"/></p><!-- /mt-beb --><!-- mt-beb t="custom-test1" --><!-- mt-beb m='2' --><p>テキスト1</p><!-- /mt-beb --><!-- mt-beb m='3' --><p>テキスト2</p><!-- /mt-beb --><!-- mt-beb t="sixapart-oembed" m='4,5' --><!-- /mt-beb --><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="custom-test1" --><!-- mt-beb m='2' --><p>テキスト3</p><!-- /mt-beb --><!-- mt-beb m='3' --><p>テキスト2</p><!-- /mt-beb --><!-- mt-beb t="sixapart-oembed" m='4,6' h='' --><blockquote class="twitter-tweet"><p lang="ja" dir="ltr">💎✨星出飛行士により「きぼう」での高品質タンパク質結晶生成実験(MTPCG#6F)開始！<a href="https://twitter.com/hashtag/JaxaPCG?src=hash&amp;ref_src=twsrc%5Etfw">#JaxaPCG</a><br><br>本技術実証実験では試料を凍結して打上げ軌道上で溶かして結晶化を開始します。不安定な創薬標的タンパク質の結晶化が可能となれば、もっと創薬需要に応えられるかも (๑•̀ㅂ•)و✧<a href="https://t.co/ljLN0K4DKY">https://t.co/ljLN0K4DKY</a></p>&mdash; JAXAきぼう利用ネットワーク (@JAXA_Kiboriyo) <a href="https://twitter.com/JAXA_Kiboriyo/status/1406846182022782980?ref_src=twsrc%5Etfw">June 21, 2021</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script><!-- /mt-beb --><!-- /mt-beb -->};
        my $blocks = $parser->parse($data);

        is_deeply $blocks, [{
                'content' => [
                    '<div class="mt-be-columns" style="display: flex">',
                    '<div class=\'mt-be-column\'>',
                    '<p>test1</p>',
                    '</div>',
                    '<div class=\'mt-be-column\'>',
                    '<p>test2</p>',
                    '<div class="mt-be-columns" style="display: flex">',
                    '<div class=\'mt-be-column\'>',
                    '<p>test3</p>',
                    '</div>',
                    '<div class=\'mt-be-column\'>',
                    '<p>test4</p>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>'
                ],
                'meta'   => {},
                'type'   => 'core-columns',
                'blocks' => [{
                        'blocks' => [{
                            'type'    => 'core-text',
                            'content' => ['<p>test1</p>'],
                            'meta'    => {},
                            'blocks'  => []
                        }],
                        'content' => [
                            '<div class=\'mt-be-column\'>',
                            '<p>test1</p>',
                            '</div>'
                        ],
                        'type' => 'core-column',
                        'meta' => {}
                    },
                    {
                        'meta'    => {},
                        'content' => [
                            '<div class=\'mt-be-column\'>',
                            '<p>test2</p>',
                            '<div class="mt-be-columns" style="display: flex">',
                            '<div class=\'mt-be-column\'>',
                            '<p>test3</p>',
                            '</div>',
                            '<div class=\'mt-be-column\'>',
                            '<p>test4</p>',
                            '</div>',
                            '</div>',
                            '</div>'
                        ],
                        'type'   => 'core-column',
                        'blocks' => [{
                                'blocks'  => [],
                                'type'    => 'core-text',
                                'content' => ['<p>test2</p>'],
                                'meta'    => {}
                            },
                            {
                                'meta'    => {},
                                'content' => [
                                    '<div class="mt-be-columns" style="display: flex">',
                                    '<div class=\'mt-be-column\'>',
                                    '<p>test3</p>',
                                    '</div>',
                                    '<div class=\'mt-be-column\'>',
                                    '<p>test4</p>',
                                    '</div>',
                                    '</div>'
                                ],
                                'type'   => 'core-columns',
                                'blocks' => [{
                                        'blocks' => [{
                                            'type'    => 'core-text',
                                            'content' => ['<p>test3</p>'],
                                            'meta'    => {},
                                            'blocks'  => []
                                        }],
                                        'content' => [
                                            '<div class=\'mt-be-column\'>',
                                            '<p>test3</p>',
                                            '</div>'
                                        ],
                                        'meta' => {},
                                        'type' => 'core-column'
                                    },
                                    {
                                        'meta'    => {},
                                        'content' => [
                                            '<div class=\'mt-be-column\'>',
                                            '<p>test4</p>',
                                            '</div>'
                                        ],
                                        'type'   => 'core-column',
                                        'blocks' => [{
                                            'blocks'  => [],
                                            'type'    => 'core-text',
                                            'content' => ['<p>test4</p>'],
                                            'meta'    => {}
                                        }] }] }] }]
            },
            {
                'type'    => 'custom-o',
                'content' => [
                    '<div>',
                    '<p><img src="" alt="" width="" height="" class="asset asset-image" style="max-width:100%;height:auto;display:block"/></p>',
                    "<p>テキスト1</p>",
                    "<p>テキスト2</p>",
                    '</div>'
                ],
                'meta'   => {},
                'blocks' => [{
                        'type'    => 'mt-image',
                        'content' => ['<p><img src="" alt="" width="" height="" class="asset asset-image" style="max-width:100%;height:auto;display:block"/></p>'],
                        'meta'    => {
                            'alignment'    => '',
                            'assetId'      => '',
                            'useThumbnail' => bless(do { \(my $o = 0) }, 'JSON::PP::Boolean')
                        },
                        'blocks' => []
                    },
                    {
                        'content' => [
                            "<p>テキスト1</p>",
                            "<p>テキスト2</p>"
                        ],
                        'type'   => 'custom-test1',
                        'meta'   => {},
                        'blocks' => [{
                                'content' => ["<p>テキスト1</p>"],
                                'meta'    => { 'label' => "ラベル1" },
                                'type'    => 'core-text',
                                'blocks'  => []
                            },
                            {
                                'content' => ["<p>テキスト2</p>"],
                                'type'    => 'core-text',
                                'meta'    => { 'label' => "ラベル2" },
                                'blocks'  => []
                            },
                            {
                                'blocks'  => [],
                                'content' => [],
                                'type'    => 'sixapart-oembed',
                                'meta'    => {
                                    'url'   => '',
                                    'label' => 'oEmbed 1'
                                } }] }]
            },
            {
                'blocks' => [{
                        'content' => ["<p>テキスト3</p>"],
                        'meta'    => { 'label' => "ラベル1" },
                        'type'    => 'core-text',
                        'blocks'  => []
                    },
                    {
                        'content' => ["<p>テキスト2</p>"],
                        'meta'    => { 'label' => "ラベル2" },
                        'type'    => 'core-text',
                        'blocks'  => []
                    },
                    {
                        'blocks' => [],
                        'meta'   => {
                            'providerName' => 'Twitter',
                            'width'        => 500,
                            'maxheight'    => '500',
                            'maxwidth'     => '500',
                            'label'        => 'oEmbed 1',
                            'url'          => 'https://twitter.com/JAXA_Kiboriyo/status/1406846182022782980'
                        },
                        'content' => ["<blockquote class=\"twitter-tweet\"><p lang=\"ja\" dir=\"ltr\">💎✨星出飛行士により「きぼう」での高品質タンパク質結晶生成実験(MTPCG#6F)開始！<a href=\"https://twitter.com/hashtag/JaxaPCG?src=hash&amp;ref_src=twsrc%5Etfw\">#JaxaPCG</a><br><br>本技術実証実験では試料を凍結して打上げ軌道上で溶かして結晶化を開始します。不安定な創薬標的タンパク質の結晶化が可能となれば、もっと創薬需要に応えられるかも (๑•̀ㅂ•)و✧<a href=\"https://t.co/ljLN0K4DKY\">https://t.co/ljLN0K4DKY</a></p>&mdash; JAXAきぼう利用ネットワーク (\@JAXA_Kiboriyo) <a href=\"https://twitter.com/JAXA_Kiboriyo/status/1406846182022782980?ref_src=twsrc%5Etfw\">June 21, 2021</a></blockquote><script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>"],
                        'type'    => 'sixapart-oembed'
                    }
                ],
                'content' => [
                    "<p>テキスト3</p>",
                    "<p>テキスト2</p>",
                    "<blockquote class=\"twitter-tweet\"><p lang=\"ja\" dir=\"ltr\">💎✨星出飛行士により「きぼう」での高品質タンパク質結晶生成実験(MTPCG#6F)開始！<a href=\"https://twitter.com/hashtag/JaxaPCG?src=hash&amp;ref_src=twsrc%5Etfw\">#JaxaPCG</a><br><br>本技術実証実験では試料を凍結して打上げ軌道上で溶かして結晶化を開始します。不安定な創薬標的タンパク質の結晶化が可能となれば、もっと創薬需要に応えられるかも (๑•̀ㅂ•)و✧<a href=\"https://t.co/ljLN0K4DKY\">https://t.co/ljLN0K4DKY</a></p>&mdash; JAXAきぼう利用ネットワーク (\@JAXA_Kiboriyo) <a href=\"https://twitter.com/JAXA_Kiboriyo/status/1406846182022782980?ref_src=twsrc%5Etfw\">June 21, 2021</a></blockquote><script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>"
                ],
                'type' => 'custom-test1',
                'meta' => {} }];
    };
};

done_testing;
