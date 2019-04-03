<img src="https://raw.githubusercontent.com/ehmicky/design/master/portable-node-guide/portable-node-guide.png" width="550"/>

[![License](https://img.shields.io/badge/license-CC%20BY--SA%204.0-4cc61e.svg?logo=github)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Gitter](https://img.shields.io/gitter/room/ehmicky/cross-platform-node-guide.svg?logo=gitter)](https://gitter.im/ehmicky/cross-platform-node-guide)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

How to write cross-platform Node.js code.

**Why you should care**: according to the
[2018 Node.js](https://nodejs.org/en/user-survey-report/#Primary-OS-Distro)
[user survey](https://nodejs.org/en/user-survey-report/2018-nodejs-user-survey-raw-data.xlsx),
24% of Node.js developers use Windows locally and 41% use Mac. In production
85% use Linux and 1% use BSD.

# Table of contents

[Summary](docs/summary.md)

## [Development environment](docs/development_environment/README.md)

- [Node setup](docs/development_environment/node_setup.md)
- [Core utilities](docs/development_environment/core_utilities.md)
- [Testing](docs/development_environment/testing.md)
- [C/C++ addons](docs/development_environment/cpp_addons.md)

## [File encoding](docs/file_encoding/README.md)

- [Character encoding](docs/file_encoding/character_encoding.md)
- [Newlines](docs/file_encoding/newlines.md)
- [EOF and BOM](docs/file_encoding/eof_bom.md)

## [Filesystem](docs/filesystem/README.md)

- [Directory locations](docs/filesystem/directory_locations.md)
- [File paths](docs/filesystem/file_paths.md)
- [Filenames](docs/filesystem/filenames.md)
- [Symlinks](docs/filesystem/symlinks.md)
- [File metadata](docs/filesystem/file_metadata.md)

## [Terminal](docs/terminal/README.md)

- [Shell](docs/terminal/shell.md)
- [File execution](docs/terminal/file_execution.md)
- [Package binaries](docs/terminal/package_binaries.md)
- [Environment variables](docs/terminal/environment_variables.md)

## [Security](docs/security/README.md)

- [Permissions](docs/security/permissions.md)
- [Users](docs/security/users.md)

## [Networking / IPC](docs/networking_ipc/README.md)

- [Networking](docs/networking_ipc/networking.md)
- [Processes](docs/networking_ipc/processes.md)
- [Signals](docs/networking_ipc/signals.md)
- [Errors](docs/networking_ipc/errors.md)

## [System](docs/system/README.md)

- [OS identification](docs/system/os_identification.md)
- [System configuration](docs/system/system_configuration.md)
- [Device information](docs/system/device_information.md)
- [Time](docs/system/time.md)

# See also

- https://github.com/bcoe/awesome-cross-platform-nodejs
- https://github.com/Microsoft/nodejs-guidelines
- https://shapeshed.com/writing-cross-platform-node/

# Support

If you found an error or would like to add more information, _don't hesitate_ to
[submit an issue on GitHub](../../issues).

For other questions, feel free to
[chat with us on Gitter](https://gitter.im/ehmicky/cross-platform-node-guide).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix an error or add more information, please check
our [guidelines](CONTRIBUTING.md). Pull requests are welcome!

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/cross-platform-node-guide/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/cross-platform-node-guide/commits?author=ehmicky" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/thatalextaylor"><img src="https://avatars3.githubusercontent.com/u/1481643?v=4" width="100px;" alt="thatalextaylor"/><br /><sub><b>thatalextaylor</b></sub></a><br /><a href="#ideas-thatalextaylor" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/cross-platform-node-guide/commits?author=thatalextaylor" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/bnoordhuis"><img src="https://avatars0.githubusercontent.com/u/275871?v=4" width="100px;" alt="Ben Noordhuis"/><br /><sub><b>Ben Noordhuis</b></sub></a><br /><a href="#ideas-bnoordhuis" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/cross-platform-node-guide/commits?author=bnoordhuis" title="Documentation">📖</a></td><td align="center"><a href="http://opendirective.com"><img src="https://avatars2.githubusercontent.com/u/618922?v=4" width="100px;" alt="Steve Lee"/><br /><sub><b>Steve Lee</b></sub></a><br /><a href="#ideas-SteveALee" title="Ideas, Planning, & Feedback">🤔</a> <a href="#talk-SteveALee" title="Talks">📢</a></td><td align="center"><a href="http://tracker1.info/"><img src="https://avatars3.githubusercontent.com/u/444316?v=4" width="100px;" alt="Michael J. Ryan"/><br /><sub><b>Michael J. Ryan</b></sub></a><br /><a href="#ideas-tracker1" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="http://twitter.com/fabiospampinato"><img src="https://avatars1.githubusercontent.com/u/1812093?v=4" width="100px;" alt="Fabio Spampinato"/><br /><sub><b>Fabio Spampinato</b></sub></a><br /><a href="#ideas-fabiospampinato" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://github.com/AyrA"><img src="https://avatars0.githubusercontent.com/u/1301960?v=4" width="100px;" alt="AyrA"/><br /><sub><b>AyrA</b></sub></a><br /><a href="#ideas-AyrA" title="Ideas, Planning, & Feedback">🤔</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
