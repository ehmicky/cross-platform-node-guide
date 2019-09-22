# 📂 File metadata

## fs.stat()

The [`blksize`](https://nodejs.org/api/fs.html#fs_stats_blksize) and
[`blocks`](https://nodejs.org/api/fs.html#fs_stats_blocks) values of
[`fs.stat()`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback)
are `undefined` on Windows.

The timestamps have inconsistent behavior across OS:

- [`birthtime`](https://nodejs.org/api/fs.html#fs_stats_birthtime) and
  [`birthtimeMs`](https://nodejs.org/api/fs.html#fs_stats_birthtimems) can be
  `1970-01-01` or the
  [same as `ctime`](https://nodejs.org/api/fs.html#fs_stat_time_values) on some
  platforms
- [`atime`](https://nodejs.org/api/fs.html#fs_stats_atime) and
  [`atimeMs`](https://nodejs.org/api/fs.html#fs_stats_atimems) can be disabled
  at the partition-level, especially on
  [Unix](https://wiki.archlinux.org/index.php/fstab#atime_options) but on
  [Windows](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/fsutil-behavior)
  as well
- Windows handles [`ctime`](https://nodejs.org/api/fs.html#fs_stats_ctime) and
  [`ctimeMs`](https://nodejs.org/api/fs.html#fs_stats_ctimems) differently than
  Unix
- [`mtime`](https://nodejs.org/api/fs.html#fs_stats_mtime) and
  [`mtimeMs`](https://nodejs.org/api/fs.html#fs_stats_mtimems) are also not
  completely [reliable](https://apenwarr.ca/log/20181113)

## fs.open()

The [`O_NOATIME`](https://nodejs.org/api/fs.html#fs_file_open_constants) flag of
[`fs.open()`](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)
only works on Linux. Access times can also be disabled on Windows but through
[the registry](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/fsutil-behavior#remarks).

The [`UV_FS_O_FILEMAP`](https://nodejs.org/api/fs.html#fs_file_open_constants)
flag only works on Windows.

## fs.watch()

[`fs.watch()`](https://nodejs.org/api/fs.html#fs_caveats) is not very
cross-platform. For example the option `recursive` does not work on Linux.
[`chokidar`](https://github.com/paulmillr/chokidar) can be used instead.

<hr>

[**Next** _(💻 Terminal)_](../4_terminal/README.md)<br>
[**Previous** _(📂 Symlinks)_](symlinks.md)<br> [**Top**](README.md)<br>
