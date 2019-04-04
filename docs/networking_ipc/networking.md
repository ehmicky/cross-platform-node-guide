# 📡 Networking

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

<hr>

[→ **Next** _(📡 Processes)_](processes.md)<br>
[← **Previous** _(📡 Networking / IPC)_](README.md)<br>
[↑ **Top**](README.md)<br>
