use strict;
use warnings;
use utf8;

use JSON::XS;
use FindBin;
use Test::More;

use lib qw(lib extlib), "$FindBin::Bin/../lib";

use_ok 'MT::BlockEditor::Parser';

my $parser = MT::BlockEditor::Parser->new( json => JSON::XS->new );

subtest 'parse()' => sub {
    subtest 'columns' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb --><p>test</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-block-editor-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>left</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>right</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb -->
DATA
        is_deeply $blocks, [
            {
                'blocks'  => [],
                'content' => ['<p>test</p>'],
                'type'    => 'core-text',
                'meta'    => {}
            },
            {
                'blocks' => [
                    {
                        'blocks' => [
                            {
                                'blocks'  => [],
                                'content' => ['<p>left</p>'],
                                'type'    => 'core-text',
                                'meta'    => {}
                            }
                        ],
                        'content' => [
                            '<div class="mt-block-editor-column">',
                            '<p>left</p>',
                            '</div>',
                        ],
                        'type' => 'core-column',
                        'meta' => {}
                    },
                    {
                        'blocks' => [
                            {
                                'blocks'  => [],
                                'content' => ['<p>right</p>'],
                                'type'    => 'core-text',
                                'meta'    => {}
                            }
                        ],
                        'content' => [
                            '<div class="mt-block-editor-column">',
                            '<p>right</p>',
                            '</div>',
                        ],
                        'type' => 'core-column',
                        'meta' => {}
                    }
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
                'meta' => {}
            }
        ];
    };

    subtest 'mt-image' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb --><p>test</p><!-- /mt-beb --><!-- mt-beb t="mt-image" m="{&quot;assetId&quot;:1,&quot;assetUrl&quot;:&quot;https://blog-taaas-jp.movabletype.io/.assets/form-with-multipart.png&quot;,&quot;alignment&quot;:&quot;none&quot;,&quot;width&quot;:&quot;640&quot;}"--><p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p><!-- /mt-beb -->
DATA
        is_deeply $blocks, [
            {
                'blocks'  => [],
                'content' => ['<p>test</p>'],
                'type'    => 'core-text',
                'meta'    => {}
            },
            {
                'blocks' => [],
                'content' => ['<p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p>'],
                'type' => 'mt-image',
                'meta' => {
                    'width'     => '640',
                    'assetUrl'  => 'https://blog-taaas-jp.movabletype.io/.assets/form-with-multipart.png',
                    'alignment' => 'none',
                    'assetId'   => 1
                }
            }
        ];
    };

    subtest 'meta : simple' => sub {
        my $blocks = $parser->parse(<<DATA);
<!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"}}' --><!-- /mt-beb --><!-- mt-beb m="001" -->test1<!-- /mt-beb --><!-- mt-beb m="001" -->test2<!-- /mt-beb -->
DATA
        is_deeply $blocks, [
            {
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
        is_deeply $blocks, [
            {
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
        is_deeply $blocks, [
            {
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
        is_deeply $blocks, [
            {
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
        is_deeply $blocks, [
            {
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
        is_deeply $blocks, [
            {
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
};

done_testing;
