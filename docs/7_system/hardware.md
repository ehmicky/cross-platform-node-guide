# 🎛️ Hardware

Uptime, memory and CPUs can be retrieved on any OS using
[`os.uptime()`](https://nodejs.org/api/os.html#os_os_uptime),
[`process.uptime()`](https://nodejs.org/api/process.html#process_process_uptime),
[`os.freemem()`](https://nodejs.org/api/os.html#os_os_freemem),
[`os.totalmem()`](https://nodejs.org/api/os.html#os_os_totalmem),
[`process.memoryUsage()`](https://nodejs.org/api/process.html#process_process_memoryusage),
[`os.cpus()`](https://nodejs.org/api/os.html#os_os_cpus),
[`process.cpuUsage()`](https://nodejs.org/api/process.html#process_process_cpuusage_previousvalue).
and
[`process.resourceUsage()`](https://nodejs.org/api/all.html#process_process_resourceusage).

However the following fields are `0` on Windows:

- [`os.cpus()`](https://nodejs.org/api/os.html#os_os_cpus)'s `times.nice`
- [`os.loadavg()`](https://nodejs.org/api/os.html#os_os_loadavg)
- [`process.resourceUsage()`](https://nodejs.org/api/all.html#process_process_resourceusage)'s
  `voluntaryContextSwitches` and `involuntaryContextSwitches`

[`systeminformation`](https://github.com/sebhildebrandt/systeminformation) can
be used for more information.

<hr>

[**Next** _(🎛️ Time)_](time.md)\
[**Previous** _(🎛️ System configuration)_](system_configuration.md)\
[**Top**](README.md)
