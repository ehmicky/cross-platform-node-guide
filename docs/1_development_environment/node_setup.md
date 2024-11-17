# 🤖 Node setup

Installers for each major OS are available on the
[Node.js website](https://nodejs.org/en/download).

To install, switch and update Node.js versions
[`nvm`](https://github.com/creationix/nvm) can be used on Linux/Mac. It
[does not support Windows](https://github.com/creationix/nvm/issues/284) but
[`nvm-windows`](https://github.com/coreybutler/nvm-windows),
[`nvs`](https://github.com/jasongin/nvs) and
[`ps-nvm`](https://github.com/aaronpowell/ps-nvm) (for PowerShell) are
alternatives that do.

[`nve`](https://github.com/ehmicky/nve) can be used to run a single command with
one or several different Node.js versions.
[`nvexeca`](https://github.com/ehmicky/nvexeca) can be used to do the same
programmatically.

To upgrade `npm` on Windows, it is convenient to use
[`npm-windows-upgrade`](https://github.com/felixrieseberg/npm-windows-upgrade).

Windows users must first run
[`npm install -g windows-build-tools`](https://github.com/felixrieseberg/windows-build-tools)
as an admin before being able to install
[C/C++ addons](https://nodejs.org/api/addons.html).

<hr>

[**Next** _(🤖 Core utilities)_](core_utilities.md)\
[**Previous** _(🤖 Development environment)_](README.md)\
[**Top**](README.md)
