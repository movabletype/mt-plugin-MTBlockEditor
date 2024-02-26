<?php

function smarty_block_mtblockeditorblocks($args, $content, &$ctx, &$repeat)
{
    $localvars = [
        ['block_editor_blocks', 'block_editor_blocks_counter', 'block_editor_block'],
        ['type', 'meta', ...common_loop_vars()]
    ];

    if (!isset($content)) {
        $ctx->localize($localvars);

        $load_blocks_from_stash = false;
        $name = isset($args['name'])
            ? $args['name'] : (isset($args['var']) ? $args['var'] : null);
        if (isset($name)) {
            unset($ctx->__stash['__cond_tag__']);

            # pick off any {...} or [...] from the name.
            if (preg_match('/^(.+)([\[\{])(.+)[\]\}]$/', $name, $matches)) {
                $name = $matches[1];
                $br = $matches[2];
                $ref = $matches[3];
                if (preg_match('/^\\\\\$(.+)/', $ref, $ref_matches)) {
                    $ref = $vars[$ref_matches[1]];
                    if (!isset($ref))
                        $ref = chr(0);
                }
                $br == '[' ? $index = $ref : $key = $ref;
            } else {
                if (array_key_exists('index', $args))
                    $index = $args['index'];
                else if (array_key_exists('key', $args))
                    $key = $args['key'];
            }
            if (preg_match('/^$/', $name)) {
                $name = $vars[$name];
                if (!isset($name))
                    return $ctx->error($ctx->mt->translate(
                        "You used an [_1] tag without a valid name attribute.",
                        "<MT$tag>"
                    ));
            }
            if (isset($name)) {
                $value = isset($ctx->__stash['vars'][$name]) ? $ctx->__stash['vars'][$name] : null;
                require_once("MTUtil.php");
                if (is_hash($value)) {
                    if (isset($key)) {
                        if ($key != chr(0)) {
                            $val = isset($value[$key]) ? $value[$key] : null;
                        } else {
                            unset($value);
                        }
                    } else {
                        $val = $value;
                    }
                } elseif (is_array($value)) {
                    if (isset($index)) {
                        if (is_numeric($index)) {
                            $val = isset($value[$index]) ? $value[$index] : null;
                        } else {
                            unset($value); # fall through to any 'default'
                        }
                    } else {
                        $val = $value;
                    }
                } else {
                    $val = $value;
                }
            }
        } elseif (isset($args['tag'])) {
            $tag = $args['tag'];
            $tag = preg_replace('/^mt:?/i', '', $tag);
            $largs = $args; // local arguments without 'tag' element
            unset($largs['tag']);

            // Disable error handler temporarily
            // for disabling trigger_error function.
            set_error_handler('_dummy_error_handler');

            try {
                $val = $ctx->tag($tag, $largs);
            } catch (exception $e) {
                $val = '';
            }

            restore_error_handler();
        } else {
            $load_blocks_from_stash = true;
        }

        $blocks = [];
        if (!$load_blocks_from_stash) {
            if (!empty($value) && !is_array($value) && preg_match('/^smarty_fun_[a-f0-9]+$/', $value)) {
                if (function_exists($val)) {
                    ob_start();
                    $val($ctx, array());
                    $val = ob_get_contents();
                    ob_end_clean();
                } else {
                    $val = '';
                }
            }

            if ($val) {
                $parser = new MT\Plugin\MTBlockEditor\Parser();
                $blocks = $parser->parse(['content' => $val]);
            }
        } else if ($ctx->stash('block_editor_block')) {
            $blocks = $ctx->stash('block_editor_block')['blocks'];
        }

        $ctx->__stash['block_editor_blocks'] = $blocks;
        $counter = 0;
    } else {
        $counter = $ctx->stash('block_editor_blocks_counter');
    }

    $blocks = $ctx->stash('block_editor_blocks');
    if (empty($blocks)) {
        $ret = $ctx->_hdlr_if($args, $content, $ctx, $repeat, 0);
        if (!$repeat)
            $ctx->restore($localvars);
        return $ret;
    }

    if ($counter < count($blocks)) {
        $block = $blocks[$counter];
        if (!empty($block)) {
            $value = $block['content'] ? join('', $block['content']) : '';

            $count = $counter + 1;
            $ctx->__stash['vars']['__counter__'] = $count;
            $ctx->__stash['vars']['__odd__'] = ($count % 2) == 1;
            $ctx->__stash['vars']['__even__'] = ($count % 2) == 0;
            $ctx->__stash['vars']['__first__'] = $count == 1;
            $ctx->__stash['vars']['__last__'] = ($count == count($blocks));
            $ctx->__stash['vars']['__value__'] = $value;

            $ctx->__stash['vars']['type'] = $block['type'];

            $br_to_newline = fn ($str) => preg_replace('/<br\s*\/?>/i', "\n", $str);
            if ($block['type'] == 'mt-image' && !isset($block['meta']['alt'])) {
                preg_match('/alt=(["\'])(.*?)\1/i', $value, $matches);
                $block['meta']['alt'] = isset($matches[2]) ? $matches[2] : "";
                preg_match('/<figcaption>(.*?)<\/figcaption>/i', $value, $matches);
                $block['meta']['caption'] = isset($matches[1]) ? $br_to_newline($matches[1]) : "";
            } elseif ($block['type'] == 'mt-file' && !isset($block['meta']['text'])) {
                preg_match('/<a[^>]*>(.*?)<\/a>/i', $value, $matches);
                $block['meta']['text'] = isset($matches[1]) ? $br_to_newline($matches[1]) : "";
            }
            $ctx->__stash['vars']['meta'] = $block['meta'];

            $ctx->stash('block_editor_block', $block);
            $ctx->stash('block_editor_blocks_counter', $count);
            $repeat = true;
        }
    } else {
        $ctx->restore($localvars);
        $repeat = false;
    }

    return $content;
}
