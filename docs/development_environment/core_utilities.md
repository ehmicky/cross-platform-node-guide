# Core utilities

Each OS has its own set of (from the lowest to the highest level):

- [system calls](https://en.wikipedia.org/wiki/System_call) like
  [`fork`](http://man7.org/linux/man-pages/man2/fork.2.html).
- [core utilities](https://www.gnu.org/software/coreutils/) like
  [`sed`](https://www.gnu.org/software/sed/manual/sed.html).
- common user applications like [`vim`](https://www.vim.org/) or
  [`Notepad`](https://en.wikipedia.org/wiki/Microsoft_Notepad).

Directly executing one of those binaries (e.g. calling `sed`) won't usually
work on every OS.

There are several approaches to solve this:

- Most Node.js API core modules abstract this (mostly through
  [libuv](http://libuv.org)). E.g. the
  [`child_process`](https://nodejs.org/api/child_process.html) methods are
  executing OS-specific system calls under the hood.
- some projects abstract OS-specific core utilities like:
  - [`MinGW`](http://www.mingw.org/) for
    [gcc](https://www.gnu.org/software/gcc/) on Windows.
  - [`msys`](http://www.mingw.org/wiki/msys) for
    [Bash](https://www.gnu.org/software/bash/) on Windows.
    Shipped with [Git for Windows](https://gitforwindows.org/).
  - [`shelljs`](https://github.com/shelljs/shelljs)
  - [`node-windows`](https://github.com/coreybutler/node-windows)
- some projects abstract common user applications:
  - [`clipboard-cli`](https://github.com/sindresorhus/clipboard-cli) for
    copy/pasting.

Few lower-level tools attempt to bring cross-platform compatibility by
emulating or translating system calls:

- [Wine](https://www.winehq.org/): to run Windows API calls on Linux, Mac, BSD
  and Solaris.
- [Cygwin](https://www.cygwin.com/): to run POSIX on Windows.
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10):
  to run the Linux command line on Windows
  ([ELF binary execution](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format),
  system calls, filesystem, [Bash](https://www.gnu.org/software/bash/),
  core utilities, common applications).

<hr>

[🡲 **Next** _(Development environment > Testing)_](testing.md)<br>
[🡰 **Previous** _(Development environment > Node setup)_](node_setup.md)<br>
[🡱 **Top** _(Development environment)_](README.md)<br>
