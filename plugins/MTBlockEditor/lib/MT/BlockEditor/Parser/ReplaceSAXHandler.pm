package MT::BlockEditor::Parser::ReplaceSAXHandler;

use strict;
use warnings;
use utf8;

use parent qw(XML::SAX::Base);

our @RESERVED_KEYS    = qw(t m h);
our %RESERVED_KEY_MAP = map { $_ => 1 } @RESERVED_KEYS;

sub new {
    my $class = shift;
    my $self  = bless {}, $class;
    my $param = ref $_[0] ? $_[0] : +{@_};
    $self->{__json}          = $param->{json};
    $self->{__meta_handler} = $param->{meta_handler};
    $self->{__text_handler} = $param->{text_handler};
    return $self;
}

sub start_document {
    my $self = shift;
    $self->{__replaced} = '';
}

sub start_element {
    my $self = shift;
    my $data = shift;

    return if $data->{Name} eq 'xml';

    $self->{__replaced} .= '<!-- ' . $data->{Name} . ' ';
    my %attrs =
        map { $data->{Attributes}{$_}{Name} => $data->{Attributes}{$_}{Value} }
        keys %{ $data->{Attributes} };
    my $type = $attrs{"t"} || "core-text";
    my @keys = grep { exists $attrs{$_} } @RESERVED_KEYS, sort grep { !$RESERVED_KEY_MAP{$_} } keys %attrs;
    for my $name (@keys) {
        my $q     = $name eq 'm' || $name eq 'h' ? "'" : '"';
        my $value = $attrs{$name};
        if ($name eq 'm') {
            my @errors;
            my @values = map {
                if (!$_ || $_ =~ m/^[^{]/) {
                    $_;
                } elsif (my $data = eval { $self->{__json}->decode($_) }) {
                    if ($type eq 'core-context') {
                        for my $key (keys %$data) {
                            $data->{$key} = $self->{__meta_handler}->($data->{$key});
                        }
                    } else {
                        $data = $self->{__meta_handler}->($data);
                    }
                    $self->{__json}->encode($data);
                } else {
                    push @errors, $@;
                    $_;
                }
            } grep { defined $_ } $value =~ m/(\w+)(?:,|\z)|(.+)/gs;

            if (@errors) {
                # TODO: handler errors
            }
            else {
                $value = join(',', @values);
            }
        }
        $self->{__replaced} .= qq{$name=$q$value$q };
    }
    $self->{__replaced} .= "-->";
}

sub characters {
    my $self   = shift;
    my ($data) = @_;
    my $text   = $data->{Data};

    $self->{__replaced} .= $self->{__text_handler}->($data->{Data});
}

sub end_element {
    my $self = shift;
    my ($data) = @_;

    return if $data->{Name} eq 'xml';

    $self->{__replaced} .= '<!-- /' . $data->{Name} . ' -->';
}

sub replaced_string {
    my $self = shift;
    $self->{__replaced};
}

1;
