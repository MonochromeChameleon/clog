clog
======

Consistent changelog edit utility

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/clog.svg)](https://npmjs.org/package/@monochromechameleon/clog)
[![Downloads/week](https://img.shields.io/npm/dw/clog.svg)](https://npmjs.org/package/@monochromechameleon/clog)
[![License](https://img.shields.io/npm/l/clog.svg)](https://github.com/MonochromeChameleon/clog/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @monochromechameleon/clog
$ clog COMMAND
running command...
$ clog (-v|--version|version)
@monochromechameleon/clog/0.0.0 darwin-x64 node-v16.8.0
$ clog --help [COMMAND]
USAGE
  $ clog COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`clog `](#clog-)
* [`clog add`](#clog-add)
* [`clog change`](#clog-change)
* [`clog help [COMMAND]`](#clog-help-command)
* [`clog init`](#clog-init)
* [`clog reformat`](#clog-reformat)
* [`clog release SEMVER`](#clog-release-semver)
* [`clog remove`](#clog-remove)

## `clog `

Note unreleased changes in your changelog file

```
USAGE
  $ clog

OPTIONS
  --directory=directory  [default: cwd] The directory in which to look for the
                         changelog file

  --file=file            [default: CHANGELOG.md] The name of the changelog file

  --url=url              The project homepage

  --[no-]write           Whether or not to overwrite the changelog file
```

_See code: [src/commands/index.js](https://github.com/MonochromeChameleon/clog/blob/v0.0.0/src/commands/index.js)_

## `clog add`

Note unreleased additions in your changelog file

```
USAGE
  $ clog add

OPTIONS
  --directory=directory  [default: cwd] The directory in which to look for the
                         changelog file

  --file=file            [default: CHANGELOG.md] The name of the changelog file

  --url=url              The project homepage

  --[no-]write           Whether or not to overwrite the changelog file
```

_See code: [src/commands/add.js](https://github.com/MonochromeChameleon/clog/blob/v0.0.0/src/commands/add.js)_

## `clog change`

Note unreleased changes in your changelog file

```
USAGE
  $ clog change

OPTIONS
  --directory=directory  [default: cwd] The directory in which to look for the
                         changelog file

  --file=file            [default: CHANGELOG.md] The name of the changelog file

  --url=url              The project homepage

  --[no-]write           Whether or not to overwrite the changelog file
```

_See code: [src/commands/change.js](https://github.com/MonochromeChameleon/clog/blob/v0.0.0/src/commands/change.js)_

## `clog help [COMMAND]`

display help for clog

```
USAGE
  $ clog help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `clog init`

Create a new changelog file

```
USAGE
  $ clog init

OPTIONS
  --directory=directory  [default: cwd] The directory in which to look for the
                         changelog file

  --file=file            [default: CHANGELOG.md] The name of the changelog file

  --url=url              The project homepage

  --[no-]write           Whether or not to overwrite the changelog file
```

_See code: [src/commands/init.js](https://github.com/MonochromeChameleon/clog/blob/v0.0.0/src/commands/init.js)_

## `clog reformat`

Reformat the changelog

```
USAGE
  $ clog reformat

OPTIONS
  --directory=directory  [default: cwd] The directory in which to look for the
                         changelog file

  --file=file            [default: CHANGELOG.md] The name of the changelog file

  --url=url              The project homepage

  --[no-]write           Whether or not to overwrite the changelog file
```

_See code: [src/commands/reformat.js](https://github.com/MonochromeChameleon/clog/blob/v0.0.0/src/commands/reformat.js)_

## `clog release SEMVER`

Update the changelog file to include all unreleased changes in a new release

```
USAGE
  $ clog release SEMVER

ARGUMENTS
  SEMVER  (major|minor|patch) the semver level to increment the release by

OPTIONS
  --directory=directory  [default: cwd] The directory in which to look for the
                         changelog file

  --file=file            [default: CHANGELOG.md] The name of the changelog file

  --url=url              The project homepage

  --[no-]write           Whether or not to overwrite the changelog file
```

_See code: [src/commands/release.js](https://github.com/MonochromeChameleon/clog/blob/v0.0.0/src/commands/release.js)_

## `clog remove`

Note unreleased removals in your changelog file

```
USAGE
  $ clog remove

OPTIONS
  --directory=directory  [default: cwd] The directory in which to look for the
                         changelog file

  --file=file            [default: CHANGELOG.md] The name of the changelog file

  --url=url              The project homepage

  --[no-]write           Whether or not to overwrite the changelog file
```

_See code: [src/commands/remove.js](https://github.com/MonochromeChameleon/clog/blob/v0.0.0/src/commands/remove.js)_
<!-- commandsstop -->
