# 💻 Package binaries

Package binaries
([`package.json`'s `bin` field](https://docs.npmjs.com/files/package.json#bin))
are installed in the `node_modules/.bin` directory by `npm install`.

On Unix those are symlinks pointing to the executable files. They can be
executed directly inside a terminal.

On Windows, each package binary
[creates instead two files](https://github.com/npm/cmd-shim) for the same
purpose:

- a Windows batch file ending with `.cmd` which can be executed directly
  inside `cmd.exe`.
- a Unix shell file with no file extension which can be executed with `sh` or
  `bash`.

<hr>

[**Next** _(💻 Environment variables)_](environment_variables.md)<br>
[**Previous** _(💻 File execution)_](file_execution.md)<br>
[**Top**](README.md)<br>
