# 💻 File execution

## Program selection

To decide which program should execute a file:

- Unix uses [shebangs](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) like
  `#!/usr/bin/node`.
- Windows uses
  [filename](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/ftype)
  [extensions](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/assoc).

Cross-platform file execution must either:

- explicitly specify the program, e.g. `node ./file.js` instead of `./file.js`.
- use [`cross-spawn`](https://github.com/moxystudio/node-cross-spawn)
  (which is included in [`execa`](https://github.com/sindresorhus/execa))
  which polyfills shebangs on Windows.
- use [`open`](https://github.com/sindresorhus/open).

## File extensions

During file execution the extension can be omitted on Windows if it is listed
in the [`PATHEXT`](http://environmentvariables.org/PathExt) environment
variable, which defaults to
`.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC`. This won't work on
Unix.

## `PATH` variable

The [`PATH`](<https://en.wikipedia.org/wiki/PATH_(variable)>) environment
variable uses `;` instead of `:` as delimiter on Windows. This can be retrieved
with
[`path.delimiter`](https://nodejs.org/api/path.html#path_path_delimiter).

## child_process.spawn()

When the option
[`detached: false`](https://nodejs.org/api/child_process.html#child_process_options_detached)
of
[`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
is used, the child process will be terminated when its parent is on Windows, but not on Unix.

When the option
[`detached: true`](https://nodejs.org/api/child_process.html#child_process_options_detached)
is used instead, a new terminal window will appear on Windows unless the option
[`windowsHide: true`](https://nodejs.org/api/child_process.html#child_process_options_detached)
is used (requires Node `>= 8.8.0`).

Finally the option
[`argv0`](https://nodejs.org/api/child_process.html#child_process_options_detached)
does not modify `process.title` on Windows.

Redirecting to a file descriptor with the
[`stdio` option](https://nodejs.org/api/child_process.html#child_process_options_stdio)
of
[`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
is
[not supported on Windows](https://nodejs.org/api/child_process.html#child_process_options_stdio).

Many of those differences can be solved by using
[`execa`](https://github.com/sindresorhus/execa).

## Summary

Fire shell commands with [`execa`](https://github.com/sindresorhus/execa).

<hr>

[**Next** _(💻 Package binaries)_](package_binaries.md)<br>
[**Previous** _(💻 Shell)_](shell.md)<br>
[**Top**](README.md)<br>
