# ⚙️ System configuration

While Unix usually stores system configuration as files, Windows uses the
[registry](https://docs.microsoft.com/en-us/windows/desktop/sysinfo/registry),
a central key-value database. Some projects like
[node-winreg](https://github.com/fresc81/node-winreg),
[rage-edit](https://github.com/MikeKovarik/rage-edit) or
[windows-registry-node](https://github.com/CatalystCode/windows-registry-node)
can be used to access it from Node.

This should only be done when accessing OS-specific settings. Otherwise storing
configuration as files or remotely is easier and more cross-platform.

<hr>

[🡲 **Next** _(⚙️ Hardware)_](hardware.md)<br>
[🡰 **Previous** _(⚙️ OS identification)_](os_identification.md)<br>
[🡱 **Top**](README.md)<br>
