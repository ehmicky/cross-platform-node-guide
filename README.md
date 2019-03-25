<img src="https://raw.githubusercontent.com/ehmicky/design/master/portable-node-guide/portable-node-guide.png" width="550"/>

[![License](https://img.shields.io/badge/license-CC%20BY--SA%204.0-4cc61e.svg?logo=github&logoColor=white)](https://creativecommons.org/licenses/by-sa/4.0/) [![Gitter](https://img.shields.io/gitter/room/ehmicky/portable-node-guide.svg?logo=gitter)](https://gitter.im/ehmicky/portable-node-guide)

Practical guide on how to write portable/cross-platform Node.js code.

# Why you should care

According to the
[2018 Node.js user survey](https://nodejs.org/en/user-survey-report/#Primary-OS-Distro)
(using the
[raw data](https://nodejs.org/en/user-survey-report/2018-nodejs-user-survey-raw-data.xlsx)),
24% of Node.js developers use Windows locally and 41% use Mac. In production
85% use Linux and 1% use BSD.

# About this guide

If you find this document too long, you can jump to the [summary](#summary).

If you want to keep up to date on portability issues introduced with each new
Node.js release, follow
[@ehmicky on Twitter](https://twitter.com/intent/follow?screen_name=ehmicky).

Did you find an error or want to add more information?
[Issues and PRs are welcome!](#contributing)

# Table of contents

- [Installing and updating Node](#installing-and-updating-node)
- [Core utilities](#core-utilities)
- [Testing](#testing)
- [C/C++ addons](#cc-addons)
- [Directory locations](#directory-locations)
- [System configuration](#system-configuration)
- [Character encoding](#character-encoding)
- [Newlines](#newlines)
- [EOF and BOM](#eof-and-bom)
- [File paths](#file-paths)
- [Filenames](#filenames)
- [Shell](#shell)
- [Files execution](#files-execution)
- [Package binaries](#package-binaries)
- [Environment variables](#environment-variables)
- [Symlinks](#symlinks)
- [File metadata](#file-metadata)
- [Permissions](#permissions)
- [Users](#users)
- [Time resolution](#time-resolution)
- [OS identification](#os-identification)
- [Device information](#device-information)
- [Networking](#networking)
- [Processes](#processes)
- [Signals](#signals)
- [Errors](#errors)
- [Anti-virus](#anti-virus)
- [Summary](#summary)
- [See also](#see-also)
- [Support](#support)
- [Contributing](#contributing)

# Installing and updating Node

Installers for each major OS are available on the
[Node.js website](https://nodejs.org/en/download/).

To install, switch and update Node.js versions
[`nvm`](https://github.com/creationix/nvm) can be used on Linux/Mac. It
[does not support Windows](https://github.com/creationix/nvm/issues/284)
but [`nvm-windows`](https://github.com/coreybutler/nvm-windows) and
[`nvs`](https://github.com/jasongin/nvs) are alternatives that do.

To upgrade `npm` on Windows, it is convenient to use
[`npm-windows-upgrade`](https://github.com/felixrieseberg/npm-windows-upgrade).

# Core utilities

Each OS has its own set of (from the lowest to the highest level):

- [system calls](https://en.wikipedia.org/wiki/System_call) like
  [`fork`](http://man7.org/linux/man-pages/man2/fork.2.html).
- [core utilities](https://www.gnu.org/software/coreutils/) like
  [`sed`](https://www.gnu.org/software/sed/manual/sed.html).
- common user applications like [`vim`](https://www.vim.org/) or
  [`Notepad`](https://en.wikipedia.org/wiki/Microsoft_Notepad).

Directly executing one of those binaries (e.g. calling `sed`) won't usually
work on every OS.

There are several approaches to solve this:

- Most Node.js API core modules abstract this (mostly through
  [libuv](http://libuv.org)). E.g. the
  [`child_process`](https://nodejs.org/api/child_process.html) methods are
  executing OS-specific system calls under the hood.
- some projects abstract OS-specific core utilities like:
  - [`MinGW`](http://www.mingw.org/) for
    [gcc](https://www.gnu.org/software/gcc/) on Windows.
  - [`msys`](http://www.mingw.org/wiki/msys) for
    [Bash](https://www.gnu.org/software/bash/) on Windows.
    Shipped with [Git for Windows](https://gitforwindows.org/).
  - [`shelljs`](https://github.com/shelljs/shelljs)
  - [`node-windows`](https://github.com/coreybutler/node-windows)
- some projects abstract common user applications:
  - [`opn`](https://github.com/sindresorhus/opn) for opening files.
  - [`clipboard-cli`](https://github.com/sindresorhus/clipboard-cli) for
    copy/pasting.

Few lower-level tools attempt to bring cross-platform compatibility by
emulating or translating system calls:

- [Wine](https://www.winehq.org/): to run Windows API calls on Linux, Mac, BSD
  and Solaris.
- [Cygwin](https://www.cygwin.com/): to run POSIX on Windows.
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10):
  to run the Linux command line on Windows
  ([ELF binary execution](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format),
  system calls, filesystem, [Bash](https://www.gnu.org/software/bash/),
  core utilities, common applications).

# Testing

Any OS can be run locally using
[virtual machines](https://en.wikipedia.org/wiki/Virtual_machine).
Windows provides with
[official images](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines).

It is recommended to run automated tests on a
[continuous integration](https://en.wikipedia.org/wiki/Continuous_integration)
provider that supports Linux, Mac and Windows, which most high-profile
providers now do.

# C/C++ addons

Windows users must first run
[`npm install -g windows-build-tools`](https://github.com/felixrieseberg/windows-build-tools)
as an admin before being able to install
[C/C++ addons](https://nodejs.org/api/addons.html).

# Directory locations

Typical directory locations are OS-specific:

- the main temporary directory could for example be `/tmp` on Linux,
  `/var/folders/.../T` on Mac or `C:\Users\USER\AppData\Local\Temp` on
  Windows. [`os.tmpdir()`](https://nodejs.org/api/os.html#os_os_tmpdir) can be
  used to retrieve it on any OS.
- the user's home directory could for example be `/home/USER` on Linux,
  `/Users/USER` on Mac or `C:\Users\USER` on Windows.
  [`os.homedir()`](https://nodejs.org/api/os.html#os_os_homedir) can be used
  to retrieve it on any OS. Application-specific settings are stored into
  [subdirectories on Windows](<https://msdn.microsoft.com/en-us/library/windows/desktop/bb776892(v=vs.85).aspx>):
  `Roaming` (`APPDATA` environment variable) and `Local` (`LOCALAPPDATA`
  environment variable).

[Man pages](https://www.kernel.org/doc/man-pages/) are Unix-specific so the
[`package.json`'s `man` field](https://docs.npmjs.com/files/package.json#man)
does not have any effects on Windows.

# System configuration

While Unix usually stores system configuration as files, Windows uses the
[registry](https://docs.microsoft.com/en-us/windows/desktop/sysinfo/registry),
a central key-value database. Some projects like
[node-winreg](https://github.com/fresc81/node-winreg),
[rage-edit](https://github.com/MikeKovarik/rage-edit) or
[windows-registry-node](https://github.com/CatalystCode/windows-registry-node)
can be used to access it from Node.

This should only be done when accessing OS-specific settings. Otherwise storing
configuration as files or remotely is easier and more portable.

# Character encoding

The [character encoding](https://en.wikipedia.org/wiki/Character_encoding) on
Unix is usually [UTF-8](https://en.wikipedia.org/wiki/UTF-8). However on Windows
it can also be [UTF-16](https://en.wikipedia.org/wiki/UTF-16) or one of
the [Windows code pages](https://en.wikipedia.org/wiki/Windows_code_page).
Few non-[Unicode](https://unicode.org/) character encodings are also popular in
some countries. This can result in characters not being printed properly,
especially high
[Unicode code points](https://en.wikipedia.org/wiki/Unicode#Code_point_planes_and_blocks) and
[emoji](https://en.wikipedia.org/wiki/Emoji).

The character encoding can be specified using an `encoding` option with most
[relevant Node.js core methods](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback).
[UTF-8](https://en.wikipedia.org/wiki/UTF-8) is always the default value except
for
[readable streams](https://nodejs.org/api/stream.html#stream_readable_streams)
(including
[`fs.createReadStream()`](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)),
[`fs.readFile()`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) and
most [`crypto`](https://nodejs.org/api/crypto.html) methods where `buffer` is
the default instead.

To convert between character encodings
[`string_encoder`](https://nodejs.org/api/string_decoder.html) (decoding only),
[`Buffer.transcode()`](https://nodejs.org/api/buffer.html#buffer_buffer_transcode_source_fromenc_toenc),
[`TextDecoder`](https://nodejs.org/api/util.html#util_class_util_textdecoder)
and
[`TextEncoder`](https://nodejs.org/api/util.html#util_class_util_textencoder)
can be used.

Node.js
[supports](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings)
[UTF-8](https://en.wikipedia.org/wiki/UTF-8),
[UTF-16 little endian](https://en.wikipedia.org/wiki/UTF-16),
[Latin-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1) and
[ASCII](https://en.wikipedia.org/wiki/ASCII), except for
[`TextDecoder`](https://nodejs.org/api/util.html#util_class_util_textdecoder)
and
[`TextEncoder`](https://nodejs.org/api/util.html#util_class_util_textencoder)
which support
[UTF-8](https://en.wikipedia.org/wiki/UTF-8),
[UTF-16 little endian](https://en.wikipedia.org/wiki/UTF-16) and
[UTF-16 big endian](https://en.wikipedia.org/wiki/UTF-16) by default. If
Node.js is built with
[full internationalization support](https://nodejs.org/api/intl.html#intl_internationalization_support)
or provided with it at runtime,
[many more character encodings](https://nodejs.org/api/util.html#util_encodings_requiring_full_icu_data)
are supported by
[`TextDecoder`](https://nodejs.org/api/util.html#util_class_util_textdecoder)
and
[`TextEncoder`](https://nodejs.org/api/util.html#util_class_util_textencoder).
If doing so is inconvenient,
[iconv-lite](https://github.com/ashtuchkin/iconv-lite) or
[iconv](https://github.com/bnoordhuis/node-iconv) can be used instead.

It is recommended to always use [UTF-8](https://en.wikipedia.org/wiki/UTF-8).
When reading from a file or terminal, one should either:

- detect the character encoding using
  [`node-chardet`](https://github.com/runk/node-chardet) or
  [`jschardet`](https://github.com/aadsm/jschardet) and convert to
  [UTF-8](https://en.wikipedia.org/wiki/UTF-8).
- validate and/or document that the input should be in
  [UTF-8](https://en.wikipedia.org/wiki/UTF-8).

When writing to a terminal the character encoding will almost always be
[UTF-8](https://en.wikipedia.org/wiki/UTF-8) on Unix and
[CP866](https://en.wikipedia.org/wiki/Code_page_866) on Windows (`cmd.exe`).
[figures](https://github.com/sindresorhus/figures) and
[log-symbols](https://github.com/sindresorhus/log-symbols) can be used to
print common symbols consistently across platforms.

# Newlines

The character representation of a
[newline](https://en.wikipedia.org/wiki/Newline) is OS-specific. On Unix it
is `\n` (line feed) while on Windows it is `\r\n` (carriage return followed by
line feed).

Newlines inside a template string translate to `\n` on any OS.

```js
const string = `this is
an example`
```

Some Windows applications, including the `cmd.exe` terminal, print `\n` as
newlines, so using `\n` will work just fine. However some Windows applications
don't, which is why when reading from or writing to a file the OS-specific
newline [`os.EOL`](https://nodejs.org/api/os.html#os_os_eol) should be used
instead of `\n`.

# EOF and BOM

The [substitute character](https://en.wikipedia.org/wiki/Substitute_character)
(`CTRL-Z`)
[stops file streams](https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/read?view=vs-2017#remarks)
on some Windows commands when in text mode. This includes the
[`type` command](https://ss64.com/nt/type.html) in `cmd.exe`. As a consequence
that character should be avoided in non-binary files.

As opposed to Windows, Unix does not implicitely add a newline at the end of
files. Thus it is recommended to end files with a
[newline character](#newlines). However please remember that Windows will print
these as if two newlines were present instead.

The [BOM](https://en.wikipedia.org/wiki/Byte_order_mark) is a special character
at the beginning of a file indicating its
[endianness](https://en.wikipedia.org/wiki/Endianness) and
[character encoding](https://en.wikipedia.org/wiki/Character_encoding). Since
it creates issues with
[shebangs](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) and adds little
value to [UTF-8](https://en.wikipedia.org/wiki/UTF-8), it is better not to add
it to new files. However if a BOM is present in input, it should be properly
handled. Fortunately this is the default behavior of Node.js core methods, so
this should usually not create any issues.

Character encoding, newlines and EOF behavior should be specified with
[editorconfig](https://editorconfig.org/). They can also be enforced with tools
like [ESLint](https://eslint.org/docs/rules/eol-last) and
[Prettier](https://github.com/prettier/prettier).

# File paths

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

# Filenames

Each OS tends to use its own
[file system](https://en.wikipedia.org/wiki/File_system):
Windows uses [NTFS](https://en.wikipedia.org/wiki/NTFS), Mac
uses [APFS](https://en.wikipedia.org/wiki/Apple_File_System)
(previously [HFS+](https://en.wikipedia.org/wiki/HFS_Plus)) and
Linux tends to use [ext4](https://en.wikipedia.org/wiki/Ext4),
[Btrfs](https://en.wikipedia.org/wiki/Btrfs) or
[XFS](https://en.wikipedia.org/wiki/XFS). Each file system has its
[own restrictions](https://en.wikipedia.org/wiki/Comparison_of_file_systems#Limits)
when it comes to naming files and paths.

Portable filenames need to avoid:

- any other characters but `a-z`, `0-9`, `-._,=()~`
- starting with `-`
- ending with a `.`
- uppercase characters (Mac and Windows are case-insensitive).
- being more than 255 characters long.
- being one of
  [those names](https://docs.microsoft.com/en-us/windows/desktop/fileio/naming-a-file#naming-conventions):
  `com1`, `com2`, `com3`, `com4`, `com5`, `com6`, `com7`,
  `com8`, `com9`, `lpt1`, `lpt2`, `lpt3`, `lpt4`, `lpt5`,
  `lpt6`, `lpt7`, `lpt8`, `lpt9`, `con`, `nul`, `prn`, `aux`.

Portable file paths need to avoid:

- being
  [more than 260
  characters long](https://docs.microsoft.com/en-us/windows/desktop/fileio/naming-a-file#maximum-path-length-limitation).
  This used to
  [create issues](https://github.com/nodejs/node-v0.x-archive/issues/6960)
  with `npm` deeply nesting `node_modules` but not anymore with the latest
  `npm` versions.
- use the `~` or `~user`
  [home directory shorthand](https://en.wikipedia.org/wiki/Home_directory#Unix).

# Shell

Unix usually comes with [Bash](https://www.gnu.org/software/bash/) but not
always. Popular alternatives include [Fish](https://fishshell.com/),
[Dash](http://man7.org/linux/man-pages/man1/dash.1.html),
[tcsh](https://linux.die.net/man/1/tcsh), [ksh](http://www.kornshell.com/) and
[zsh](http://www.zsh.org/).

Writing interoperable shell code can be somewhat achieved by using either:

- [sh](https://en.wikipedia.org/wiki/Bourne_shell) the ancestor of most of
  those shells.
- projects like [modernish](https://github.com/modernish/modernish).

However this won't work on Windows which uses two other shells:

- [`cmd.exe`](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/cmd)
  which comes by default.
- [Powershell](https://docs.microsoft.com/en-us/powershell/scripting/overview)
  which is more recent, featureful and complex.

`cmd.exe` is very different from Bash and has quite many limitations:

- `;` cannot be used to separate statements. However `&&` can be used like
  in Bash.
- CLI flags often use slashes (`/opt`) instead of dashes (`-opt`). But
  Node.js binaries can still use `-opt`.
- Globbing (e.g. wildcard `*`) does not work.
- [Exit code](https://en.wikipedia.org/wiki/Exit_status) are accessed with
  `%errorlevel%` instead of `$?`.
- [Escaping](https://ss64.com/nt/syntax-esc.html) is done differently with
  double quotes and `^`. This is partially solved with the
  [`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
  option `windowsVerbatimArguments` which defaults to `true` when `cmd.exe` is
  used.

When the option `shell` of
[`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
is `true`, `/bin/sh` will be used on Unix and `cmd.exe` (or the environment
variable `ComSpec`) will be used on Windows. Since those shells behave
differently it is better to avoid that option.

As a consequence it is recommended to:

- keep shell commands to simple `command arguments...` calls
- use [`execa()`](https://github.com/sindresorhus/execa) (not `execa.shell()`)
  to fire those.

# Files execution

[Shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) like `#!/usr/bin/node`
do not work on Windows, where only files ending with `.exe`, `.com`, `.cmd`
or `.bat` can be directly executed. Portable file execution must either:

- use an interpreter, e.g. `node file.js` instead of `./file.js`.
- use [`cross-spawn`](https://github.com/moxystudio/node-cross-spawn)
  (which is included in [`execa`](https://github.com/sindresorhus/execa)).

During file execution the extension can be omitted on Windows if it is listed
in the [`PATHEXT`](http://environmentvariables.org/PathExt) environment
variable, which defaults to
`.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC`. This won't work on
Unix.

The [`PATH`](<https://en.wikipedia.org/wiki/PATH_(variable)>) environment
variable uses `;` instead of `:` as delimiter on Windows. This can be retrieved
with
[`path.delimiter`](https://nodejs.org/api/path.html#path_path_delimiter).

When the option
[`detached: false`](https://nodejs.org/api/child_process.html#child_process_options_detached)
of
[`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
is used, the child process will be terminated when its parent is on Windows, but not on Unix.

When the option
[`detached: true`](https://nodejs.org/api/child_process.html#child_process_options_detached)
is used instead, a new terminal window will appear on Windows unless the option
[`windowsHide: true`](https://nodejs.org/api/child_process.html#child_process_options_detached)
is used (requires Node `>= 8.8.0`).

Finally the option
[`argv0`](https://nodejs.org/api/child_process.html#child_process_options_detached)
does not modify `process.title` on Windows.

Many of those differences can be solved by using
[`execa`](https://github.com/sindresorhus/execa).

# Package binaries

Package binaries
([`package.json`'s `bin` field](https://docs.npmjs.com/files/package.json#bin))
are installed in the `node_modules/.bin` directory by `npm install`.

On Unix those are symlinks pointing to the executable files. They can be
executed directly inside a terminal.

On Windows, each package binary
[creates instead two files](https://github.com/npm/cmd-shim) for the same
purpose:

- a Windows batch file ending with `.cmd` which can be executed directly
  inside `cmd.exe`.
- a Unix shell file with no file extension which can be executed with `sh` or
  `bash`.

# Environment variables

The syntax to
[reference environment variables](https://ss64.com/nt/syntax-variables.html) is
`$VARIABLE` on Unix but `%VARIABLE%` on Windows. Also if the variable is
missing, its value will be `''` on Unix but `'%VARIABLE%'` on Windows.

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

- `SHELL` on Unix is `ComSpec` on Windows. Unfortunately
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

# Symlinks

Windows (but not Unix) can use
[junctions](https://docs.microsoft.com/en-us/windows/desktop/fileio/hard-links-and-junctions).
[`fs.symlink()`](https://nodejs.org/api/fs.html#fs_fs_symlink_target_path_type_callback)
allows creating these.

Creating regular symlinks on Windows will most likely fail because it requires a
["create symlink" permission](https://docs.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/create-symbolic-links)
which by default is off for non-admins. Also some file systems like
[FAT](https://en.wikipedia.org/wiki/File_Allocation_Table) do not allow
symlinks. As a consequence it is more portable to copy files instead of
symlinking them.

Neither junctions nor hard links
([`fs.link()`](https://nodejs.org/api/fs.html#fs_fs_link_existingpath_newpath_callback))
require permissions on Windows.

# File metadata

The [`blksize`](https://nodejs.org/api/fs.html#fs_stats_blksize) and
[`blocks`](https://nodejs.org/api/fs.html#fs_stats_blocks) values of
[`fs.stat()`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback)
are `undefined` on Windows. On the other hand the
[`birthtime`](https://nodejs.org/api/fs.html#fs_stats_birthtime) and
[`birthtimeMs`](https://nodejs.org/api/fs.html#fs_stats_birthtimems) do not
properly work on Linux as they always reflect the
[`ctime`](https://nodejs.org/api/fs.html#fs_stat_time_values) field instead.

The [`O_NOATIME`](https://nodejs.org/api/fs.html#fs_file_open_constants) flag
of
[`fs.open()`](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)
only works on Linux.

[`fs.watch()`](https://nodejs.org/api/fs.html#fs_caveats) is not very portable.
For example the option `recursive` does not work on Linux.
[`chokidar`](https://github.com/paulmillr/chokidar) can be used instead.

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

Finally
[`fs.lchmod()`](https://nodejs.org/api/fs.html#fs_fs_lchmod_path_mode_callback)
is only available on Mac.

# Users

Unix users are identified with a
[`UID`](https://en.wikipedia.org/wiki/User_identifier) and a
[`GID`](https://en.wikipedia.org/wiki/Group_identifier) while Windows users
are identified with a
[`SID`](https://en.wikipedia.org/wiki/Security_Identifier).

Consequently all methods based on
[`UID`](https://en.wikipedia.org/wiki/User_identifier) or
[`GID`](https://en.wikipedia.org/wiki/Group_identifier) fail on Windows:

- [`os.userInfo().uid|gid`](https://nodejs.org/api/os.html#os_os_userinfo_options) return `-1`.
- [`fs.stat()`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback)'s
  [`uid`](https://nodejs.org/api/fs.html#fs_stats_uid) and
  [`gid`](https://nodejs.org/api/fs.html#fs_stats_gid) return `0`.
- The `process` methods [`getuid()`](https://nodejs.org/api/process.html#process_process_getuid),
  [`geteuid()`](https://nodejs.org/api/process.html#process_process_geteuid),
  [`getgid()`](https://nodejs.org/api/process.html#process_process_getgid),
  [`getegid()`](https://nodejs.org/api/process.html#process_process_getegid),
  [`setuid()`](https://nodejs.org/api/process.html#process_process_setuid_id),
  [`seteuid()`](https://nodejs.org/api/process.html#process_process_seteuid_id),
  [`setgid()`](https://nodejs.org/api/process.html#process_process_setgid_id),
  [`setegid()`](https://nodejs.org/api/process.html#process_process_setegid_id),
  [`getgroups()`](https://nodejs.org/api/process.html#process_process_getgroups),
  [`setgroups()`](https://nodejs.org/api/process.html#process_process_setgroups_groups) and
  [`initgroups()`](https://nodejs.org/api/process.html#process_process_initgroups_user_extragroup)
  throw an error.
- [`fs.chown()`](https://nodejs.org/api/fs.html#fs_fs_chown_path_uid_gid_callback)
  does not do anything.

The privileged user is `root` on Unix and `admin` on Windows. Those are
triggered with different mechanisms. One can use
[`is-elevated`](https://github.com/sindresorhus/is-elevated) (and the related
[`is-admin`](https://github.com/sindresorhus/is-admin) and
[`is-root`](https://github.com/sindresorhus/is-root)) to check it on any OS.

# Time resolution

The resolution of
[`process.hrtime()`](https://nodejs.org/api/process.html#process_process_hrtime_time)
is hardware-specific and varies between 1 nanosecond and 1 millisecond.

# OS identification

The main way to identify the current OS is to use
[`process.platform`](https://nodejs.org/api/process.html#process_process_platform)
(or the identical
[`os.platform()`](https://nodejs.org/api/os.html#os_os_platform)).

The [`os`](https://nodejs.org/api/os.html) core module offers some
finer-grained identification methods but those are rarely needed:

- [`os.type()`](https://nodejs.org/api/os.html#os_os_type) is similar but
  slighly more precise.
- [`os.release()`](https://nodejs.org/api/os.html#os_os_release) returns the
  OS version number, e.g. `3.11.0-14-generic` (Linux), `18.0.0` (Mac) or
  `10.0.17763` (Windows).
- [`os.arch()`](https://nodejs.org/api/os.html#os_os_arch) (or the identical
  [`process.arch`](https://nodejs.org/api/process.html#process_process_arch))
  returns the CPU architecture, e.g. `arm` or `x64`.
- [`os.endianness()`](https://nodejs.org/api/os.html#os_os_endianness)
  returns the CPU endianness, i.e. `BE` or `LE`.

Some projects allow retrieving:

- [`getos`](https://github.com/retrohacker/getos): the Linux distribution
  name.
- [`osname`](https://github.com/sindresorhus/os-name) (and the related
  [`windows-release`](https://github.com/sindresorhus/windows-release) and
  [`macos-release`](https://github.com/sindresorhus/macos-release)): the OS
  name and version in a human-friendly way.
- [`is-windows`](https://github.com/jonschlinkert/is-windows): whether current
  OS is Windows, including through [MSYS](http://www.mingw.org/wiki/msys) and
  [Cygwin](https://www.cygwin.com/).
- [`is-wsl`](https://github.com/sindresorhus/is-wsl): whether current OS is
  Windows though
  [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

# Device information

Uptime, memory and CPUs can be retrieved on any OS using
[`os.uptime()`](https://nodejs.org/api/os.html#os_os_uptime),
[`process.uptime()`](https://nodejs.org/api/process.html#process_process_uptime),
[`os.freemem()`](https://nodejs.org/api/os.html#os_os_freemem),
[`os.totalmem()`](https://nodejs.org/api/os.html#os_os_totalmem),
[`process.memoryUsage()`](https://nodejs.org/api/process.html#process_process_memoryusage),
[`os.cpus()`](https://nodejs.org/api/os.html#os_os_cpus) and
[`process.cpuUsage()`](https://nodejs.org/api/process.html#process_process_cpuusage_previousvalue).

However:

- [`os.cpus()`](https://nodejs.org/api/os.html#os_os_cpus)'s `times.nice` is
  `0` on Windows.
- [`os.loadavg()`](https://nodejs.org/api/os.html#os_os_loadavg) is an array
  of `0` on Windows.

[`systeminformation`](https://github.com/sebhildebrandt/systeminformation) can
be used for more device information.

# Networking

[`os.networkInterfaces()`](https://nodejs.org/api/os.html#os_os_networkinterfaces)
and [`os.hostname()`](https://nodejs.org/api/os.html#os_os_networkinterfaces)
work on any OS.

However on Windows:

- sockets / named pipes must be prefixed with `\\.\pipe\`
- TCP servers cannot
  [`listen()`](https://nodejs.org/api/net.html#net_server_listen_handle_backlog_callback)
  on a file descriptor.
- [`cluster.schedulingPolicy`](https://nodejs.org/api/cluster.html#cluster_cluster_schedulingpolicy)
  `SCHED_RR` is inefficient, so the default value is `SCHED_NONE`.

# Processes

[`process.pid`](https://nodejs.org/api/process.html#process_process_pid),
[`process.ppid`](https://nodejs.org/api/process.html#process_process_ppid),
[`process.title`](https://nodejs.org/api/process.html#process_process_title),
[`os.getPriority()`](https://nodejs.org/api/os.html#os_os_getpriority_pid) and
[`os.setPriority()`](https://nodejs.org/api/os.html#os_os_setpriority_pid_priority)
work on any OS.

Other projects can be used to manipulate processes:

- [`ps-list`](https://github.com/sindresorhus/ps-list) or
  [`ps-tree`](https://github.com/indexzero/ps-tree): list processes.
  [`tasklist`](https://github.com/sindresorhus/tasklist) and
  [`fastlist`](https://github.com/MarkTiedemann/fastlist) can also be used
  for Windows only.
- [`pid-from-port`](https://github.com/kevva/pid-from-port): find processes
  by port.
- [`process-exists`](https://github.com/sindresorhus/process-exists): check
  if a process is running.

# Signals

Windows do not use signals like Unix does.

However processes can be terminated using the
[`taskkill`](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill)
command. The [`taskkill`](https://github.com/sindresorhus/taskkill) project can
be used to do it from Node.js. [`fkill`](https://github.com/sindresorhus/fkill)
builds on it to terminate processes on any OS.

Which signals can be used is OS-specific:

- [`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
  and
  [`process.on(signal)`](https://nodejs.org/api/process.html#process_signal_events)
  can
  [only use the following signals on Windows](https://nodejs.org/api/process.html#process_signal_events):
  `SIGINT`, `SIGTERM`, `SIGKILL` and `0`.
- [`process.on(signal)`](https://nodejs.org/api/process.html#process_signal_events)
  (but not
  [`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal))
  can be used on Windows with:
  - `SIGABRT`
  - `SIGHUP`: closing `cmd.exe`
  - `SIGBREAK`: `CTRL-BREAK` on `cmd.exe`
  - `SIGWINCH`: resizing the terminal. This will only
    [be triggered](https://nodejs.org/api/process.html#process_signal_events)
    on Windows when the cursor moves on when a terminal in raw mode is used.
  - `SIGILL`, `SIGFPE` and `SIGSEGV` but listening to those signals is
    [not recommended](https://nodejs.org/api/process.html#process_signal_events)
- `SIGPOLL`, `SIGPWR` and `SIGUNUSED` can only be used on Linux.
- `SIGINFO` can only be used on Mac.

Each signal has both an OS-agnostic name and an OS-specific integer constant.
[`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
can use either. It is possible to convert between both using
[`os.constants.signals`](https://nodejs.org/api/os.html#os_signal_constants).
However it is more portable to use signal names instead of integer constants.

Using a negative argument with
[`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
to [target a process group ID](https://linux.die.net/man/2/kill) (as opposed to
a PID) does not work on Windows.

[`--diagnostic-report-on-signal`](https://nodejs.org/api/report.html#report_usage)
does not work on Windows.

# Errors

Node errors can be identified with either:

- [`error.code`](https://nodejs.org/api/errors.html#errors_error_code): an
  OS-agnostic string (more portable).
- [`error.errno`](https://nodejs.org/api/errors.html#errors_error_errno): an
  OS-specific integer constant.

It is possible to convert between both using
[`os.constants.errno`](https://nodejs.org/api/os.html#os_error_constants) and
[`util.getSystemErrorName`](https://nodejs.org/api/util.html#util_util_getsystemerrorname_err).

Most available `error.code`
[start with `E`](https://nodejs.org/api/os.html#os_posix_error_constants) and
can be fired on any OS. However few
[start with `W`](https://nodejs.org/api/os.html#os_windows_specific_error_constants)
and can only be fired on Windows.

# Anti-virus

Some anti-virus software on Windows
[have been reported](https://github.com/isaacs/node-graceful-fs/pull/97) to lock
directories and make `fs.rename()` fail.
[`graceful-fs`](https://github.com/isaacs/node-graceful-fs) or
[`rimraf`](https://github.com/isaacs/rimraf) solves this by retrying few
milliseconds later.

# Summary

- instead of [`nvm`](https://github.com/creationix/nvm) use
  [`nvm-windows`](https://github.com/coreybutler/nvm-windows) and
  [`npm-windows-upgrade`](https://github.com/felixrieseberg/npm-windows-upgrade)
  on Windows.
- do not rely on [OS system calls](https://en.wikipedia.org/wiki/System_call)
  or [core utilities](https://www.gnu.org/software/coreutils/) without using
  an abstraction layer.
- test each OS with
  [virtual machines](https://en.wikipedia.org/wiki/Virtual_machine) and
  [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration).
- run
  [`npm install -g windows-build-tools`](https://github.com/felixrieseberg/windows-build-tools)
  on Windows when installing [C/C++ addons](https://nodejs.org/api/addons.html).
- use [`os`](https://nodejs.org/api/os.html) Node.js core module when needed.
- use [`UTF-8`](https://en.wikipedia.org/wiki/UTF-8). File/terminal input
  should either be validated or converted to it
  ([`node-chardet`](https://github.com/runk/node-chardet)).
- avoid printing Unicode characters (including
  [emoji](https://en.wikipedia.org/wiki/Emoji)) except through projects like
  [figures](https://github.com/sindresorhus/figures) and
  [log-symbols](https://github.com/sindresorhus/log-symbols).
- use [`os.EOL`](https://nodejs.org/api/os.html#os_os_eol) when reading from or
  writing to a file, `\n` otherwise.
- end files with a newline.
- use [editorconfig](https://editorconfig.org/).
- avoid the
  [substitute character](https://en.wikipedia.org/wiki/Substitute_character)
  (`CTRL-Z`) in non-binary files.
- use
  [`path.normalize()`](https://nodejs.org/api/path.html#path_path_normalize_path)
  when writing a file path to a terminal or file. Otherwise use Unix paths
  (slashes).
- only use lowercase `a-z`, `0-9` and `-._,=()` in filenames.
- avoid paths longer than 260 characters.
- fire shell commands with [`execa`](https://github.com/sindresorhus/execa).
- keep shell commands to simple `command arguments...` calls, optionally
  chained with `&&`.
- reference and pass environment variables to shell commands using
  [`cross-env`](https://github.com/kentcdodds/cross-env).
- copy files instead of symlinking them.
- use [`chokidar`](https://github.com/paulmillr/chokidar) to watch files.
- avoid [`blksize`](https://nodejs.org/api/fs.html#fs_stats_blksize),
  [`blocks`](https://nodejs.org/api/fs.html#fs_stats_blocks),
  [`mode`](https://nodejs.org/api/fs.html#fs_stats_mode),
  [`uid`](https://nodejs.org/api/fs.html#fs_stats_uid),
  [`gid`](https://nodejs.org/api/fs.html#fs_stats_gid),
  [`birthtime`](https://nodejs.org/api/fs.html#fs_stats_birthtime) and
  [`birthtimeMs`](https://nodejs.org/api/fs.html#fs_stats_birthtimems) returned
  by
  [`fs.stat()`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback).
- avoid
  [`fs.chmod()`](https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback),
  [`fs.access()`](https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback)
  (except [`F_OK`](https://nodejs.org/api/fs.html#fs_file_access_constants)),
  [`fs.open()`](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)'s
  `mode`,
  [`fs.mkdir()`](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback)'s
  `options.mode` and
  [`process.umask()`](https://nodejs.org/api/process.html#process_process_umask_mask).
- avoid
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
- do not assume
  [`process.hrtime()`](https://nodejs.org/api/process.html#process_process_hrtime_time)
  is nanoseconds-precise.
- when using OS-specific logic identify the current OS with
  [`process.platform`](https://nodejs.org/api/process.html#process_process_platform).
- avoid [`os.cpus()`](https://nodejs.org/api/os.html#os_os_cpus) `times.nice` and
  [`os.loadavg()`](https://nodejs.org/api/os.html#os_os_loadavg).
- use [`systeminformation`](https://github.com/sebhildebrandt/systeminformation)
  to retrieve any device information not available through the
  [`os`](https://nodejs.org/api/os.html) core module.
- sockets / named pipes must be prefixed with `\\.\pipe\` on Windows.
- TCP servers should not
  [`listen()`](https://nodejs.org/api/net.html#net_server_listen_handle_backlog_callback)
  on a file descriptor.
- use [`ps-list`](https://github.com/sindresorhus/ps-list),
  [`pid-from-port`](https://github.com/kevva/pid-from-port) and
  [`process-exists`](https://github.com/sindresorhus/process-exists) to find
  and check for processes.
- use [`fkill`](https://github.com/sindresorhus/fkill) to terminate processes.
- only use
  [`process.kill()`](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
  with the following signals: `SIGINT`, `SIGTERM`, `SIGKILL` and `0`.
- only use
  [`process.on(signal)`](https://nodejs.org/api/process.html#process_signal_events)
  with the following signals: `SIGINT`, `SIGTERM`, `SIGKILL`, `0`, `SIGWINCH`,
  `SIGABRT`, `SIGHUP` and `SIGBREAK`.
- do not use
  [`--diagnostic-report-on-signal`](https://nodejs.org/api/report.html#report_usage)
- prefer [`error.code`](https://nodejs.org/api/errors.html#errors_error_code)
  over [`error.errno`](https://nodejs.org/api/errors.html#errors_error_errno).

# See also

- https://github.com/bcoe/awesome-cross-platform-nodejs
- https://github.com/Microsoft/nodejs-guidelines
- https://shapeshed.com/writing-cross-platform-node/

# Support

If you found an error or would like to add more information, _don't hesitate_ to
[submit an issue on GitHub](../../issues).

For other questions, feel free to
[chat with us on Gitter](https://gitter.im/ehmicky/portable-node-guide).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix an error or add more information, please check
our [guidelines](CONTRIBUTING.md). Pull requests are welcome!

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub>](https://twitter.com/ehmicky)<br />[💻](https://github.com/ehmicky/portable-node-guide/commits?author=ehmicky "Code") [🎨](#design-ehmicky "Design") [🤔](#ideas-ehmicky "Ideas, Planning, & Feedback") [📖](https://github.com/ehmicky/portable-node-guide/commits?author=ehmicky "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/1481643?v=4" width="100px;" alt="thatalextaylor"/><br /><sub><b>thatalextaylor</b></sub>](https://github.com/thatalextaylor)<br />[🤔](#ideas-thatalextaylor "Ideas, Planning, & Feedback") [📖](https://github.com/ehmicky/portable-node-guide/commits?author=thatalextaylor "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/275871?v=4" width="100px;" alt="Ben Noordhuis"/><br /><sub><b>Ben Noordhuis</b></sub>](https://github.com/bnoordhuis)<br />[🤔](#ideas-bnoordhuis "Ideas, Planning, & Feedback") [📖](https://github.com/ehmicky/portable-node-guide/commits?author=bnoordhuis "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/618922?v=4" width="100px;" alt="Steve Lee"/><br /><sub><b>Steve Lee</b></sub>](http://opendirective.com)<br />[🤔](#ideas-SteveALee "Ideas, Planning, & Feedback") [📖](https://github.com/ehmicky/portable-node-guide/commits?author=SteveALee "Documentation") [📢](#talk-SteveALee "Talks") | [<img src="https://avatars3.githubusercontent.com/u/444316?v=4" width="100px;" alt="Michael J. Ryan"/><br /><sub><b>Michael J. Ryan</b></sub>](http://tracker1.info/)<br />[🤔](#ideas-tracker1 "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/1812093?v=4" width="100px;" alt="Fabio Spampinato"/><br /><sub><b>Fabio Spampinato</b></sub>](http://twitter.com/fabiospampinato)<br />[📖](https://github.com/ehmicky/portable-node-guide/commits?author=fabiospampinato "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->
