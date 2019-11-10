# 📂 Symlinks

## Junctions

Windows (but not Unix) can use
[junctions](https://docs.microsoft.com/en-us/windows/desktop/fileio/hard-links-and-junctions).
[`fs.symlink()`](https://nodejs.org/api/fs.html#fs_fs_symlink_target_path_type_callback)
allows creating these.

## Permissions

Creating regular symlinks on Windows will most likely fail because it requires a
["create symlink" permission](https://docs.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/create-symbolic-links)
which by default is off for non-admins. Also some file systems like
[FAT](https://en.wikipedia.org/wiki/File_Allocation_Table) do not allow
symlinks. As a consequence it is more cross-platform to copy files instead of
symlinking them.

Neither junctions nor hard links
([`fs.link()`](https://nodejs.org/api/fs.html#fs_fs_link_existingpath_newpath_callback))
require permissions on Windows.

## Summary

Copy files instead of symlinking them.

<hr>

[**Next** _(📂 File metadata)_](file_metadata.md)\
[**Previous** _(📂 Filenames)_](filenames.md)\
[**Top**](README.md)
