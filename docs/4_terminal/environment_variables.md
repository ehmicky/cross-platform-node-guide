# 💻 Environment variables

## Get / set

Unix shells and `cmd.exe` use different syntaxes to list, reference and pass
environment variables. [`cross-env`](https://github.com/kentcdodds/cross-env)
can be used to do this in a cross-platform way.

This is only an issue when executing shell commands outside Node.js, for example
in `npm` scripts. In Node.js,
[`process.env`](https://nodejs.org/api/process.html#process_process_env) and the
[`env` option](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
of [`child_process`](https://nodejs.org/api/child_process.html) /
[`execa`](https://github.com/sindresorhus/execa) should be used instead.

### Listing

To list the current
[environment variables](https://en.wikipedia.org/wiki/Environment_variable):

- `env` must be used on Unix.
- `set` on Windows.

### Referencing

The syntax to
[reference environment variables](https://ss64.com/nt/syntax-variables.html) is:

- `$VARIABLE` on Unix.
- `%VARIABLE%` on Windows.

Also if the variable is missing, its value will be:

- `''` on Unix and in Windows batch files.
- `'%VARIABLE%'` in `cmd.exe`.

### Passing

To pass
[environment variables](https://docs.microsoft.com/en-us/windows/desktop/procthread/environment-variables)
to a command:

- on Unix, it must be prepended with `VARIABLE=value ...`
- on Windows, one must use `Set VARIABLE=value` or `setx VARIABLE value` as
  separate statements.

## Case sensitivity

Environment variables are case sensitive on Unix. However this is not the case
on Windows (except inside [`msys`](http://www.mingw.org/wiki/msys)): if the same
environment variable is defined twice but with different cases, the last defined
prevails. This includes the
[`env` option](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
passed to
[`child_process` methods](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
such as `spawn()`.

[`path-key`](https://github.com/sindresorhus/path-key) can be used to solve this
for the `PATH` environment variable.

## Available variables

Most environment variables names are OS-specific:

- `SHELL` on Unix is `ComSpec` on Windows.
  [`os.userInfo().shell`](https://nodejs.org/api/os.html#os_os_userinfo_options)
  returns `null` on Windows.
- `PS1` on Unix is `PROMPT` on Windows.
- `PWD` on Unix is `CD` on Windows.
  [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd) and
  [`process.chdir()`](https://nodejs.org/api/process.html#process_process_chdir_directory)
  should be used instead.
- `HOME` on Unix is `USERPROFILE` on Windows.
  [`os.homedir()`](https://nodejs.org/api/os.html#os_os_homedir) (faster)
  [`os.userInfo().homedir`](https://nodejs.org/api/os.html#os_os_userinfo_options)
  (more accurate) should be used instead.
- `TMPDIR` in Unix is `TMP` or `TEMP` on Windows.
  [`os.tmpdir()`](https://nodejs.org/api/os.html#os_os_tmpdir) should be used
  instead.
- `USER` or `LOGNAME` on Unix is `USERDOMAIN` and `USERNAME` on Windows.
  [`username`](https://github.com/sindresorhus/username) or
  [`os.userInfo().username`](https://nodejs.org/api/os.html#os_os_userinfo_options)
  should be used instead.
- `HOSTNAME` on Unix is `COMPUTERNAME` on Windows.
  [`os.hostname()`](https://nodejs.org/api/os.html#os_os_hostname) should be
  used instead.

The project [`osenv`](https://github.com/npm/osenv) can be used to retrieve
OS-specific environment variables names.

## Summary

Outside Node.js (e.g. in `npm` scripts), environment variables should be
referenced and passed using
[`cross-env`](https://github.com/kentcdodds/cross-env).

Use [`os` methods](https://nodejs.org/api/os.html) or
[`osenv`](https://github.com/npm/osenv) to retrieve specific environment
variables.

<hr>

[**Next** _(🔒 Security)_](../5_security/README.md)\
[**Previous** _(💻 Package binaries)_](package_binaries.md)\
[**Top**](README.md)
