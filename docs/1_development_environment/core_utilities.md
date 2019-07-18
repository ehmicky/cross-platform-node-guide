# 🤖 Core utilities

## Platform-specific utilities

Each OS has its own set of (from the lowest to the highest level):

- [system calls](https://en.wikipedia.org/wiki/System_call) like
  [`fork`](http://man7.org/linux/man-pages/man2/fork.2.html).
- [core utilities](https://www.gnu.org/software/coreutils/) like
  [`sed`](https://www.gnu.org/software/sed/manual/sed.html).
- common user applications like [`vim`](https://www.vim.org/) or
  [`Notepad`](https://en.wikipedia.org/wiki/Microsoft_Notepad).

Directly executing one of those (e.g. calling `sed`) won't usually work on every
OS.

## Cross-platform solutions

Most Node.js API core modules abstract this (mostly through
[libuv](http://libuv.org)). For example, the
[`child_process`](https://nodejs.org/api/child_process.html) methods are
executing OS-specific system calls under the hood.

Some projects abstract OS-specific core utilities like:

- [`MinGW`](http://www.mingw.org/) for [gcc](https://www.gnu.org/software/gcc/)
  on Windows.
- [`msys`](http://www.mingw.org/wiki/msys) for
  [Bash](https://www.gnu.org/software/bash/) on Windows. Shipped with
  [Git for Windows](https://gitforwindows.org/).
- [`shelljs`](https://github.com/shelljs/shelljs)
- [`node-windows`](https://github.com/coreybutler/node-windows)

Other projects provide with cross-platform features like copy/pasting, such as
[`clipboard-cli`](https://github.com/sindresorhus/clipboard-cli).

## Low-level solutions

Finally, some lower-level tools attempt to bring cross-platform compatibility by
emulating or translating system calls:

- [Wine](https://www.winehq.org/): to run Windows API calls on Linux, Mac, BSD
  and Solaris.
- [Cygwin](https://www.cygwin.com/): to run POSIX on Windows.
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10): to run the
  Linux command line on Windows
  ([ELF binary execution](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format),
  system calls, filesystem, [Bash](https://www.gnu.org/software/bash/), core
  utilities, common applications).

## Summary

Do not rely on [OS system calls](https://en.wikipedia.org/wiki/System_call) or
[core utilities](https://www.gnu.org/software/coreutils/) without using an
abstraction layer.

<hr>

[**Next** _(🤖 Testing)_](testing.md)<br>
[**Previous** _(🤖 Node setup)_](node_setup.md)<br> [**Top**](README.md)<br>
