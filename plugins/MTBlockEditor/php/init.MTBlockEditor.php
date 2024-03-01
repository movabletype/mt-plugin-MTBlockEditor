<?php

namespace MT\Plugin\MTBlockEditor;

class SAXHandler
{
    private array $meta;
    private array $top_blocks = [];
    private array $cur_blocks = [];

    public function __construct(array $param)
    {
        $this->meta = $param['meta'];
    }

    public function start_document(): void
    {
        $this->top_blocks = [];
        $this->cur_blocks = [];
    }

    public function start_element($parser, string $name, array $attrs): void
    {
        if (!preg_match('/mt-beb$/i', $name)) {
            return;
        }

        $type = $attrs["T"] ?? "core-text";
        $meta = $this->decode_meta($attrs["M"] ?? "");

        if ($type == 'core-context') {
            foreach ($meta as $key => $value) {
                $this->meta[$key] = $value;
            }

            array_push($this->cur_blocks, null);
            return;
        }

        $block = [
            'type' => $type,
            'meta' => $meta,
            'html' => $attrs["H"] ?? null,
            'blocks' => [],
            'content' => ['']
        ];
        array_push($this->cur_blocks, $block);
    }

    public function characters($parser, string $data): void
    {
        if (empty($this->cur_blocks)) {
            return;
        }

        $lastBlockIndex = count($this->cur_blocks) - 1;
        $lastContentIndex = count($this->cur_blocks[$lastBlockIndex]['content']) - 1;
        $this->cur_blocks[$lastBlockIndex]['content'][$lastContentIndex] .= $data;
    }

    public function end_element($parser, string $name): void
    {
        if (!preg_match('/mt-beb$/i', $name)) {
            return;
        }

        $block = array_pop($this->cur_blocks);

        if (!$block) {
            return;
        }

        if ($block['content'][count($block['content']) - 1] == '') {
            array_pop($block['content']);
        }

        if (empty($this->cur_blocks)) {
            array_push($this->top_blocks, $block);
        } else {
            $lastBlockIndex = count($this->cur_blocks) - 1;
            $lastContentIndex = count($this->cur_blocks[$lastBlockIndex]['content']) - 1;

            if ($this->cur_blocks[$lastBlockIndex]['content'][$lastContentIndex] == '') {
                array_pop($this->cur_blocks[$lastBlockIndex]['content']);
            }

            array_push($this->cur_blocks[$lastBlockIndex]['content'], ...$block['content']);
            array_push($this->cur_blocks[$lastBlockIndex]['content'], '');
            array_push($this->cur_blocks[$lastBlockIndex]['blocks'], $block);
        }
    }

    public function blocks(): array
    {
        return $this->top_blocks;
    }

    private function decode_meta(string $meta_string): array
    {
        preg_match_all('/(\w+)(?:,|$)|(.+)/s', $meta_string, $matches, PREG_SET_ORDER);
        $metas = array_map(fn ($value) => !preg_match('/^{/', $value)  ? $this->meta[$value] ?? [] : json_decode($value, true), array_map(fn ($m) => $m[2] ?? $m[1], $matches));

        $result = [];
        foreach ($metas as $meta) {
            foreach ($meta as $key => $value) {
                $result[$key] = $value;
            }
        }

        return $result;
    }
}

class Parser
{
    private string $NO_FALLBACK = "";

    private array $entity_map = [
        "&" => "&amp;",
        "<" => "&lt;",
        ">" => "&gt;"
    ];

    private function _preprocess_content(string $content): string
    {
        $map_reverse = array_flip($this->entity_map);
        $map_reverse_key = array_keys($map_reverse);

        $content = str_replace(array_keys($this->entity_map), $this->entity_map, $content);
        $content = preg_replace_callback('/&lt;!--\\s+(\\/?mt-beb.*?)--&gt;/', fn ($matches) => "<" . preg_replace_callback(
            '/(' . join('|', $map_reverse_key) . ')/',
            fn ($m) => $map_reverse[$m[1]],
            $matches[1]
        ) . ">", $content);
        return $content;
    }

    private function _parse_recursive(array &$blocks, array $meta): void
    {
        foreach ($blocks as &$b) {
            if (isset($b['html'])) {
                $html = $b['html'];
                unset($b['html']);
                $b['blocks'] = $this->parse([
                    'content' => $html,
                    'fallback_type' => $this->NO_FALLBACK,
                    'meta' => $meta
                ]);
            }
            $this->_parse_recursive($b['blocks'], $meta);
        }
    }

    public function parse(array $args): array
    {
        $fallback_type = $args['fallback_type'] ?? "core-html";
        $content = $args['content'];
        $meta = $args['meta'] ?? [];

        if ($fallback_type && !preg_match('/\A\s*<!--\s+mt-beb/s', $content)) {
            return [
                [
                    'type' => $fallback_type,
                    'meta' => [],
                    'blocks' => [],
                    'content' => [$content]
                ]
            ];
        }

        $content = $this->_preprocess_content($content);

        $handler = new SAXHandler(['meta' => $meta]);
        $parser = xml_parser_create();
        xml_set_object($parser, $handler);
        xml_set_element_handler($parser, [$handler, 'start_element'], [$handler, 'end_element']);
        xml_set_character_data_handler($parser, [$handler, 'characters']);
        xml_parse($parser, "<xml>$content</xml>");

        $blocks = $handler->blocks();
        $this->_parse_recursive($blocks, $meta);

        return $blocks;
    }
}
