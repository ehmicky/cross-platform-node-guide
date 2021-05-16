# 📡 Errors

Node errors can be identified with either:

- [`error.code`](https://nodejs.org/api/errors.html#errors_error_code): an
  OS-agnostic string (more cross-platform).
- [`error.errno`](https://nodejs.org/api/errors.html#errors_error_errno): an
  OS-specific integer constant.

It is possible to convert between both using
[`os.constants.errno`](https://nodejs.org/api/os.html#os_error_constants),
[`util.getSystemErrorName`](https://nodejs.org/api/util.html#util_util_getsystemerrorname_err).
and
[`util.getSystemErrorMap`](https://nodejs.org/api/util.html#util_util_getsystemerrormap).

Most available `error.code`
[start with `E`](https://nodejs.org/api/os.html#os_posix_error_constants) and
can be fired on any OS. However few
[start with `W`](https://nodejs.org/api/os.html#os_windows_specific_error_constants)
and can only be fired on Windows.

<hr>

[**Next** _(🎛️ System)_](../7_system/README.md)\
[**Previous** _(📡 Signals)_](signals.md)\
[**Top**](README.md)
