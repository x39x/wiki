# 网络配置

使用systemd 和 iwd，更加轻量化，简单

- iwd：负责 Wi-Fi 的扫描、认证、连接。
- systemd-networkd：负责所有接口（有线 + 无线）的 IP 地址、网关、DNS
- systemd-resolved：负责 DNS 解析

## Systemd

### 启用服务，配置DNS

```bash
sudo systemctl enable --now iwd systemd-networkd systemd-resolved
#让 /etc/resolv.conf 指向 systemd-resolved 管理的文件
sudo ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf
```

### 配置

```bash
# /etc/systemd/network/20-wired.network
[Match]
Name=enp3s0 # 有线网口（用 ip link 查看，形如 enp2s0、eth0）。

[Network]
DHCP=yes    # 启用 DHCP，自动获取 IP、网关、DNS

[DHCPv4]
RouteMetric=100 # 路由优先级，保证有线优先于 Wi-Fi

# /etc/systemd/network/25-wireless.network
[Match]
Name=wlan0 # 无线网口（用 ip link 确认名字，通常是 wlan0）

[Network]
DHCP=yes

[DHCPv4]
RouteMetric=600  # 数字越大优先级越低，优先使用有线
```

## Wi-Fi

### 查看所有无线设备状态

```bash
rfkill list
#输出示例：
#Soft blocked: yes → 软件层面被禁用（可解除）
#Hard blocked: yes → 物理开关/飞行模式开启（需手动拨动）
```

```bash
# 解除 Wi-Fi 软件封锁
sudo rfkill unblock wifi
# 解除所有封锁
sudo rfkill unblock all
```

### iwd 连接

iwd 只管认证，DHCP 等由其他程序负责（systemd-network）

iwd与NetworkManager冲突， 需要先停止

```bash
nmcli connection down "WiFi-SSID"
sudo systemctl disbale --now NetworkManager
```

连接前检查无线网卡状态，如被禁用使用rfkill解开

```bash
rfkill list
sudo rfkill unblock wifi   # 启用
```

#### iwctl 基本使用

```bash
iwctl device list                         # 查看网卡设备名
iwctl device wld0 set-property Powered on # 开启网卡（若 Powered: off）

# 扫描并连接
iwctl station wld0 scan
iwctl station wld0 get-networks
iwctl station wld0 connect "Wi-Fi"

iwctl station wld0 show                   # 查看连接状态
iwctl station wld0 disconnect             # 断开连接
iwctl known-networks list                 # 查看已保存网络
iwctl known-networks "Wi-Fi" forget       # 忘记某网络
```

也可以直接输入 `iwctl` 进入交互模式

## 有线

插上自动连接

## tun

https://blog.iswiftai.com/posts/clash-linux/

使用带有 Tun 模式的 代理软件时
可关闭 dns 解析，代理工具会劫持 53 端口，使用systemd-resolved无意义

```sh
sudo systemctl stop systemd-resolved
sudo systemctl disable systemd-resolved

# 还原 /etc/resolv.conf , 先移除软链接，再新建文件
sudo vim /etc/resolv.conf
nameserver 223.5.5.5    # Ali
nameserver 119.29.29.29 # TX
nameserver 1.1.1.1
nameserver 114.114.114.114
```

## NetworkManager

```bash
# 扫描 Wi-Fi
nmcli device wifi list
# 连接 Wi-Fi
nmcli device wifi connect "SSID" password "wifi_password"
# 断开 Wi-Fi
nmcli connection down "WiFi-SSID"
# 查看 Wi-Fi
nmcli connection show
```

## Wi-Fi 节能问题

> [!WARNING]  
> 有误! 待修改

如果通过 Wi-Fi 连接，使用以下命令看是否开启了 power saving

```bash
# wlp3s0: 接口名, iw dev 命令获取  Eg: Interface wlp3s0 ...
iw dev wlp3s0 get power_save
```

如果有，关闭它

```bash
sudo iw dev wlp3s0 set power_save off
```
