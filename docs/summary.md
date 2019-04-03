# Summary

## [Development environment](development_environment/README.md)

- Do not rely on [OS system calls](https://en.wikipedia.org/wiki/System_call)
  or [core utilities](https://www.gnu.org/software/coreutils/) without using
  an abstraction layer.
- Test each OS with
  [virtual machines](https://en.wikipedia.org/wiki/Virtual_machine) and
  [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration).
- Instead of [`nvm`](https://github.com/creationix/nvm) use
  [`nvm-windows`](https://github.com/coreybutler/nvm-windows) and
  [`npm-windows-upgrade`](https://github.com/felixrieseberg/npm-windows-upgrade)
  on Windows.
- Run
  [`npm install -g windows-build-tools`](https://github.com/felixrieseberg/windows-build-tools)
  on Windows when installing [C/C++ addons](https://nodejs.org/api/addons.html).

## [File encoding](file_encoding/README.md)

- Use [`UTF-8`](https://en.wikipedia.org/wiki/UTF-8). File/terminal input
  should either be validated or converted to it
  ([`node-chardet`](https://github.com/runk/node-chardet)).
- Use [editorconfig](https://editorconfig.org/).
- Avoid printing Unicode characters (including
  [emoji](https://en.wikipedia.org/wiki/Emoji)) except through projects like
  [figures](https://github.com/sindresorhus/figures) and
  [log-symbols](https://github.com/sindresorhus/log-symbols).
- Use [`os.EOL`](https://nodejs.org/api/os.html#os_os_eol) when reading from or
  writing to a file, `\n` otherwise.
- End files with a newline.
- Avoid the
  [substitute character](https://en.wikipedia.org/wiki/Substitute_character)
  (`CTRL-Z`) in non-binary files.

## [Filesystem](filesystem/README.md)

- Use
  [`path.normalize()`](https://nodejs.org/api/path.html#path_path_normalize_path)
  when writing a file path to a terminal or file. Otherwise use Unix paths
  (slashes).
- Only use lowercase `a-z`, `0-9` and `-._,=()` in filenames.
- Avoid paths longer than 260 characters.
- Copy files instead of symlinking them.
- Use [`chokidar`](https://github.com/paulmillr/chokidar) to watch files.
- Avoid [`blksize`](https://nodejs.org/api/fs.html#fs_stats_blksize),
  [`blocks`](https://nodejs.org/api/fs.html#fs_stats_blocks),
  [`mode`](https://nodejs.org/api/fs.html#fs_stats_mode),
  [`uid`](https://nodejs.org/api/fs.html#fs_stats_uid),
  [`gid`](https://nodejs.org/api/fs.html#fs_stats_gid),
  [`birthtime`](https://nodejs.org/api/fs.html#fs_stats_birthtime) and
  [`birthtimeMs`](https://nodejs.org/api/fs.html#fs_stats_birthtimems) returned
  by
  [`fs.stat()`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback).

## [Shell commands](shell_commands/README.md)

- Fire shell commands with [`execa`](https://github.com/sindresorhus/execa).
- Keep shell commands to simple `command arguments...` calls.
- Reference and pass environment variables to shell commands using
  [`cross-env`](https://github.com/kentcdodds/cross-env).
- Avoid redirecting to a file descriptor with the
  [`stdio` option](https://nodejs.org/api/child_process.html#child_process_options_stdio)
  of [`child_process`](https://nodejs.org/api/child_process.html) methods.

## [Security](security/README.md)

- Avoid
  [`fs.chmod()`](https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback),
  [`fs.access()`](https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback)
  (except [`F_OK`](https://nodejs.org/api/fs.html#fs_file_access_constants)),
  [`fs.open()`](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)'s
  `mode`,
  [`fs.mkdir()`](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback)'s
  `options.mode` and
  [`process.umask()`](https://nodejs.org/api/process.html#process_process_umask_mask).
- Avoid
  [`os.userInfo().uid|gid`](https://nodejs.org/api/os.html#os_os_userinfo_options),
  [`fs.chown()`](https://nodejs.org/api/fs.html#fs_fs_chown_path_uid_gid_callback)
  and the [`process`](https://nodejs.org/api/process.html) methods
  [`getuid()`](https://nodejs.org/api/process.html#process_process_getuid),
  [`geteuid()`](https://nodejs.org/api/process.html#process_process_geteuid),
  [`getgid()`](https://nodejs.org/api/process.html#process_process_getgid),
  [`getegid()`](https://nodejs.org/api/process.html#process_process_getegid),
  [`setuid()`](https://nodejs.org/api/process.html#process_process_setuid_id),
  [`seteuid()`](https://nodejs.org/api/process.html#process_process_seteuid_id),
  [`setgid()`](https://nodejs.org/api/process.html#process_process_setgid_id),
  [`setegid()`](https://nodejs.org/api/process.html#process_process_setegid_id),
  [`getgroups()`](https://nodejs.org/api/process.html#process_process_getgroups),
  [`setgroups()`](https://nodejs.org/api/process.html#process_process_setgroups_groups) and
  [`initgroups()`](https://nodejs.org/api/process.html#process_process_initgroups_user_extragroup).

## [Networking / IPC](networking_ipc/README.md)

- Use [`fkill`](https://github.com/sindresorhus/fkill) to terminate processes.
- Only use
  [`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
  with the following signals: `SIGINT`, `SIGTERM`, `SIGKILL` and `0`.
- Only use
  [`process.on(signal)`](https://nodejs.org/api/process.html#process_signal_events)
  with the following signals: `SIGINT`, `SIGTERM`, `SIGKILL`, `0`, `SIGWINCH`,
  `SIGABRT`, `SIGHUP` and `SIGBREAK`.
- Use [`ps-list`](https://github.com/sindresorhus/ps-list),
  [`pid-from-port`](https://github.com/kevva/pid-from-port) and
  [`process-exists`](https://github.com/sindresorhus/process-exists) to find
  and check for processes.
- Sockets / named pipes must be prefixed with `\\.\pipe\` on Windows.
- TCP servers should not
  [`listen()`](https://nodejs.org/api/net.html#net_server_listen_handle_backlog_callback)
  on a file descriptor.
- Do not use
  [`--diagnostic-report-on-signal`](https://nodejs.org/api/report.html#report_usage)

## [System](system/README.md)

- Use [`os`](https://nodejs.org/api/os.html) Node.js core module when needed.
  If it lacks some device information, use
  [`systeminformation`](https://github.com/sebhildebrandt/systeminformation)
  instead.
- When using OS-specific logic, identify the current OS with
  [`process.platform`](https://nodejs.org/api/process.html#process_process_platform).
- Do not assume
  [`process.hrtime()`](https://nodejs.org/api/process.html#process_process_hrtime_time)
  is nanoseconds-precise.
- Prefer [`error.code`](https://nodejs.org/api/errors.html#errors_error_code)
  over [`error.errno`](https://nodejs.org/api/errors.html#errors_error_errno).
- Avoid [`os.cpus()`](https://nodejs.org/api/os.html#os_os_cpus) `times.nice` and
  [`os.loadavg()`](https://nodejs.org/api/os.html#os_os_loadavg).

[➡ Next _(Development environment)_](development_environment/README.md)<br>
[⬆️ Top _(Table of contents)_](../README.md#table-of-contents)<br>
