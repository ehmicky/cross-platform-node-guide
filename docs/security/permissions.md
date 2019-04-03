# Permissions

Unix uses [POSIX permissions](https://linux.die.net/man/1/chmod) but Windows is
based on a combination of:

- [file attributes](https://docs.microsoft.com/en-us/windows/desktop/fileio/file-attribute-constants)
  like `readonly`, `hidden` and `system`.
  [`winattr`](https://github.com/stevenvachon/winattr) and
  [`hidefile`](https://github.com/stevenvachon/hidefile) can be used to
  manipulate those.
- [ACLs](https://docs.microsoft.com/en-us/windows/desktop/secauthz/access-control-lists)
  (also called NTFS permissions or just "file permissions").
- share permissions.

Node.js does not support Windows permissions.
[`fs.chmod()`](https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback),
[`fs.stat()`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback)'s
[`mode`](https://nodejs.org/api/fs.html#fs_stats_mode),
[`fs.access()`](https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback),
[`fs.open()`](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)'s
`mode`,
[`fs.mkdir()`](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback)'s
`options.mode` and
[`process.umask()`](https://nodejs.org/api/process.html#process_process_umask_mask) only work on
Unix with some minor exceptions:

- [`fs.access()`](https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback)
  [`F_OK`](https://nodejs.org/api/fs.html#fs_file_access_constants) works.
- [`fs.access()`](https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback)
  [`W_OK`](https://nodejs.org/api/fs.html#fs_file_access_constants) checks
  the `readonly` file attribute on Windows. This is quite limited as it does
  not check other file attributes nor ACLs.
- The `readonly` file attribute is checked on Windows when the `write` POSIX
  permission is missing for any user class (`user`, `group` or `others`).

On the other hand
[`fs.open()`](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)
works correctly on Windows where
[flags](https://nodejs.org/api/fs.html#fs_file_system_flags) are being
translated to Windows-specific file attributes and permissions.

Another difference on Windows: to execute files their extension must be listed
in the environment variable
[`PATHEXT`](http://environmentvariables.org/PathExt).

Directories can
[be locked](https://github.com/isaacs/node-graceful-fs/pull/97) on Windows
which make erasing or removing them fail.
[`graceful-fs`](https://github.com/isaacs/node-graceful-fs) or
[`rimraf`](https://github.com/isaacs/rimraf) solves this by retrying few
milliseconds later.

Finally
[`fs.lchmod()`](https://nodejs.org/api/fs.html#fs_fs_lchmod_path_mode_callback)
is only available on Mac.

<hr>

[🡲 Next _(Security > Users)_](users.md)<br>
[🡰 Previous _(Security)_](README.md)<br>
[🡱 Top _(Security)_](README.md)<br>
