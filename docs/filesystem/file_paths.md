# 📂 File paths

While `/` is used as a file path delimiter on Unix (`/file/to/path`), `\` is
used on Windows instead (`\file\to\path`). The path delimiter can be retrieved
with [`path.sep`](https://nodejs.org/api/path.html#path_path_sep). Windows
actually allows using or mixing in `/` delimiters in file paths most of the
time, but not always so this should not be relied on.

Furthermore absolute paths always start with `/` on Unix, but on Windows they
can take
[many shapes](https://docs.microsoft.com/en-us/windows/desktop/fileio/naming-a-file):

- `\`: the current drive.
- `C:\`: a specific drive (here `C:`). This can also be used with relative
  paths like `C:file\to\path`.
- `\\HOST\`: UNC path, for remote hosts.
- `\\?\`: allows to overcome file path length limit of 260 characters.
  Those can be produced in Node.js with
  [`path.toNamespacedPath()`](https://nodejs.org/api/path.html#path_path_tonamespacedpath_path).
- `\\.\`: device path.

When file paths are used as arguments to Node.js core methods:

- for example as arguments to
  [`require(path)`](https://nodejs.org/api/modules.html#modules_require_id),
  [`fs.*(path)`](https://nodejs.org/api/fs.html) methods,
  [`path.*()`](https://nodejs.org/api/path.html) methods or
  [`process.chdir(path)`](https://nodejs.org/api/process.html#process_process_chdir_directory).
- only Unix paths are allowed on Unix. Both Unix and Windows paths are
  allowed on Windows (including mixed).

When file paths are returned by Node.js core methods:

- for example the return values of
  [`path.*()`](https://nodejs.org/api/path.html) methods,
  [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd),
  [`os.homedir()`](https://nodejs.org/api/os.html#os_os_homedir),
  [`os.tmpdir()`](https://nodejs.org/api/os.html#os_os_tmpdir)
  or the value of
  [`__dirname`](https://nodejs.org/api/globals.html#globals_dirname),
  [`process.argv`](https://nodejs.org/api/process.html#process_process_argv)
  and [`process.execPath`](https://nodejs.org/api/process.html#process_process_execpath).
- Unix paths are returned on Unix and Windows paths on Windows.
- exceptions:
  - using
    [`path.win32.*()`](https://nodejs.org/api/path.html#path_path_win32) or
    [`path.posix.*()`](https://nodejs.org/api/path.html#path_path_posix)
    instead of [`path.*()`](https://nodejs.org/api/path.html) will return
    Windows or Unix paths.
  - methods where the path is present both as argument and as return value
    depend on whether the input path is Windows-like or Unix-like. This
    includes
    [`fs.createReadStream()`](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)
    and
    [`fs.mkdtemp()`](https://nodejs.org/api/fs.html#fs_fs_mkdtemp_prefix_options_callback).

Outside of Node.js, i.e. when the path is input from (or output to) the terminal
or a file, its syntax is OS-specific.

To summarize:

- if a path must be output outside of Node.js (e.g. terminal or file),
  [`path.normalize()`](https://nodejs.org/api/path.html#path_path_normalize_path)
  should be used to make it OS-specific.
- if a path comes from outside of Node.js or from a core method, it will be
  OS-specific. However all Node.js core methods will properly handle it.
- in all other cases using Unix paths will just work.

<hr>

[**Next** _(📂 Filenames)_](filenames.md)<br>
[**Previous** _(📂 Directory locations)_](directory_locations.md)<br>
[**Top**](README.md)<br>
