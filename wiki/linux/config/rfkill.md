# rfkill（无线硬件开关管理）

`rfkill` 用于管理系统的无线射频设备开关（Wi‑Fi/蓝牙等）的工具

是从内核屏蔽硬件功能，可以理解为软件层面的开关

支持：

- Wi-Fi
- Bluetooth
- 4G/5G（WWAN）
- 其他无线设备

## 查看状态

```bash
rfkill list
# 示例输出：
0: phy0: Wireless LAN
    Soft blocked: no
    Hard blocked: no
```

### 状态含义

| 状态              | 含义                  |
| ----------------- | --------------------- |
| Soft blocked: yes | 软件禁用              |
| Hard blocked: yes | 硬件禁用（热键/BIOS） |

## 启用/禁用

### Wi-Fi

```bash
sudo rfkill block wifi     # 禁用
sudo rfkill unblock wifi   # 启用
sudo rfkill block bluetooth
sudo rfkill unblock bluetooth
```

### 所有无线设备（飞行模式）

```bash
sudo rfkill block all
sudo rfkill unblock all
```

## 实时监控

```bash
rfkill event
```

显示无线设备状态变化事件
