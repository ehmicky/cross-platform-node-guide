# 🎛️ OS identification

The main way to identify the current OS is to use
[`process.platform`](https://nodejs.org/api/process.html#process_process_platform)
(or the identical
[`os.platform()`](https://nodejs.org/api/os.html#os_os_platform)).

The [`os`](https://nodejs.org/api/os.html) core module offers some finer-grained
identification methods but those are rarely needed:

- [`os.type()`](https://nodejs.org/api/os.html#os_os_type) is similar but
  slighly more precise.
- [`os.release()`](https://nodejs.org/api/os.html#os_os_release) returns the OS
  version number, e.g. `3.11.0-14-generic` (Linux), `18.0.0` (Mac) or
  `10.0.17763` (Windows).
- [`os.version()`](https://nodejs.org/api/os.html#os_os_version) returns a more
  detailed OS version number, e.g. `#32-Ubuntu SMP Fri Jan 31 20:24:34 UTC 2020`
  (Linux),
  `Darwin Kernel Version 18.0.0: Wed Aug 22 20:13:40 PDT 2018; root:xnu-4903.201.2~1/RELEASE_X86_64`
  (Mac) or `Windows 10 Home` (Windows).
- [`os.arch()`](https://nodejs.org/api/os.html#os_os_arch) (or the identical
  [`process.arch`](https://nodejs.org/api/process.html#process_process_arch))
  returns the CPU architecture, e.g. `arm` or `x64`.
- [`os.endianness()`](https://nodejs.org/api/os.html#os_os_endianness) returns
  the CPU endianness, i.e. `BE` or `LE`.
- [`navigator.platform`](https://nodejs.org/api/globals.html#navigatorplatform)
  can also be used, which combines `process.platform` and `process.arch`.

Some projects allow retrieving:

- [`getos`](https://github.com/retrohacker/getos): the Linux distribution name.
- [`osname`](https://github.com/sindresorhus/os-name) (and the related
  [`windows-release`](https://github.com/sindresorhus/windows-release) and
  [`macos-release`](https://github.com/sindresorhus/macos-release)): the OS name
  and version in a human-friendly way.
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

[**Next** _(🎛️ System configuration)_](system_configuration.md)\
[**Previous** _(🎛️ System)_](README.md)\
[**Top**](README.md)
