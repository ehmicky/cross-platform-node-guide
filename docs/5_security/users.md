# 🔒 Users

## User identifier

Unix users are identified with a
[`UID`](https://en.wikipedia.org/wiki/User_identifier) and a
[`GID`](https://en.wikipedia.org/wiki/Group_identifier) while Windows users are
identified with a [`SID`](https://en.wikipedia.org/wiki/Security_Identifier).

Consequently all methods based on
[`UID`](https://en.wikipedia.org/wiki/User_identifier) or
[`GID`](https://en.wikipedia.org/wiki/Group_identifier) fail on Windows:

- [`os.userInfo().uid|gid`](https://nodejs.org/api/os.html#os_os_userinfo_options)
  return `-1`.
- [`fs.stat()`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback)'s
  [`uid`](https://nodejs.org/api/fs.html#fs_stats_uid) and
  [`gid`](https://nodejs.org/api/fs.html#fs_stats_gid) return `0`.
- The `process` methods
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
  [`initgroups()`](https://nodejs.org/api/process.html#process_process_initgroups_user_extragroup)
  throw an error.
- [`fs.chown()`](https://nodejs.org/api/fs.html#fs_fs_chown_path_uid_gid_callback)
  does not do anything.

## Privileged user

The privileged user is `root` on Unix and `Administrator` on Windows. Those are
triggered with different mechanisms.

One can use [`is-elevated`](https://github.com/sindresorhus/is-elevated) (and
the related [`is-admin`](https://github.com/sindresorhus/is-admin) and
[`is-root`](https://github.com/sindresorhus/is-root)) to check it on any OS.

## Summary

Do not rely on [`UID`](https://en.wikipedia.org/wiki/User_identifier) or
[`GID`](https://en.wikipedia.org/wiki/Group_identifier).

<hr>

[**Next** _(📡 Networking / IPC)_](../6_networking_ipc/README.md)<br>
[**Previous** _(🔒 Permissions)_](permissions.md)<br> [**Top**](README.md)<br>
