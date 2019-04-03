# Environment variables

The syntax to
[reference environment variables](https://ss64.com/nt/syntax-variables.html) is
`$VARIABLE` on Unix but `%VARIABLE%` on Windows. Also if the variable is
missing, its value will be `''` on Unix and in Windows batch files, but
`'%VARIABLE%'` in `cmd.exe`.

To pass
[environment variables](https://docs.microsoft.com/en-us/windows/desktop/procthread/environment-variables)
to a command, it must be prepended with `VARIABLE=value ...` on Unix. However on
Windows one must use `Set VARIABLE=value` or `setx VARIABLE value` as separate
statements. [`cross-env`](https://github.com/kentcdodds/cross-env) can be used
to both reference and pass environment variables on any OS.

To list the current
[environment variables](https://en.wikipedia.org/wiki/Environment_variable)
`env` must be used on Unix and `set` on Windows. However
[`process.env`](https://nodejs.org/api/process.html#process_process_env) will
work on any OS.

Environment variables are case insensitive on Windows but not on Unix.
[`path-key`](https://github.com/sindresorhus/path-key) can be used to solve this
for the `PATH` environment variable.

Finally most environment variables names are OS-specific:

- `SHELL` on Unix is `ComSpec` on Windows.
  [`os.userInfo().shell`](https://nodejs.org/api/os.html#os_os_userinfo_options)
  returns `null` on Windows.
- `PS1` on Unix is `PROMPT` on Windows.
- `PWD` on Unix is `CD` on Windows.
  [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd)
  and
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

<hr>

[🡲 Next _(Security)_](../security/README.md)<br>
[🡰 Previous _(Terminal > Package binaries)_](package_binaries.md)<br>
[🡱 Top _(Terminal)_](README.md)<br>
