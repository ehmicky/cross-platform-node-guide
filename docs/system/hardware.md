# Hardware

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
be used for more information.

<hr>

[🡲 **Next** _(System > Time)_](time.md)<br>
[🡰 **Previous** _(System > System configuration)_](system_configuration.md)<br>
[🡱 **Top** _(System)_](README.md)<br>
