# 🎛️ OS identification

The main way to identify the current OS is to use
[`process.platform`](https://nodejs.org/api/process.html#process_process_platform)
(or the identical
[`os.platform()`](https://nodejs.org/api/os.html#os_os_platform)).

The [`os`](https://nodejs.org/api/os.html) core module offers some
finer-grained identification methods but those are rarely needed:

- [`os.type()`](https://nodejs.org/api/os.html#os_os_type) is similar but
  slighly more precise.
- [`os.release()`](https://nodejs.org/api/os.html#os_os_release) returns the
  OS version number, e.g. `3.11.0-14-generic` (Linux), `18.0.0` (Mac) or
  `10.0.17763` (Windows).
- [`os.arch()`](https://nodejs.org/api/os.html#os_os_arch) (or the identical
  [`process.arch`](https://nodejs.org/api/process.html#process_process_arch))
  returns the CPU architecture, e.g. `arm` or `x64`.
- [`os.endianness()`](https://nodejs.org/api/os.html#os_os_endianness)
  returns the CPU endianness, i.e. `BE` or `LE`.

Some projects allow retrieving:

- [`getos`](https://github.com/retrohacker/getos): the Linux distribution
  name.
- [`osname`](https://github.com/sindresorhus/os-name) (and the related
  [`windows-release`](https://github.com/sindresorhus/windows-release) and
  [`macos-release`](https://github.com/sindresorhus/macos-release)): the OS
  name and version in a human-friendly way.
- [`is-windows`](https://github.com/jonschlinkert/is-windows): whether current
  OS is Windows, including through [MSYS](http://www.mingw.org/wiki/msys) and
  [Cygwin](https://www.cygwin.com/).
- [`is-wsl`](https://github.com/sindresorhus/is-wsl): whether current OS is
  Windows though
  [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

## Summary

When using OS-specific logic, identify the current OS with
[`process.platform`](https://nodejs.org/api/process.html#process_process_platform).

<hr>

[**Next** _(🎛️ System configuration)_](system_configuration.md)<br>
[**Previous** _(🎛️ System)_](README.md)<br>
[**Top**](README.md)<br>
