# 📝 Character encoding

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
[CP437](https://en.wikipedia.org/wiki/Code_page_437) /
[CP850](https://en.wikipedia.org/wiki/Code_page_850) /
[Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) on Windows
(`cmd.exe`).
[figures](https://github.com/sindresorhus/figures) and
[log-symbols](https://github.com/sindresorhus/log-symbols) can be used to
print common symbols consistently across platforms.

<hr>

[🡲 **Next** _(📝 Newlines)_](newlines.md)<br>
[🡰 **Previous** _(📝 File encoding)_](README.md)<br>
[🡱 **Top**](README.md)<br>
