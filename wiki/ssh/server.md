# Server

ssh server 是指 sshd ，运行在你要连接的机器上，一般是云端服务器

检查sshd服务状态

```bash
sudo ps -e |grep ssh
```

如果显示只有 ssh-agent, 而没有 sshd 服务项，那么你的系统中 sshd 未启动（部分发行版可以未安装）

```bash
# 安装 openssh-server
sudo apt install openssh-server
# 安装完成后，SSH服务默认自动启动，你可以通过以下命令校验服务运行状态：
sudo systemctl status sshd
# 如果你启用了防火墙，请确保防火墙打开了 SSH 端口，命令如下：
sudo ufw allow ssh
```

## 网络连通性测试（Client 上）

```sh
nc -zv xxx.xxx.xxx.xxx 2222
```

如果提示 Connection refused 或 No route to host，就是网络问题或远程端口没开放。

## 防火墙放行 SSH 端口

### UFW

```bash
# 如果你启用了防火墙，请确保防火墙打开了 SSH 端口
sudo ufw allow ssh
```

### Fedora firewall

```bash
# 列出放行端口
sudo firewall-cmd --list-ports
# 列出所有 firewall 信息
sudo firewall-cmd --list-all
# --add-port=2222/tcp：开放 2222 的 TCP 连接, --permanent：把规则写入配置文件
sudo firewall-cmd --add-port=2222/tcp --permanent
sudo firewall-cmd --reload
```

## sshd 配置

建议将端口更改为非默认值以减少被扫描攻击的风险。在配置好密钥连接后禁用密码认证，避免了暴力破解密码的风险

```bash
sudo vim /etc/ssh/sshd_config
Port 2222                               # 服务端口，务必修改，默认 22
PubkeyAuthentication yes                # 启用密钥配对认证方式
AuthorizedKeysFile .ssh/authorized_keys # 公钥存放文件路径 ~/.ssh
PasswordAuthentication no               # 禁用密码连接
```

## sshd 管理

```bash
sudo systemctl start sshd
sudo systemctl stop sshd
sudo systemctl restart sshd
# 跟随系统启动
sudo systemctl enable sshd
# 禁止 SSH 跟随系统启动
sudo systemctl disable sshd
```
