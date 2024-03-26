use strict;
use warnings;
use utf8;

use JSON::XS;
use FindBin;
use Test::More;
use MT::Test::Env;

use lib qw(lib extlib), "$FindBin::Bin/../lib";

BEGIN {
    my $test_env = MT::Test::Env->new;
    $ENV{MT_CONFIG} = $test_env->config_file;
}

use_ok 'MT::BlockEditor::Parser';

my $parser = MT::BlockEditor::Parser->new(json => JSON::XS->new->canonical);

subtest 'replace()' => sub {
    subtest 'meta_handler' => sub {
        subtest 'stored in core-context' => sub {
            my $replaced = $parser->replace({
                content => <<'DATA',
<!-- mt-beb t="core-context" m='{"1":{"alignment":"","assetId":1,"useThumbnail":false},"2":{"label":"ラベル1"},"3":{"label":"ラベル2"},"4":{"label":"oEmbed 1"},"5":{"url":""},"6":{"maxheight":"500","maxwidth":"500","providerName":"Twitter","url":"https://twitter.com/JAXA_Kiboriyo/status/1406846182022782980","width":500}}' --><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-be-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test1</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test2</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-be-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test3</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test4</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="custom-o" --><div><!-- mt-beb t="mt-image" m='1' --><p><img src="" alt="" width="" height="" class="asset asset-image" style="max-width:100%;height:auto;display:block"/></p><!-- /mt-beb --><!-- mt-beb t="custom-test1" --><!-- mt-beb m='2' --><p>テキスト1</p><!-- /mt-beb --><!-- mt-beb m='3' --><p>テキスト2</p><!-- /mt-beb --><!-- mt-beb t="sixapart-oembed" m='4,5' --><!-- /mt-beb --><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="custom-test1" --><!-- mt-beb m='2' --><p>テキスト3</p><!-- /mt-beb --><!-- mt-beb m='3' --><p>テキスト2</p><!-- /mt-beb --><!-- mt-beb t="sixapart-oembed" m='4,6' h='' --><blockquote class="twitter-tweet"><p lang="ja" dir="ltr">💎✨星出飛行士により「きぼう」での高品質タンパク質結晶生成実験(MTPCG#6F)開始！<a href="https://twitter.com/hashtag/JaxaPCG?src=hash&amp;ref_src=twsrc%5Etfw">#JaxaPCG</a><br><br>本技術実証実験では試料を凍結して打上げ軌道上で溶かして結晶化を開始します。不安定な創薬標的タンパク質の結晶化が可能となれば、もっと創薬需要に応えられるかも (๑•̀ㅂ•)و✧<a href="https://t.co/ljLN0K4DKY">https://t.co/ljLN0K4DKY</a></p>&mdash; JAXAきぼう利用ネットワーク (@JAXA_Kiboriyo) <a href="https://twitter.com/JAXA_Kiboriyo/status/1406846182022782980?ref_src=twsrc%5Etfw">June 21, 2021</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script><!-- /mt-beb --><!-- /mt-beb -->};
DATA
                meta_handler => sub {
                    my ($meta) = @_;
                    $meta->{assetId} = 2 if exists $meta->{assetId};
                    return $meta;
                },
            });
            is $replaced, <<'DATA';
<!-- mt-beb t="core-context" m='{"1":{"alignment":"","assetId":2,"useThumbnail":false},"2":{"label":"ラベル1"},"3":{"label":"ラベル2"},"4":{"label":"oEmbed 1"},"5":{"url":""},"6":{"maxheight":"500","maxwidth":"500","providerName":"Twitter","url":"https://twitter.com/JAXA_Kiboriyo/status/1406846182022782980","width":500}}' --><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-be-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test1</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test2</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-be-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test3</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class='mt-be-column'><!-- mt-beb --><p>test4</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="custom-o" --><div><!-- mt-beb t="mt-image" m='1' --><p><img src="" alt="" width="" height="" class="asset asset-image" style="max-width:100%;height:auto;display:block"/></p><!-- /mt-beb --><!-- mt-beb t="custom-test1" --><!-- mt-beb m='2' --><p>テキスト1</p><!-- /mt-beb --><!-- mt-beb m='3' --><p>テキスト2</p><!-- /mt-beb --><!-- mt-beb t="sixapart-oembed" m='4,5' --><!-- /mt-beb --><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="custom-test1" --><!-- mt-beb m='2' --><p>テキスト3</p><!-- /mt-beb --><!-- mt-beb m='3' --><p>テキスト2</p><!-- /mt-beb --><!-- mt-beb t="sixapart-oembed" m='4,6' h='' --><blockquote class="twitter-tweet"><p lang="ja" dir="ltr">💎✨星出飛行士により「きぼう」での高品質タンパク質結晶生成実験(MTPCG#6F)開始！<a href="https://twitter.com/hashtag/JaxaPCG?src=hash&amp;ref_src=twsrc%5Etfw">#JaxaPCG</a><br><br>本技術実証実験では試料を凍結して打上げ軌道上で溶かして結晶化を開始します。不安定な創薬標的タンパク質の結晶化が可能となれば、もっと創薬需要に応えられるかも (๑•̀ㅂ•)و✧<a href="https://t.co/ljLN0K4DKY">https://t.co/ljLN0K4DKY</a></p>&mdash; JAXAきぼう利用ネットワーク (@JAXA_Kiboriyo) <a href="https://twitter.com/JAXA_Kiboriyo/status/1406846182022782980?ref_src=twsrc%5Etfw">June 21, 2021</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script><!-- /mt-beb --><!-- /mt-beb -->};
DATA
        };

        subtest 'stored in each block' => sub {
            my $replaced = $parser->replace({
                content => <<'DATA',
<!-- mt-beb t="core-context" m='{"001":{"label":"Test Label"},"002":{"helpText":"Test Help"}}' --><!-- /mt-beb --><!-- mt-beb m='001,002,{"className":"Test Class"}' -->test<!-- /mt-beb -->
DATA
                meta_handler => sub {
                    my ($meta) = @_;
                    $meta->{label} = 'Replaced Label' if exists $meta->{label};
                    $meta->{className} = 'Replaced Class' if exists $meta->{className};
                    return $meta;
                },
            });
            is $replaced, <<'DATA';
<!-- mt-beb t="core-context" m='{"001":{"label":"Replaced Label"},"002":{"helpText":"Test Help"}}' --><!-- /mt-beb --><!-- mt-beb m='001,002,{"className":"Replaced Class"}' -->test<!-- /mt-beb -->
DATA
        };
    };

    subtest 'text_handler' => sub {
        subtest 'columns' => sub {
            my $replaced = $parser->replace({
                content => <<DATA,
<!-- mt-beb --><p>test</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-block-editor-columns" style="display: flex"><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text" --><p>left</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text" --><p>right</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb -->
DATA
                text_handler => sub {
                    my ($text) = @_;
                    $text =~ s/columns/multi-column/g;
                    $text;
                },
            });
            is $replaced, <<DATA;
<!-- mt-beb --><p>test</p><!-- /mt-beb --><!-- mt-beb t="core-columns" --><div class="mt-block-editor-multi-column" style="display: flex"><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text" --><p>left</p><!-- /mt-beb --></div><!-- /mt-beb --><!-- mt-beb t="core-column" --><div class="mt-block-editor-column"><!-- mt-beb t="core-text" --><p>right</p><!-- /mt-beb --></div><!-- /mt-beb --></div><!-- /mt-beb -->
DATA
        };
    };
};

done_testing;
