# Movable Type (r) (C) Six Apart Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.

package MT::Plugin::MTBlockEditor::BackupRestore;

use strict;
use warnings;
use utf8;

use JSON;
use MT::Serialize;
use MT::BlockEditor::Parser;

sub restore {
    my ($cb, $all_objects, $deferred, $errors, $callback) = @_;

    my (@entries, @content_data, %content_types, %assets);
    for my $key (keys %$all_objects) {
        if ($key =~ /^MT::Entry#/) {
            push @entries, $all_objects->{$key};
        } elsif ($key =~ /^MT::ContentData#/) {
            push @content_data, $all_objects->{$key};
        } elsif ($key =~ /^MT::Asset#(\d+)$/) {
            $assets{$1} = $all_objects->{$key}->id;
        } elsif ($key =~ /^MT::ContentType#/) {
            my $content_type = $all_objects->{$key};
            $content_types{ $content_type->id } = $content_type;
        }
    }

    my $parser  = MT::BlockEditor::Parser->new(json => JSON->new);
    my $replace = sub {
        my ($text) = @_;
        my $replace_count = 0;
        $text = $parser->replace({
            content      => $text,
            meta_handler => sub {
                my $meta = shift;

                if (my $new_asset_id = $meta->{assetId} && $assets{ $meta->{assetId} }) {
                    $meta->{assetId} = $new_asset_id;
                    $replace_count++;
                }

                $meta;
            },
        });
        return ($text, $replace_count);
    };
    my $log_counter           = 0;
    my $increment_log_counter = sub {
        $callback->(
            MT->translate("Importing MTBlockEditor asset associations ... ( [_1] )", ++$log_counter),
            'be-restore-asset-associations'
        );
    };

    for my $entry (@entries) {
        next unless $entry->convert_breaks eq 'block_editor';

        my $replace_count = 0;
        for my $col (qw( text text_more )) {
            my ($text, $count) = $replace->($entry->$col);
            next unless $count;
            $replace_count += $count;
            $entry->$col($text);
        }

        next unless $replace_count;

        $increment_log_counter->();
        $entry->update();
    }

    for my $content_data (@content_data) {
        my $content_type = $content_types{ $content_data->content_type_id };

        if (my $raw_convert_breaks = $content_data->convert_breaks) {
            if (my $convert_breaks = MT::Serialize->unserialize($raw_convert_breaks)) {
                if (   $convert_breaks
                    && $$convert_breaks
                    && ref $$convert_breaks eq 'HASH')
                {
                    my $data          = $content_data->data;
                    my $cb            = $$convert_breaks;
                    my $replace_count = 0;
                    for my $id (keys %$cb) {
                        next unless $cb->{$id} eq 'block_editor';
                        my ($text, $count) = $replace->($data->{$id});
                        next unless $count;
                        $replace_count += $count;
                        $data->{$id} = $text;
                    }
                    if ($replace_count) {
                        $increment_log_counter->();
                        $content_data->data($data);
                        $content_data->save or die $content_data->errstr;
                    }
                }
            }
        }
    }

    1;
}

1;
