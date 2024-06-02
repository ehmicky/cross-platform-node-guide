# 📂 File paths

## Path delimiters

While `/` is used as a file path delimiter on Unix (`/file/to/path`), `\` is
used on Windows instead (`\file\to\path`).

The path delimiter can be retrieved with
[`path.sep`](https://nodejs.org/api/path.html#path_path_sep).

Windows actually allows using or mixing in `/` delimiters in file paths
sometimes, but not always so this should not be relied on.

## Absolute paths

Absolute paths always start with `/` on Unix, but on Windows they can take
[many shapes](https://docs.microsoft.com/en-us/windows/desktop/fileio/naming-a-file):

- `\`: the current drive.
- `C:\`: a specific drive (here `C:`). This can also be used with relative paths
  like `C:file\to\path`.
- `\\HOST\`: UNC path, for remote hosts.
- `\\?\`: allows to overcome file path length limit of 260 characters. Those can
  be produced in Node.js with
  [`path.toNamespacedPath()`](https://nodejs.org/api/path.html#path_path_tonamespacedpath_path).
- `\\.\`: device path.

## Node.js behavior

### In arguments

When file paths are used as arguments to Node.js core methods:

- only Unix paths are allowed on Unix.
- both Unix and Windows paths are allowed on Windows (including mixed).

This includes arguments to
[`require(path)`](https://nodejs.org/api/modules.html#modules_require_id),
[`import(path)`](https://nodejs.org/api/esm.html#esm_import_expressions),
[`import from "path"`](https://nodejs.org/api/esm.html#esm_import_statements),
[`fs.*(path)`](https://nodejs.org/api/fs.html) methods,
[`path.*()`](https://nodejs.org/api/path.html) methods or
[`process.chdir(path)`](https://nodejs.org/api/process.html#process_process_chdir_directory).

### In return values

When file paths are returned by Node.js core methods:

- Unix paths are returned on Unix.
- Windows paths are returned on Windows.

This includes the return values of
[`path.*()`](https://nodejs.org/api/path.html) methods,
[`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd),
[`os.homedir()`](https://nodejs.org/api/os.html#os_os_homedir),
[`os.tmpdir()`](https://nodejs.org/api/os.html#os_os_tmpdir),
[`os.devNull()`](https://nodejs.org/api/all.html#os_os_devnull) or the value of
[`__dirname`](https://nodejs.org/api/globals.html#globals_dirname),
[`process.argv`](https://nodejs.org/api/process.html#process_process_argv) and
[`process.execPath`](https://nodejs.org/api/process.html#process_process_execpath).

Exceptions:

- using [`path.win32.*()`](https://nodejs.org/api/path.html#path_path_win32) or
  [`path.posix.*()`](https://nodejs.org/api/path.html#path_path_posix) instead
  of [`path.*()`](https://nodejs.org/api/path.html) will return Windows or Unix
  paths.
- methods where the path is present both as argument and as return value depend
  on whether the input path is Windows-like or Unix-like. This includes
  [`fs.createReadStream()`](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)
  and
  [`fs.mkdtemp()`](https://nodejs.org/api/fs.html#fs_fs_mkdtemp_prefix_options_callback).

### In a terminal or file

Outside of Node.js, i.e. when the path is input from (or output to) the terminal
or a file, its syntax is OS-specific.

### Conclusion

- if a path must be output outside of Node.js (e.g. terminal or file),
  [`path.normalize()`](https://nodejs.org/api/path.html#path_path_normalize_path)
  should be used to make it OS-specific.
- if a path comes from outside of Node.js or from a core method, it will be
  OS-specific. However all Node.js core methods will properly handle it.
- in all other cases using Unix paths will just work.

## import.meta.url

ES modules require using
[`import.meta.url`](https://nodejs.org/api/esm.html#esm_import_meta_url),
[`import.meta.filename`](https://nodejs.org/api/esm.html#importmetafilename) and
[`import.meta.dirname`](https://nodejs.org/api/esm.html#importmetadirname)
instead of [`__filename`](https://nodejs.org/api/modules.html#modules_filename)
and [`__dirname`](https://nodejs.org/api/modules.html#modules_dirname).

`import.meta.url` is a `file:///...` URL. For backward compatibility, you
should:

- If possible, use the `file:///...` URL without converting it to a file path.
  Most Node.js core methods (
  [including all the `fs` methods](https://nodejs.org/api/fs.html#fs_file_url_paths))
  support those URLs.
- If using Node.js `>= 21.2.0`, use
  [`import.meta.filename`](https://nodejs.org/api/esm.html#importmetafilename)
  and
  [`import.meta.dirname`](https://nodejs.org/api/esm.html#importmetadirname).
- Otherwise, convert the URL using
  [`url.fileURLToPath()`](https://nodejs.org/api/url.html#url_url_fileurltopath_url),
  as opposed to using
  [`URL.pathname`](https://nodejs.org/api/url.html#url_url_pathname). This will
  ensure the file path is valid on Windows.

## Summary

Use
[`path.normalize()`](https://nodejs.org/api/path.html#path_path_normalize_path)
when writing a file path to a terminal or file. Otherwise use Unix paths
(slashes).

Use
[`url.fileURLToPath()`](https://nodejs.org/api/url.html#url_url_fileurltopath_url)
with [`import.meta.url`](https://nodejs.org/api/esm.html#esm_import_meta_url).

<hr>

[**Next** _(📂 Filenames)_](filenames.md)\
[**Previous** _(📂 Directory locations)_](directory_locations.md)\
[**Top**](README.md)
