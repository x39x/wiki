# Systemd 使用

定时任务

## 创建一个定时器：

### fdsk

```bash
sudo vi /etc/systemd/system/reboot.timer
```

内容如下：

```ini
[Unit]
Description=Daily reboot at midnight

[Timer]
OnCalendar=*-*-* 03:00:00
Persistent=true # 确保系统在下次启动时，如果之前有错过的定时任务，会立即执行那次任务
# Unit=reboot.service 不指定默认为 timer 同名 service 文件

[Install]
WantedBy=timers.target
```

## 创建对应的服务：

```bash
sudo vi /etc/systemd/system/reboot.service
```

内容如下：

```ini
[Unit]
Description=Reboot system

[Service]
Type=oneshot # 服务是一次性任务，执行完后将立即退出
ExecStart=/usr/bin/systemctl reboot
```

## 启用定时器

```bash
sudo systemctl enable --now reboot.timer
```

查看服务是否存在：

```bash
systemctl status reboot.service
```

查看定时器是否启用：

```bash
systemctl list-timers
```

查看定时器的详细信息：

```bash
systemctl cat reboot.timer
```

如果没有手动指定 `Unit=`，它会默认查找 `reboot.service`。

## 移除定时任务

### 先停止相关的定时器和服务：

```bash
sudo systemctl stop reboot.timer
sudo systemctl stop reboot.service
```

### 禁用定时器以防止它开机启动：

```bash
sudo systemctl disable reboot.timer
```

### 删除定时器和服务文件

删除相关的 `systemd` 配置文件：

```bash
sudo rm /etc/systemd/system/reboot.timer
sudo rm /etc/systemd/system/reboot.service
```

### 重新加载 `systemd` 配置

删除配置后，重新加载 `systemd` 配置以生效：

```bash
sudo systemctl daemon-reload
```

### 验证是否已移除

运行以下命令，确认定时器和服务已移除：

```bash
systemctl list-timers --all
systemctl list-units --all | grep <name>
```

## 启动模式

### 检查当前的默认启动目标

```bash
systemctl get-default
```

### 设置图形界面为默认启动

```bash
sudo systemctl set-default graphical.target
```

### 设置多用户模式为默认启动

```bash
sudo systemctl set-default multi-user.target
```

### 手动启动图形界面

```bash
sudo systemctl start graphical.target
```

## Tips

### 重新加载 unit 文件

```bash
systemctl daemon-reload
```

### 重启 systemd 进程

很少用，一般系统升级才需要）

```bash
systemctl daemon-reexec
```

### 列出激活的 target

```bash
systemctl list-units --type=target
```

### 列出系统中所有的`target`

```bash
systemctl list-units --type=target --all
```

### 所有已安装的 target

```bash
systemctl list-unit-files --type=target
```

## Systemd

当 systemd 以用户实例(--user)运行时，加载单元的先后顺序(较前的目录优先级较高)：
https://www.jinbuguo.com/systemd/systemd.unit.html
https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html

### 让 systemd 重新加载用户服务配置：

```sh
systemctl --user daemon-reexec
systemctl --user daemon-reload
```

```sh
loginctl show-user $USER
#如果输出中 Linger=no，那么你可能需要开启 linger 才能使用用户服务：
sudo loginctl enable-linger $USER
systemctl --user status
mkdir -p ~/.config/systemd/user
cp battery-monitor.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now battery-monitor.service
```
