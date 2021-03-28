<img src="https://raw.githubusercontent.com/ehmicky/design/main/cross-platform-nodejs/cross-platform-nodejs.svg?sanitize=true" width="500"/>

[![License](https://img.shields.io/badge/license-CC%20BY%204.0-4cc61e.svg?logo=github)](https://creativecommons.org/licenses/by/4.0/)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

How to write cross-platform Node.js code.

**Why you should care**: according to the
[2018 Node.js](https://nodejs.org/en/user-survey-report/#Primary-OS-Distro)
[user survey](https://nodejs.org/en/user-survey-report/2018-nodejs-user-survey-raw-data.xlsx),
24% of Node.js developers use Windows locally and 41% use Mac. In production 85%
use Linux and 1% use BSD.

# Table of contents

[Summary](docs/summary.md)

## 🤖 [Development environment](docs/1_development_environment/README.md)

- [Node setup](docs/1_development_environment/node_setup.md)
- [Core utilities](docs/1_development_environment/core_utilities.md)
- [Testing](docs/1_development_environment/testing.md)

## 📝 [File encoding](docs/2_file_encoding/README.md)

- [Character encoding](docs/2_file_encoding/character_encoding.md)
- [Newlines](docs/2_file_encoding/newlines.md)
- [EOF and BOM](docs/2_file_encoding/eof_bom.md)

## 📂 [Filesystem](docs/3_filesystem/README.md)

- [Directory locations](docs/3_filesystem/directory_locations.md)
- [File paths](docs/3_filesystem/file_paths.md)
- [Filenames](docs/3_filesystem/filenames.md)
- [Symlinks](docs/3_filesystem/symlinks.md)
- [File metadata](docs/3_filesystem/file_metadata.md)

## 💻 [Terminal](docs/4_terminal/README.md)

- [Shell](docs/4_terminal/shell.md)
- [File execution](docs/4_terminal/file_execution.md)
- [Package binaries](docs/4_terminal/package_binaries.md)
- [Environment variables](docs/4_terminal/environment_variables.md)

## 🔒 [Security](docs/5_security/README.md)

- [Permissions](docs/5_security/permissions.md)
- [Users](docs/5_security/users.md)

## 📡 [Networking / IPC](docs/6_networking_ipc/README.md)

- [Networking](docs/6_networking_ipc/networking.md)
- [Processes](docs/6_networking_ipc/processes.md)
- [Signals](docs/6_networking_ipc/signals.md)
- [Errors](docs/6_networking_ipc/errors.md)

## 🎛️ [System](docs/7_system/README.md)

- [OS identification](docs/7_system/os_identification.md)
- [System configuration](docs/7_system/system_configuration.md)
- [Hardware](docs/7_system/hardware.md)
- [Time](docs/7_system/time.md)

# See also

- [cross-platform-terminal-characters](https://github.com/ehmicky/cross-platform-terminal-characters):
  All the characters that work on most terminals
- https://github.com/bcoe/awesome-cross-platform-nodejs
- https://github.com/Microsoft/nodejs-guidelines
- https://shapeshed.com/writing-cross-platform-node/

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

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

Thanks go to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/cross-platform-node-guide/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/cross-platform-node-guide/commits?author=ehmicky" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/thatalextaylor"><img src="https://avatars3.githubusercontent.com/u/1481643?v=4" width="100px;" alt="thatalextaylor"/><br /><sub><b>thatalextaylor</b></sub></a><br /><a href="#ideas-thatalextaylor" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/cross-platform-node-guide/commits?author=thatalextaylor" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/bnoordhuis"><img src="https://avatars0.githubusercontent.com/u/275871?v=4" width="100px;" alt="Ben Noordhuis"/><br /><sub><b>Ben Noordhuis</b></sub></a><br /><a href="#ideas-bnoordhuis" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/cross-platform-node-guide/commits?author=bnoordhuis" title="Documentation">📖</a></td>
    <td align="center"><a href="http://opendirective.com"><img src="https://avatars2.githubusercontent.com/u/618922?v=4" width="100px;" alt="Steve Lee"/><br /><sub><b>Steve Lee</b></sub></a><br /><a href="#ideas-SteveALee" title="Ideas, Planning, & Feedback">🤔</a> <a href="#talk-SteveALee" title="Talks">📢</a></td>
    <td align="center"><a href="http://tracker1.info/"><img src="https://avatars3.githubusercontent.com/u/444316?v=4" width="100px;" alt="Michael J. Ryan"/><br /><sub><b>Michael J. Ryan</b></sub></a><br /><a href="#ideas-tracker1" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://twitter.com/fabiospampinato"><img src="https://avatars1.githubusercontent.com/u/1812093?v=4" width="100px;" alt="Fabio Spampinato"/><br /><sub><b>Fabio Spampinato</b></sub></a><br /><a href="#ideas-fabiospampinato" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/AyrA"><img src="https://avatars0.githubusercontent.com/u/1301960?v=4" width="100px;" alt="AyrA"/><br /><sub><b>AyrA</b></sub></a><br /><a href="#ideas-AyrA" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://twitter.com/felixfbecker"><img src="https://avatars0.githubusercontent.com/u/10532611?v=4" width="100px;" alt="Felix Becker"/><br /><sub><b>Felix Becker</b></sub></a><br /><a href="https://github.com/ehmicky/cross-platform-node-guide/commits?author=felixfbecker" title="Documentation">📖</a> <a href="#ideas-felixfbecker" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/niktekusho"><img src="https://avatars1.githubusercontent.com/u/18280135?v=4" width="100px;" alt="Nicola Dal Maso"/><br /><sub><b>Nicola Dal Maso</b></sub></a><br /><a href="#ideas-niktekusho" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
