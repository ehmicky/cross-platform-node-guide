# 📂 Filenames

## File systems

Each OS tends to use its own
[file system](https://en.wikipedia.org/wiki/File_system):

- Windows uses [NTFS](https://en.wikipedia.org/wiki/NTFS).
- Mac uses [APFS](https://en.wikipedia.org/wiki/Apple_File_System) (previously
  [HFS+](https://en.wikipedia.org/wiki/HFS_Plus)).
- Linux tends to use [ext4](https://en.wikipedia.org/wiki/Ext4),
  [Btrfs](https://en.wikipedia.org/wiki/Btrfs) or
  [XFS](https://en.wikipedia.org/wiki/XFS).

Each file system has its
[own restrictions](https://en.wikipedia.org/wiki/Comparison_of_file_systems#Limits)
when it comes to naming files and paths.

## Filenames constraints

Cross-platform filenames need to avoid:

- any other characters but `a-z`, `0-9`, `-._,=()`
- starting with `-`
- ending with a `.`
- [starting](https://support.microsoft.com/en-us/help/211632/description-of-how-word-creates-temporary-files)
  or
  [ending](https://vim.fandom.com/wiki/Remove_swap_and_backup_files_from_your_working_directory)
  [with `~`](https://en.wikipedia.org/wiki/Home_directory#Unix).
- uppercase characters (Mac and Windows are case-insensitive).
- being more than 255 characters long.
- being one of
  [those names](https://docs.microsoft.com/en-us/windows/desktop/fileio/naming-a-file#naming-conventions):
  `com1`, `com2`, `com3`, `com4`, `com5`, `com6`, `com7`, `com8`, `com9`,
  `lpt1`, `lpt2`, `lpt3`, `lpt4`, `lpt5`, `lpt6`, `lpt7`, `lpt8`, `lpt9`, `con`,
  `nul`, `prn`, `aux`.

## Paths contraints

Cross-platform file paths need to avoid being
[more than 260 characters long](https://docs.microsoft.com/en-us/windows/desktop/fileio/naming-a-file#maximum-path-length-limitation).

## Summary

Only use lowercase `a-z`, `0-9` and `-._,=()` in filenames.

Avoid paths longer than 260 characters.

<hr>

[**Next** _(📂 Symlinks)_](symlinks.md)<br>
[**Previous** _(📂 File paths)_](file_paths.md)<br> [**Top**](README.md)<br>
