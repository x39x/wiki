# 常用命令

## 查看启动时间

```bash
uptime -s
who -b
last reboot
```

### 使用 `dmesg`

`dmesg` 命令显示内核日志，其中包含启动时间的信息：

```bash
dmesg | grep -i "command line"
```

查看命令输出中的时间戳，或者：

```bash
dmesg | head -1
```

### 使用 `journalctl`

`journalctl` 命令提供了系统日志，可以查看系统启动记录：

```bash
journalctl --list-boots
```

输出类似于：

```sh
-1  9d6a8c21f2a34...  Tue 2024-12-24 08:15:12 UTC—Tue 2024-12-24 12:34:56 UTC
 0  8c7d5e21a1c55...  Tue 2024-12-24 13:00:01 UTC—Tue 2024-12-24 14:45:00 UTC
```

当前引导记录为 `0`，上次启动的时间是 `08:15:12 UTC`。

## 查看当前用户

统计的是当前登录的所有用户会话，包括本地终端、SSH 会话，以及图形界面的登录。

```bash
users
who
```

who 输出可能类似于：

```sh
user1     tty1         2024-12-23 22:36
user1     pts/0        2024-12-24 04:40 (192.168.1.100)
user1     pts/1        2024-12-24 05:00 (192.168.1.101)
```

- `tty1` 表示本地终端登录。
- `pts/0` 和 `pts/1` 是通过 SSH 登录的会话。

## 查看本机 IP

### 使用 `ip` 命令

```bash
ip addr
```

找到类似于 `inet` 的条目。例如：

```
inet 192.168.1.100/24
```

其中 `192.168.1.100` 就是本机的 IP 地址。

### 使用 `ifconfig` 命令

1. 安装 `net-tools`（如未安装）：

```bash
sudo dnf install net-tools
```

2. 输入以下命令查看 IP 地址：

```bash
ifconfig
```

在输出中寻找 `inet` 后的地址。

### 只显示 IP 地址

可以结合 `ip` 和 `grep` 过滤：

```bash
ip -4 addr | grep inet
```

或者获取特定网卡的 IP：

```bash
ip -4 addr show dev <网卡名>
```

将 `<网卡名>` 替换为实际的网卡名，例如 `eth0` 或 `wlp3s0`。

### GUI 图形界面

1. 打开 "网络设置" 或 "Wi-Fi 设置"。
2. 在相关连接中查看 "IPv4 地址" 或 "IP 地址"。

## setfacl 权限管理

```sh
# Modify ACL of a file for user with read and write access:
setfacl --modify u:username:rw path/to/file_or_directory

# Modify default ACL of a file for all users:
setfacl --modify --default u::rw path/to/file_or_directory

# Remove ACL of a file for a user:
setfacl --remove u:username path/to/file_or_directory

# Remove all ACL entries of a file:
setfacl --remove-all path/to/file_or_directory

```

## U盘

```sh
lsblk
#或者：
dmesg | tail
#通常U盘会出现在 /dev/sdX，如 /dev/sdb1。

#创建挂载点并挂载：
sudo mkdir /mnt/usb
sudo mount /dev/sdb1 /mnt/usb

cp -r /mnt/usb/Documents ~/

#卸载U盘：
sudo umount /mnt/usb
```
