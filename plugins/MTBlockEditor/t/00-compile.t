use strict;
use warnings;

use FindBin;
use Test::More;

use lib qw(lib extlib), "$FindBin::Bin/../lib";

use_ok 'MT::Plugin::MTBlockEditor';
use_ok 'MT::Plugin::MTBlockEditor::L10N';
use_ok 'MT::Plugin::MTBlockEditor::L10N::ja';
use_ok 'MT::Plugin::MTBlockEditor::L10N::en_us';
use_ok 'MT::Plugin::MTBlockEditor::App::CMS';
use_ok 'MT::Plugin::MTBlockEditor::App::Block';
use_ok 'MT::Plugin::MTBlockEditor::App::Config';
use_ok 'MT::Plugin::MTBlockEditor::App::Oembed';
use_ok 'MT::Plugin::MTBlockEditor::Config';
use_ok 'MT::Plugin::MTBlockEditor::Block';
use_ok 'MT::Plugin::MTBlockEditor::Tag';
use_ok 'MT::BlockEditor::Parser';
use_ok 'MT::BlockEditor::Parser::SAXHandler';

done_testing;
