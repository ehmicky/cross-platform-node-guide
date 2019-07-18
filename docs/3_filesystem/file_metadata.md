# 📂 File metadata

## fs.stat()

The [`blksize`](https://nodejs.org/api/fs.html#fs_stats_blksize) and
[`blocks`](https://nodejs.org/api/fs.html#fs_stats_blocks) values of
[`fs.stat()`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback)
are `undefined` on Windows. On the other hand the
[`birthtime`](https://nodejs.org/api/fs.html#fs_stats_birthtime) and
[`birthtimeMs`](https://nodejs.org/api/fs.html#fs_stats_birthtimems) do not
properly work on Linux as they always reflect the
[`ctime`](https://nodejs.org/api/fs.html#fs_stat_time_values) field instead.

## fs.open()

The [`O_NOATIME`](https://nodejs.org/api/fs.html#fs_file_open_constants) flag of
[`fs.open()`](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)
only works on Linux. Access times can also be disabled on Windows but through
[the registry](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/fsutil-behavior#remarks).

## fs.watch()

[`fs.watch()`](https://nodejs.org/api/fs.html#fs_caveats) is not very
cross-platform. For example the option `recursive` does not work on Linux.
[`chokidar`](https://github.com/paulmillr/chokidar) can be used instead.

<hr>

[**Next** _(💻 Terminal)_](../4_terminal/README.md)<br>
[**Previous** _(📂 Symlinks)_](symlinks.md)<br> [**Top**](README.md)<br>
