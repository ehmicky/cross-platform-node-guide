# 💻 Shell

## Shell types

Unix usually comes with [Bash](https://www.gnu.org/software/bash/) but not
always. Popular alternatives include [Fish](https://fishshell.com/),
[Dash](http://man7.org/linux/man-pages/man1/dash.1.html),
[tcsh](https://linux.die.net/man/1/tcsh), [ksh](http://www.kornshell.com/) and
[zsh](http://www.zsh.org/).

Writing interoperable shell code can be somewhat achieved by using either:

- [sh](https://en.wikipedia.org/wiki/Bourne_shell) the ancestor of most of
  those shells.
- projects like [modernish](https://github.com/modernish/modernish).

However this won't work on Windows which uses two other shells:

- [`cmd.exe`](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/cmd)
  which comes by default.
- [Powershell](https://docs.microsoft.com/en-us/powershell/scripting/overview)
  which is more recent, featureful and complex.

## cmd.exe

`cmd.exe` is very different from Bash and has quite many limitations:

- `;` cannot be used to separate statements. However `&&` can be used like
  in Bash.
- CLI flags often use slashes (`/opt`) instead of dashes (`-opt`). But
  Node.js binaries can still use `-opt`.
- Globbing (e.g. wildcard `*`) does not work.
- [Exit code](https://en.wikipedia.org/wiki/Exit_status) are accessed with
  `%errorlevel%` instead of `$?`.
- [Escaping](https://ss64.com/nt/syntax-esc.html) is done differently with
  double quotes and `^`. This is partially solved with the
  [`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
  option `windowsVerbatimArguments` which defaults to `true` when `cmd.exe` is
  used.

As a consequence it is recommended to:

- keep shell commands to simple `command arguments...` calls
- use [`execa()`](https://github.com/sindresorhus/execa) (not `execa.shell()`)
  to fire those.

## Command execution

When the option `shell` of
[`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
is `true`, `/bin/sh` will be used on Unix and `cmd.exe` (or the environment
variable `ComSpec`) will be used on Windows. Since those shells behave
differently it is better to avoid that option.

## Terminal colors

How many colors a terminal supports (if any) depends on both the operating
system and the terminal itself.

You can use
[`process.stdout.getColorsDepth()`](https://nodejs.org/api/tty.html#tty_writestream_getcolordepth_env), [`process.stdout.hasColors()`](https://nodejs.org/api/tty.html#tty_writestream_hascolors_count_env) or
[`supports-color`](https://github.com/chalk/supports-color) to detect these.
However this is usually not necessary as colors library like
[`chalk`](https://github.com/chalk/chalk) automatically do this.

## Summary

Fire shell commands with [`execa`](https://github.com/sindresorhus/execa).

<hr>

[**Next** _(💻 File execution)_](file_execution.md)<br>
[**Previous** _(💻 Terminal)_](README.md)<br>
[**Top**](README.md)<br>
