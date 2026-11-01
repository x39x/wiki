# CPU 策略

有时候节能策略会导致性能变差

## 查看当前节能策略

```bash
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
# use cpupower
sudo cpupower frequency-info -p
```

## 修改节能策略

```bash
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
# use cpupower
sudo dnf install kernel-tools
sudo cpupower frequency-set -g powersave
```

常见省电模式选项：

- `powersave`：最大程度降低CPU频率，降低功耗。
- `performance`：最大程度提高CPU频率，获得最佳性能。
- `ondemand`：根据CPU负载动态调整频率（默认推荐）。
- `conservative`：类似于`ondemand`，但调整更平滑。

## 设置为默认

将指定的省电模式设置为默认模式，创建 `/etc/systemd/system/cpupower.service`

```toml
[Unit]
Description=Set CPU governor to powersave
After=multi-user.target

[Service]
Type=oneshot
ExecStart=/usr/bin/cpupower frequency-set -g powersave
RemainAfterExit=true

[Install]
WantedBy=multi-user.target
```

启动服务

```sh
sudo systemctl enable cpupower.service
```

## 恢复为系统默认

```bash
# 省电模式
sudo cpupower frequency-set -g userspace
```

## 禁用自动挂起

系统进入了某种节能状态，比如 suspend 或者 CPU 降频，导致远程响应变慢

```bash
# 检查系统是否挂起过
journalctl | grep suspend
```

如果看到日志中有 `Suspending system...`，说明系统真的挂起了。这时候即使网络维持，性能也会受到影响。

### 禁用自动挂起（systemd 层面）

```bash
# find all include "sleep suspend hibernate hybrid"
systemctl list-unit-files --type=target
# 禁用
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target suspend-then-hibernate.target
```

恢复：

```bash
sudo systemctl unmask sleep.target suspend.target hibernate.target hybrid-sleep.target suspend-then-hibernate.target
```
