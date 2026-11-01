# sudo

常见系统都预装 sudo ，Debian等默认无 `sudo`

## 安装 `sudo` 并添加用户

> 可以使用 systemd run0
> 需要安装 [polkit](https://archlinux.org/packages/?name=polkit)
> 参考 https://wiki.archlinuxcn.org/wiki/Polkit

```bash
su --login (or su -简写形式) # 需要root密码
apt update
apt install sudo
```

将用户添加到 `sudo` 组， 假设用户名为 `user1`：

```bash
su - # 需要root密码
usermod -aG sudo user1
```

## 验证配置

检查 `/etc/sudoers` 文件中是否有以下内容：

```
%sudo   ALL=(ALL:ALL) ALL
```

如果没有，可以使用 `visudo` 编辑该文件，添加上述内容。

需要注销并重新登录以应用更改, 可以通过以下命令验证是否具有 `sudo` 权限：

```bash
# 输出为 `root`，说明配置成功。
sudo whoami
```

## 使用 root 用户

```bash
sudo -i
sudo su
exit
```

## 其他

如果只想授予某些特定命令的权限，可以通过 visudo 为用户设置更精细的规则,
假设用户名为 `user1`：

```bash
# sudo command;sudo apt update 可以不需要密码执行
user1 ALL=(ALL) NOPASSWD: /path/to/command
user1 ALL=(ALL) NOPASSWD: /usr/bin/apt update
```

- 第一个 ALL： 适用于所有主机。如果在多主机环境下使用 sudoers 文件，可以指定特定的主机

- 第二个 ALL：允许以任何用户身份运行命令。默认是 root，但也可以指定为其他用户（如user1）

- NOPASSWD：表示执行该命令时，不需要输入用户密码。

> 在大型公司或云服务提供商的数据中心，可能有成百上千台服务器，分布在不同的物理位置上。这些服务器通常需要统一的管理和配置，而 sudoers 文件可以帮助管理员在不同的机器上以一致的方式管理用户权限。
>
> 例如，可能有多台 Web 服务器、数据库服务器、缓存服务器等，而管理员希望所有这些服务器上的某些用户能够执行相同的管理命令（例如备份、更新等），并且以相同的权限执行。

## 清除当前用户的 sudo 缓存，

下一次使用 sudo 将要求再次输入密码，适合完成任务后立即撤销 sudo 权限。

```bash
sudo -k
```

## 调整 sudo 的超时时间，

修改 sudo 配置 `/etc/sudoers`

```bash
Defaults timestamp_timeout=0
```

- 设置为 0：每次使用 sudo 都需要输入密码。
- 设置为负数（如 -1）：授权后永久有效，直到用户注销或清除缓存。
