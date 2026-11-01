# arch 安装

https://archlinuxstudio.github.io/ArchLinuxTutorial/

## boot

https://wiki.archlinuxcn.org/wiki/Systemd-boot

https://www.cnblogs.com/Pingjiadoge/p/19130160

https://zhuanlan.zhihu.com/p/656680599

https://zhuanlan.zhihu.com/p/682419545

https://dev.to/je12emy/setting-up-dual-boot-with-windows-and-arch-linux-using-systemd-boot-2c24 windows

## 硬盘分区

Eg: 8g+128g

| 分区                 | 文件系统 | 大小 | 挂载点      | 说明                                                                   |
| -------------------- | -------- | ---- | ----------- | ---------------------------------------------------------------------- |
| **EFI 分区**         | FAT32    | 1G   | `/boot/efi` | 存放 UEFI 引导文件，必须为 FAT32 格式。旧电脑可能会不支持,使用传统引导 |
| **SWAP 分区**        | swap     | 10GB | `swap`      | 虚拟内存，内存溢出或休眠，一般为内存的1～2倍，支持休眠功能需不小于内存 |
| **根分区 `/`**       | ext4     | 40GB | `/`         | 存放系统文件，支持应用和软件安装。                                     |
| **用户数据 `/home`** | ext4     | 60GB | `/home`     | 存放用户数据和配置文件，适用于日常使用。                               |

## 更改时区

### 查看当前时间和时区设置

运行以下命令查看当前的时间和相关配置：

```bash
timedatectl
```

### NTP(Network Time Protocol)

同步时间的服务，常见的有 `chronyd` `systemd-timesyncd`，无特殊需求推荐systemd，

```bash
sudo systemctl disable --now chronyd
sudo dnf remove chrony
sudo systemctl enable --now systemd-timesyncd
sudo timedatectl set-ntp true
```

代理会导致 chronyd/systemd-timesyncd 同步异常（udp问题）， 需在规则中放行直连（udp+port123）

也可以使用singbox内置的ntp服务

```toml
# /etc/systemd/timesyncd.conf
[Time]
NTP=2.arch.pool.ntp.org 3.arch.pool.ntp.org
FallbackNTP=127.0.0.1
```

详细请参考

- [ singbox ntp ](https://sing-box.sagernet.org/zh/configuration/ntp/)
- [ systemd-timesyncd man page ](https://man.archlinux.org/man/timesyncd.conf.5)

### 设置系统时区

如果需要更改系统时区，可以使用以下命令列出所有可用时区：

```bash
timedatectl list-timezones
```

找到所需的时区后，设置它，例如将时区更改为 `Asia/Shanghai`：

```bash
sudo timedatectl set-timezone Asia/Shanghai
```

### 硬件时钟（RTC）同步

更改系统时间后，系统会自动同步硬件时钟。如果没有同步，可以手动运行以下命令：

```bash
sudo hwclock --systohc
```

rtc 里存UTC时间，系统时间会根据时差计算，可以避免一些切换时区的问题

```bash
timedatectl set-local-rtc 0
```

> RTC 就是主板上的时钟
>
> UTC(Coordinated Universal Time)协调世界时

## Change Password

```bash
sudo passwd username
```
