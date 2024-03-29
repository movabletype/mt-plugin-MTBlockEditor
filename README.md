# Movable Type Block Editor

[![CircleCI](https://circleci.com/gh/movabletype/mt-plugin-MTBlockEditor.svg?style=svg)](https://circleci.com/gh/movabletype/mt-plugin-MTBlockEditor)

This is a plugin for the Movable Type.
This plugin enables you to use [Movable Type Block Editor](https://movabletype.github.io/mt-block-editor/).

![Screenshot](https://raw.githubusercontent.com/movabletype/mt-plugin-MTBlockEditor/main/artwork/screenshot.jpg)

## Installation

1. Download an archive file from [releases](https://github.com/movabletype/mt-plugin-MTBlockEditor/releases).
1. Unpack an archive file.
1. Upload unpacked files to your MT directory.

Should look like this when installed:

    $MT_HOME/
        plugins/
            MTBlockEditor/
        mt-static/
            plugins/
                MTBlockEditor/

## Requirements

* Movable Type 7
    * r.4609 or later

## Supported browsers

* Desktop
    * Google Chrome
    * Firefox
    * Safari
    * Microsoft Edge

* Mobile
    * Google Chrome (iOS/iPadOS, Android)
    * Safari (iOS/iPadOS)

## Development

### Build distribution files

```
$ perl Makefile.PL
$ make build
```

## LICENSE

Copyright (c) Six Apart Ltd. All Rights Reserved.
