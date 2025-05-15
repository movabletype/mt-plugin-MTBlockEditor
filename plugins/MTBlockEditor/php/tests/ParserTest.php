<?php

use PHPUnit\Framework\TestCase;

include_once(__DIR__ . "/../init.MTBlockEditor.php");

class ParserTest extends TestCase
{
    private $parser;

    public function setUp(): void
    {
        $this->parser = new MT\Plugin\MTBlockEditor\Parser();
    }
    /**
     * @dataProvider parseTestDataProvider
     */
    public function testParse($data, $expected)
    {
        $blocks = $this->parser->parse(array('content' => $data));
        $this->assertEquals($expected, $blocks);
    }

    public static function parseTestDataProvider()
    {
        return [
            'columns' => [
                <<<'DATA'
                <!-- mt-beb --><p>test</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-block-editor-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>left</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text"--><p>right</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'core-text',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [],
                        'content' => ['<p>test</p>'],
                    ],
                    [
                        'type' => 'core-columns',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [
                            [
                                'type' => 'core-column',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [
                                    [
                                        'type' => 'core-text',
                                        'meta' => [],
                                        'html' => null,
                                        'blocks' => [],
                                        'content' => ['<p>left</p>'],
                                    ],
                                ],
                                'content' => ['<div class="mt-block-editor-column">', '<p>left</p>', '</div>'],
                            ],
                            [
                                'type' => 'core-column',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [
                                    [
                                        'type' => 'core-text',
                                        'meta' => [],
                                        'html' => null,
                                        'blocks' => [],
                                        'content' => ['<p>right</p>'],
                                    ],
                                ],
                                'content' => ['<div class="mt-block-editor-column">', '<p>right</p>', '</div>'],
                            ],
                        ],
                        'content' => ['<div class="mt-block-editor-columns" style="display: flex">', '<div class="mt-block-editor-column">', '<p>left</p>', '</div>', '<div class="mt-block-editor-column">', '<p>right</p>', '</div>', '</div>'],
                    ],
                ]
            ],
            'mt-image' => [
                <<<'DATA'
                <!-- mt-beb --><p>test</p><!-- /mt-beb --><!-- mt-beb t="mt-image" m="{&quot;assetId&quot;:1,&quot;assetUrl&quot;:&quot;https://blog-taaas-jp.movabletype.io/.assets/form-with-multipart.png&quot;,&quot;alignment&quot;:&quot;none&quot;,&quot;width&quot;:&quot;640&quot;}"--><p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p><!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'core-text',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [],
                        'content' => ['<p>test</p>'],
                    ],
                    [
                        'type' => 'mt-image',
                        'meta' => [
                            'assetId' => 1,
                            'assetUrl' => 'https://blog-taaas-jp.movabletype.io/.assets/form-with-multipart.png',
                            'alignment' => 'none',
                            'width' => '640',
                        ],
                        'html' => null,
                        'blocks' => [],
                        'content' => ['<p><img src="https://blog-taaas-jp.movabletype.io/.assets/thumbnail/form-with-multipart-640wri.png" alt="" width="640" height="467" style="max-width:100%;height:auto;display:block"/></p>'],
                    ],
                ]
            ],
            'meta : simple' => [
                <<<'DATA'
                <!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"}}' --><!-- /mt-beb --><!-- mt-beb m="001" -->test1<!-- /mt-beb --><!-- mt-beb m="001" -->test2<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'core-text',
                        'meta' => ['label' => 'Test Label'],
                        'html' => null,
                        'blocks' => [],
                        'content' => ['test1'],
                    ],
                    [
                        'type' => 'core-text',
                        'meta' => ['label' => 'Test Label'],
                        'html' => null,
                        'blocks' => [],
                        'content' => ['test2'],
                    ],
                ]
            ],
            'meta : broken - 1' => [
                <<<'DATA'
                <!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"}}' --><!-- /mt-beb --><!-- mt-beb m="002" -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'core-text',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [],
                        'content' => ['test'],
                    ],
                ]
            ],
            'meta : broken - 2' => [
                <<<'DATA'
                <!-- mt-beb m='002,{"label":"Test Label"}' -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'core-text',
                        'meta' => [
                            'label' => 'Test Label',
                        ],
                        'html' => null,
                        'blocks' => [],
                        'content' => ['test'],
                    ],
                ]
            ],
            'meta : blank' => [
                <<<'DATA'
                <!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"}}' --><!-- /mt-beb --><!-- mt-beb m="" -->test<!-- /mt-beb -->`
                DATA, [
                    [
                        'type' => 'core-text',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [],
                        'content' => ['test'],
                    ],
                ]
            ],
            'meta : multiple' => [
                <<<'DATA'
                <!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"},"002":{"helpText":"Test Help"}}' --><!-- /mt-beb --><!-- mt-beb m="001,002" -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'core-text',
                        'meta' => [
                            'label' => 'Test Label',
                            'helpText' => 'Test Help',
                        ],
                        'html' => null,
                        'blocks' => [],
                        'content' => ['test'],
                    ],
                ]
            ],
            'meta : multiple with object' => [
                <<<'DATA'
                <!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"},"002":{"helpText":"Test Help"}}' --><!-- /mt-beb --><!-- mt-beb m='001,002,{"className":"Test Class"}' -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'core-text',
                        'meta' => [
                            'label' => 'Test Label',
                            'helpText' => 'Test Help',
                            'className' => 'Test Class',
                        ],
                        'html' => null,
                        'blocks' => [],
                        'content' => ['test'],
                    ],
                ]
            ],
            'custom block - without wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" --><!-- mt-beb --><p>paragraph1</p><!-- /mt-beb --><!-- mt-beb --><p>paragraph2</p><!-- /mt-beb --><!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph1</p>'],
                            ],
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph2</p>'],
                            ],
                        ],
                        'content' => ['<p>paragraph1</p>', '<p>paragraph2</p>'],
                    ],
                ]
            ],
            'custom block - with wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" --><div><!-- mt-beb --><p>paragraph1</p><!-- /mt-beb --><!-- mt-beb --><p>paragraph2</p><!-- /mt-beb --></div><!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph1</p>'],
                            ],
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph2</p>'],
                            ],
                        ],
                        'content' => [
                            '<div>',
                            '<p>paragraph1</p>',
                            '<p>paragraph2</p>',
                            '</div>',
                        ],
                    ],
                ]
            ],
            'custom block - with custom-element wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" --><custom-element><!-- mt-beb --><p>paragraph1</p><!-- /mt-beb --><!-- mt-beb --><p>paragraph2</p><!-- /mt-beb --></custom-element><!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph1</p>'],
                            ],
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph2</p>'],
                            ],
                        ],
                        'content' => [
                            '<custom-element>',
                            '<p>paragraph1</p>',
                            '<p>paragraph2</p>',
                            '</custom-element>',
                        ],
                    ],
                ]
            ],
            'custom block - with class name' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" --><div class="class1 class2"><!-- mt-beb --><p>paragraph1</p><!-- /mt-beb --><!-- mt-beb --><p>paragraph2</p><!-- /mt-beb --></div><!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph1</p>'],
                            ],
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph2</p>'],
                            ],
                        ],
                        'content' => [
                            '<div class="class1 class2">',
                            '<p>paragraph1</p>',
                            '<p>paragraph2</p>',
                            '</div>',
                        ],
                    ],
                ]
            ],
            'blank - without wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" --><!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [],
                        'content' => [],
                    ],
                ]
            ],
            'blank - with wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" --><div></div><!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [],
                        'content' => [
                            '<div></div>'
                        ],
                    ],
                ]
            ],
            'blank - with class name' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" --><div class="class1 class2"></div><!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'html' => null,
                        'blocks' => [],
                        'content' => [
                            '<div class="class1 class2"></div>'
                        ],
                    ],
                ]
            ],
            'compiled - without wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" h='&lt;!-- mt-beb --&gt;&lt;p&gt;paragraph1&lt;/p&gt;&lt;!-- /mt-beb --&gt;&lt;!-- mt-beb --&gt;&lt;p&gt;paragraph2&lt;/p&gt;&lt;!-- /mt-beb --&gt;' -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'blocks' => [
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph1</p>'],
                            ],
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph2</p>'],
                            ],
                        ],
                        'content' => ['test'],
                    ],
                ]
            ],
            'compiled - with wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" h='&lt;div&gt;&lt;!-- mt-beb --&gt;&lt;p&gt;paragraph1&lt;/p&gt;&lt;!-- /mt-beb --&gt;&lt;!-- mt-beb --&gt;&lt;p&gt;paragraph2&lt;/p&gt;&lt;!-- /mt-beb --&gt;&lt;/div&gt;' -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'blocks' => [
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph1</p>'],
                            ],
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph2</p>'],
                            ],
                        ],
                        'content' => ['test'],
                    ],
                ]
            ],
            'compiled - with custom element wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" h='&lt;custom-element&gt;&lt;!-- mt-beb --&gt;&lt;p&gt;paragraph1&lt;/p&gt;&lt;!-- /mt-beb --&gt;&lt;!-- mt-beb --&gt;&lt;p&gt;paragraph2&lt;/p&gt;&lt;!-- /mt-beb --&gt;&lt;/custom-element&gt;' -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'blocks' => [
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph1</p>'],
                            ],
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph2</p>'],
                            ],
                        ],
                        'content' => ['test'],
                    ],
                ]
            ],
            'compiled - with class name' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" h='&lt;div class=&#x27;a&amp;gt;b&#x27;&gt;&lt;!-- mt-beb --&gt;&lt;p&gt;paragraph1&lt;/p&gt;&lt;!-- /mt-beb --&gt;&lt;!-- mt-beb --&gt;&lt;p&gt;paragraph2&lt;/p&gt;&lt;!-- /mt-beb --&gt;&lt;/div&gt;' -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'blocks' => [
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph1</p>'],
                            ],
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph2</p>'],
                            ],
                        ],
                        'content' => ['test'],
                    ],
                ]
            ],
            'compiled - with class name - with wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" h='&lt;div&gt;&lt;!-- mt-beb --&gt;&lt;p&gt;paragraph1&lt;/p&gt;&lt;!-- /mt-beb --&gt;&lt;!-- mt-beb --&gt;&lt;p&gt;paragraph2&lt;/p&gt;&lt;!-- /mt-beb --&gt;&lt;/div&gt;' -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'blocks' => [
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph1</p>'],
                            ],
                            [
                                'type' => 'core-text',
                                'meta' => [],
                                'html' => null,
                                'blocks' => [],
                                'content' => ['<p>paragraph2</p>'],
                            ],
                        ],
                        'content' => ['test'],
                    ],
                ]
            ],
            'compiled - blank - without wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" h='' -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'blocks' => [],
                        'content' => ['test'],
                    ],
                ]
            ],
            'compiled - blank - with wrapper' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" h='&lt;div&gt;&lt;/div&gt;' -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'blocks' => [],
                        'content' => ['test'],
                    ],
                ]
            ],
            'compiled - blank - with class name' => [
                <<<'DATA'
                <!-- mt-beb t="custom-test" h='&lt;div class=&#x27;a&amp;gt;b&#x27;&gt;&lt;/div&gt;' -->test<!-- /mt-beb -->
                DATA, [
                    [
                        'type' => 'custom-test',
                        'meta' => [],
                        'blocks' => [],
                        'content' => ['test'],
                    ],
                ]
            ],
        ];
    }
}
