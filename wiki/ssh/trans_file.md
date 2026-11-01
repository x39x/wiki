# 上传文件

以上传公钥为例，
推荐使用 ssh-copy-id 上传公钥

```bash
# 将公钥 ~/.ssh/my_key.pub 强制复制到 user@hostname
ssh-copy-id -i ~/.ssh/my_key.pub -p 2222 -f user@hostname
```

常用选项

```txt
-i [file]
    指定要复制的公钥。默认 `~/.ssh/id_rsa.pub`
-t [path]
    指定远程主机上目标路径,必须是绝对路径，不要使用 '~'， 默认 /home/username/.ssh/authorized_keys
-p [port]
    指定远程主机的端口，默认是 22
-f
    强制模式。无论公钥是否已经存在，都会复制公钥到远程主机
-n
    演练模式（dry run）。不会实际复制公钥，仅显示会发生的操作
-x
    启用调试模式，等同于执行 `ssh` 时加上 `-x` 选项，会输出更多的调试信息
-s
    使用 `sftp`。如果远程主机只允许 SFTP 而不允许执行 SSH 命令
```

## CAT

简单、简陋、好用

```bash
# cat
cat ~/.ssh/id_rsa.pub | ssh -p 22 username@ip_address "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

## SCP

-P 是指定端口（注意是大写 P）

```bash
# 传输单个文件
scp -P 22 id_rsa.pub username@192.168.8.8:/home/user1/pubkeydir/
# 传输整个目录（递归）
scp -P 22 -r Demo username@192.168.8.8:/home/user1/
# 指定密钥
scp -P 22 -r -i ~/id_rsa Demo username@192.168.8.8:/home/user1/
```

## SFTP

交互式管理远程文件（例如浏览文件、创建目录、删除文件等），或者需要传输大量文件，SFTP 更加灵活和适用。

### 连接

```bash
# 使用指定端口连接
sftp -P 2222 user@hostname
# 上传目录
sftp -r /local/directory user@hostname:/remote/directory
# 启用压缩传输文件
sftp -C user@hostname
# 指定私钥文件进行身份验证
sftp -i ~/.ssh/my_key user@hostname
# 通过中间主机跳跃连接
sftp -J jump_host user@hostname
```

### 基本用法

- `ls`：列出远程目录内容。
- `cd`：切换远程目录。
- `lcd`：切换本地目录。
- `put`：上传文件。
- `get`：下载文件。
- `mkdir`：在远程主机创建目录。
- `rmdir`：删除远程目录。

```bash
cd /remote/directory
lcd /local/directory
put localfile /remote/directory/
get /remote/file localfile
exit
```
