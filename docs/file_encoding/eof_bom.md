# 📝 EOF and BOM

The [substitute character](https://en.wikipedia.org/wiki/Substitute_character)
(`CTRL-Z`)
[stops file streams](https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/read?view=vs-2017#remarks)
on some Windows commands when in text mode. This includes the
[`type` command](https://ss64.com/nt/type.html) in `cmd.exe`. As a consequence
that character should be avoided in non-binary files.

As opposed to Windows, Unix
[requires text files](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_206)
to end with a
[newline character](#newlines). However please remember that Windows might print
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

<hr>

[→ **Next** _(📂 Filesystem)_](../filesystem/README.md)<br>
[← **Previous** _(📝 Newlines)_](newlines.md)<br>
[↑ **Top**](README.md)<br>
