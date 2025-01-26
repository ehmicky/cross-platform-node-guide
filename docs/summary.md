# Summary

## 🤖 [Development environment](1_development_environment/README.md)

- Do not rely on [OS system calls](https://en.wikipedia.org/wiki/System_call) or
  [core utilities](https://www.gnu.org/software/coreutils/) without using an
  abstraction layer.
- Test each OS with
  [virtual machines](https://en.wikipedia.org/wiki/Virtual_machine) and
  [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration).
- Instead of [`nvm`](https://github.com/nvm-sh/nvm), use
  [`nvm-windows`](https://github.com/coreybutler/nvm-windows) and
  [`npm-windows-upgrade`](https://github.com/felixrieseberg/npm-windows-upgrade)
  on Windows.
- [`nve`](https://github.com/ehmicky/nve) and
  [`nvexeca`](https://github.com/ehmicky/nvexeca) can be used to run a single
  command with one or several different Node.js versions.
- Run
  [`npm install -g windows-build-tools`](https://github.com/felixrieseberg/windows-build-tools)
  on Windows when installing [C/C++ addons](https://nodejs.org/api/addons.html).

## 📝 [File encoding](2_file_encoding/README.md)

- Keep the default encoding as [`UTF-8`](https://en.wikipedia.org/wiki/UTF-8).
  File/terminal input should either be validated or converted to it
  ([`node-chardet`](https://github.com/runk/node-chardet)).
- Use [editorconfig](https://editorconfig.org/).
- Use any characters from
  [cross-platform-terminal-characters](https://github.com/ehmicky/cross-platform-terminal-characters)
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

## 📂 [Filesystem](3_filesystem/README.md)

- Use
  [`path.normalize()`](https://nodejs.org/api/path.html#path_path_normalize_path)
  when writing a file path to a terminal or file. Otherwise use Unix paths
  (slashes).
- Use
  [`url.fileURLToPath()`](https://nodejs.org/api/url.html#url_url_fileurltopath_url)
  with [`import.meta.url`](https://nodejs.org/api/esm.html#esm_import_meta_url).
  Alternatively, use
  [`import.meta.filename`](https://nodejs.org/api/esm.html#importmetafilename)
  and
  [`import.meta.dirname`](https://nodejs.org/api/esm.html#importmetadirname).
- Only use lowercase `a-z`, `0-9` and `-._,=()` in filenames.
- Avoid paths longer than 260 characters.
- Copy files instead of symlinking them.
- Use [`chokidar`](https://github.com/paulmillr/chokidar) to watch files.
- Avoid [`--watch-path`](https://nodejs.org/api/cli.html#--watch-path)
- Avoid the [`O_NOATIME`](https://nodejs.org/api/fs.html#fs_file_open_constants)
  and [`UV_FS_O_FILEMAP`](https://nodejs.org/api/fs.html#fs_file_open_constants)
  flags of
  [`fs.open()`](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)
- Avoid [`blksize`](https://nodejs.org/api/fs.html#fs_stats_blksize),
  [`blocks`](https://nodejs.org/api/fs.html#fs_stats_blocks),
  [`mode`](https://nodejs.org/api/fs.html#fs_stats_mode),
  [`uid`](https://nodejs.org/api/fs.html#fs_stats_uid),
  [`gid`](https://nodejs.org/api/fs.html#fs_stats_gid),
  [`atime`](https://nodejs.org/api/fs.html#fs_stats_atime),
  [`atimeMs`](https://nodejs.org/api/fs.html#fs_stats_atimems),
  [`ctime`](https://nodejs.org/api/fs.html#fs_stats_ctime),
  [`ctimeMs`](https://nodejs.org/api/fs.html#fs_stats_ctimems),
  [`birthtime`](https://nodejs.org/api/fs.html#fs_stats_birthtime) and
  [`birthtimeMs`](https://nodejs.org/api/fs.html#fs_stats_birthtimems) returned
  by
  [`fs.stat()`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback).
- Use [`global-cache-dir`](https://github.com/ehmicky/global-cache-dir) to
  retrieve the global cache directory.
- Use [`env-paths`](https://github.com/sindresorhus/env-paths) for other common
  directories.

## 💻 [Terminal](4_terminal/README.md)

- Fire shell commands with [`execa`](https://github.com/sindresorhus/execa).
- Keep shell commands to simple `command arguments...` calls.
- Use [`npx`](https://github.com/zkat/npx) or
  [`execa`](https://github.com/sindresorhus/execa) to fire local binaries.
- Outside Node.js (e.g. in `npm` scripts), environment variables should be
  referenced and passed using
  [`cross-env`](https://github.com/kentcdodds/cross-env).
- Avoid redirecting to a file descriptor with the
  [`stdio` option](https://nodejs.org/api/child_process.html#child_process_options_stdio)
  of [`child_process`](https://nodejs.org/api/child_process.html) methods.

## 🔒 [Security](5_security/README.md)

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
  [`child_process`](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options)'s
  `uid` and `gid`,
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
  [`setgroups()`](https://nodejs.org/api/process.html#process_process_setgroups_groups)
  and
  [`initgroups()`](https://nodejs.org/api/process.html#process_process_initgroups_user_extragroup).
- Avoid [`--secure-heap`](https://nodejs.org/api/cli.html#cli_secure_heap_n)

## 📡 [Networking / IPC](6_networking_ipc/README.md)

- Use [`error.code`](https://nodejs.org/api/errors.html#errors_error_code)
  instead of
  [`error.errno`](https://nodejs.org/api/errors.html#errors_error_errno).
- Use [`fkill`](https://github.com/sindresorhus/fkill) to terminate processes.
- Only use
  [`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
  with the following signals: `SIGINT`, `SIGTERM`, `SIGKILL`, `SIGQUIT` and `0`.
- Only use
  [`process.on(signal)`](https://nodejs.org/api/process.html#process_signal_events)
  with the following signals: `SIGINT`, `SIGHUP` and `SIGWINCH`.
- Use [`ps-list`](https://github.com/sindresorhus/ps-list),
  [`pid-from-port`](https://github.com/kevva/pid-from-port) and
  [`process-exists`](https://github.com/sindresorhus/process-exists) to find and
  check for processes.
- Sockets / named pipes must be prefixed with `\\.\pipe\` on Windows.
- TCP servers should not
  [`listen()`](https://nodejs.org/api/net.html#net_server_listen_handle_backlog_callback)
  on a file descriptor.
- Do not use
  [`--diagnostic-report-on-signal`](https://nodejs.org/api/report.html#report_usage)

## 🎛️ [System](7_system/README.md)

- Use [`os`](https://nodejs.org/api/os.html) Node.js core module and
  [`navigator`](https://nodejs.org/api/globals.html#navigator) when needed. If
  it lacks some information, use
  [`systeminformation`](https://github.com/sebhildebrandt/systeminformation)
  instead.
- When using OS-specific logic, identify the current OS with
  [`process.platform`](https://nodejs.org/api/process.html#process_process_platform).
- Do not assume
  [`process.hrtime()`](https://nodejs.org/api/process.html#process_process_hrtime_time)
  is nanoseconds-precise.
- Avoid [`os.cpus()`](https://nodejs.org/api/os.html#os_os_cpus)'s `times.nice`,
  [`os.loadavg()`](https://nodejs.org/api/os.html#os_os_loadavg) and
  [`process.resourceUsage()`](https://nodejs.org/api/all.html#process_process_resourceusage)'s
  `voluntaryContextSwitches` and `involuntaryContextSwitches`.

<hr>

[**Next** _(🤖 Development environment)_](1_development_environment/README.md)\
[**Top**](../README.md#table-of-contents)
