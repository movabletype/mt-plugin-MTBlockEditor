<?php

require_once('block.mtasset.php');

function smarty_block_mtblockeditorblockasset($args, $content, &$ctx, &$repeat)
{
    if (!$content) {
        $block = $ctx->stash('block_editor_block');
        if (!$block || !in_array($block['type'], ['mt-image', 'mt-file']) || !$block['meta']['assetId']) {
            return '';
        }
        return smarty_block_mtasset(['id' => $block['meta']['assetId']], $content, $ctx, $repeat);
    }

    return $content;
}
