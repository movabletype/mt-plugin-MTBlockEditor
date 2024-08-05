# Movable Type (r) (C) 2006-2019 Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.
#
# $Id$

package MT::Plugin::MTBlockEditor::L10N::ja;

use strict;
use warnings;
use utf8;

use base 'MT::Plugin::MTBlockEditor::L10N::en_us';
use vars qw( %Lexicon );

my $block_editor_plugin = eval { MT->component('BlockEditor') };

%Lexicon = (
    'Movable Type Block Editor.'         => 'MTブロックエディタ',
    'Movable Type Block Editor'          => 'MTブロックエディタ',
    'Movable Type Block Editor Settings' => 'MTブロックエディタの設定',

    "BLOCK_LABEL_CORE_TEXT"           => "テキストブロック",
    "BLOCK_LABEL_CORE_TABLE"          => "テーブル",
    "BLOCK_LABEL_CORE_HORIZONTALRULE" => "罫線",
    "BLOCK_LABEL_CORE_HTML"           => "HTML",
    "BLOCK_LABEL_CORE_COLUMNS"        => "マルチカラム",
    "BLOCK_LABEL_MT_IMAGE"            => "画像",
    "BLOCK_LABEL_MT_FILE"             => "ファイル",
    "BLOCK_LABEL_SIXAPART_OEMBED"     => "oEmbed",
    "BLOCK_LABEL_SIXAPART_INPUT"      => "テキスト",
    "BLOCK_LABEL_SIXAPART_TEXTAREA"   => "テキスト(複数行)",
    "BLOCK_LABEL_SIXAPART_SELECT"     => "ドロップダウン",

    'Preset For Movable Type Block Editor' => 'MTブロックエディタのプリセット',

    'Block Display Settings'                                        => 'ブロックの表示設定',
    'Panel'                                                         => 'パネル',
    'Shortcut'                                                      => 'ショートカット',
    "You can change the display / non-display and order of blocks." => "利用するブロックの表示・非表示、並び順を変更することができます。",
    "Custom Block"                                                  => "カスタムブロック",
    "Custom Blocks"                                                 => "カスタムブロック",
    "Create Custom Block"                                           => "カスタムブロックの作成",
    "Edit Custom Block"                                             => "カスタムブロックの編集",

    "Custom Block Preset"        => "プリセット",
    "Custom Block Presets"       => "プリセット",
    "Create Custom Block Preset" => "プリセットの作成",
    "Edit Custom Block Preset"   => "プリセットの編集",

    "Manage Custom Block"                                     => 'カスタムブロック',
    "Manage Custom Block Preset"                              => 'プリセット',
    "Import Custom Block"                                     => 'カスタムブロックの読み込み',
    "Import"                                                  => '読み込む',
    "Export"                                                  => '書き出す',
    'Icon'                                                    => 'アイコン',
    'Block'                                                   => "ブロック",
    "Custom Script"                                           => "カスタムスクリプト",
    "You can customize the display using JavaScript and CSS." => "JavaScriptやCSSを使って表示をカスタマイズすることができます。",
    "Can add and remove block"                                => "ブロックの追加と削除",
    "Enabled to add and remove block."                        => "ブロックの追加と削除を許可する",
    "Wrap in root element"                                    => "コンテナ要素で包む",
    "Class Name"                                              => "クラス名",
    "Wrap edited content in root DIV element."                => "編集した内容をDIV要素で囲む",
    "You can set a class name for the root element."          => "コンテナ要素にクラス名を指定することができます。",
    "Addable blocks"                                          => "追加可能なブロック",

    "If you change the identifier, you will not be able to edit the block contained in the saved data as the same block." => "識別子を変更すると保存済みのデータに含まれるブロックを同じブロックとして編集することができなくなります。",
    "* You can import custom block from your JSON file."                                                                  => "※ JSON形式のファイルからカスタムブロックを読み込むことができます。",

    'Are you sure you want to delete the selected Custom Block?'        => '選択したブロックを削除してもよろしいですか？',
    'Are you sure you want to delete the selected Custom Block Preset?' => '選択したプリセットを削除してもよろしいですか？',

    'Preview settings'                                                                     => 'プレビューの表示',
    'Show preview'                                                                         => 'プレビューを表示する',
    'You can keep the editing status even when not in focus by unchecking this check box.' => 'チェックを外すと、ブロックからフォーカスが外れてもプレビュー表示に切り替わらずに編集可能な表示のままになります。',

    'The identifier is required.'                               => '識別子は必須です',
    'An identifier "[_1]" is already used in the site scope.'   => '"[_1]"という識別子はサイトですでに使われています。',
    'An identifier "[_1]" is already used in the global scope.' => '"[_1]"という識別子はグローバルなブロックですでに使われています。',

    'MT Block Editor Setting' => 'MTブロックエディタの設定',
    'Preset For Entry'        => '記事編集時に利用するプリセット',
    'Preset For Page'         => 'ウェブページ編集時に利用するプリセット',

    'Custom Block (Block Editor)'            => 'カスタムブロック（ブロックエディタ）',
    'Custom Block Preset (Block Editor)'     => 'プリセット（ブロックエディタ）',
    'Custom Block Preference (Block Editor)' => '設定（ブロックエディタ）',

    'Failed to make directory for export: [_1]' => 'エクスポート用のディレクトリの作成に失敗しました: [_1]',
    'Failed to export data: [_1]'               => 'エクスポートデータの書き出しに失敗しました: [_1]',

    # Oembed.pm
    'Unsupported URL.'                        => 'サポートされていないURLです。',
    'Can not get oEmbed data from [_1]: [_2]' => '[_1]からoEmbedのデータを取得できませんでした: [_2]',

    # mt-static/plugins/MTBlockEditor/src
    'MTImage'                                                                         => '画像',
    'MTFile'                                                                          => 'ファイル',
    'Please select an image'                                                          => '画像を選択してください。',
    'Please select an file'                                                           => 'ファイルを選択してください。',
    'Alternative Text'                                                                => '代替テキスト',
    'Caption'                                                                         => 'キャプション',
    'Width'                                                                           => '幅',
    'Link URL'                                                                        => 'リンク先URL',
    'Text to display'                                                                 => 'リンク元テキスト',
    'You can upload image files of size [_1] or less.'                                => '[_1]以下のサイズの画像ファイルをアップロードできます。',
    'Failed to read the file.'                                                        => 'ファイルの読み込みに失敗しました。',
    'Invalid file format.'                                                            => 'ファイルのフォーマットが不正です。',
    'Are you sure you want to overwrite it?'                                          => '上書きしてもよろしいですか？',
    'This format does not support this web browser. Please switch to another format.' => '現在ご利用のウェブブラウザではこのフォーマットを利用することができません。編集する場合には別のフォーマットを選択してください。',

	'Importing MTBlockEditor asset associations ... ( [_1] )' => 'ブロックエディタのデータとアセットの関連付けを復元しています...( [_1] )',

    # validation
    'This field must be filled in with letters, numbers, or underscores.' => 'このフィールドにはアルファベット、数字、もしくはアンダースコアで入力してください。',

    (
        $block_editor_plugin
        ? ()
        : (
            'Movable Type Block Editor'            => 'ブロックエディタ',
            'Movable Type Block Editor Settings'   => 'ブロックエディタの設定',
            'Preset For Movable Type Block Editor' => 'ブロックエディタのプリセット',
            'MT Block Editor Setting'              => 'ブロックエディタの設定',
        )
    ),
);

1;
