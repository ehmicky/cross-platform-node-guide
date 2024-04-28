# 📡 Signals

Windows do not use signals like Unix does.

## Terminating processes

However processes can be terminated using the
[`taskkill`](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill)
command. The [`taskkill`](https://github.com/sindresorhus/taskkill) project can
be used to do it from Node.js. [`fkill`](https://github.com/sindresorhus/fkill)
builds on it to terminate processes on any OS.

## Cross-platform signals

Which signals can be used is OS-specific:

- [`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
  can
  [only use the following signals on Windows](https://nodejs.org/api/process.html#process_signal_events):
  `SIGINT`, `SIGTERM`, `SIGKILL`, `SIGQUIT` and `0`.
- [`process.on(signal)`](https://nodejs.org/api/process.html#process_signal_events)
  can be used on Windows with:
  - `SIGINT`: but only when hitting `CTRL-C` on `cmd.exe`
  - `SIGABRT`
  - `SIGHUP`: closing `cmd.exe`
  - `SIGBREAK`: `CTRL-BREAK` on `cmd.exe`
  - `SIGWINCH`: resizing the terminal. This will only
    [be triggered](https://nodejs.org/api/process.html#process_signal_events) on
    Windows when the cursor moves on when a terminal in raw mode is used.
  - `SIGILL`, `SIGFPE` and `SIGSEGV` but listening to those signals is
    [not recommended](https://nodejs.org/api/process.html#process_signal_events)
- `SIGPOLL`, `SIGPWR` and `SIGUNUSED` can only be used on Linux.
- `SIGINFO` can only be used on Mac.

Each signal has both an OS-agnostic name and an OS-specific integer constant.
[`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
can use either. It is possible to convert between both using
[`os.constants.signals`](https://nodejs.org/api/os.html#os_signal_constants).
However it is more cross-platform to use signal names instead of integer
constants.

## Process groups

Using a negative argument with
[`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
to [target a process group ID](https://linux.die.net/man/2/kill) (as opposed to
a PID) does not work on Windows.

## Summary

Use [`fkill`](https://github.com/sindresorhus/fkill) to terminate processes.

Only use:

- [`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
  with `SIGINT`, `SIGTERM`, `SIGKILL`, `SIGQUIT`, and `0`.
- [`process.on(signal)`](https://nodejs.org/api/process.html#process_signal_events)
  with the `SIGINT`, `SIGTERM`, `SIGKILL`, `SIGQUIT`, `0`, `SIGWINCH`, `SIGABRT`, `SIGHUP`
  and `SIGBREAK`.

<hr>

[**Next** _(📡 Errors)_](errors.md)\
[**Previous** _(📡 Processes)_](processes.md)\
[**Top**](README.md)
