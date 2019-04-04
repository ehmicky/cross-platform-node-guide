# 📂 Directory locations

Typical directory locations are OS-specific.

The main temporary directory:

- could for example be `/tmp` on Linux, `/var/folders/.../T` on Mac or
  `C:\Users\USER\AppData\Local\Temp` on Windows.
- [`os.tmpdir()`](https://nodejs.org/api/os.html#os_os_tmpdir) can be used to
  retrieve it on any OS.
- different terminal sessions on the same machine
  [might have different temporary directories](https://github.com/ehmicky/cross-platform-node-guide/pull/17#issuecomment-476209345)
  on Windows.

The user's home directory:

- could for example be `/home/USER` on Linux, `/Users/USER` on Mac or
  `C:\Users\USER` on Windows.
- [`os.homedir()`](https://nodejs.org/api/os.html#os_os_homedir) can be used
  to retrieve it on any OS.
- application-specific settings are stored into
  [subdirectories on Windows](<https://msdn.microsoft.com/en-us/library/windows/desktop/bb776892(v=vs.85).aspx>):
  `Roaming` (`APPDATA` environment variable) and `Local` (`LOCALAPPDATA`
  environment variable).

[Man pages](https://www.kernel.org/doc/man-pages/) are Unix-specific so the
[`package.json`'s `man` field](https://docs.npmjs.com/files/package.json#man)
does not have any effects on Windows.

<hr>

[→ **Next** _(📂 File paths)_](file_paths.md)<br>
[← **Previous** _(📂 Filesystem)_](README.md)<br>
[↑ **Top**](README.md)<br>
