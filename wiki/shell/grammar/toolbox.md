# 基本工具

绝大多数 Unix 默认提供（包括容器环境等），脚本里常用

| 工具              | 主要用途                               |
| ----------------- | -------------------------------------- |
| `ls`              | 列目录（不建议用于解析）               |
| `cp`              | 复制文件                               |
| `mv`              | 移动/重命名                            |
| `rm`              | 删除文件                               |
| `mkdir`           | 创建目录                               |
| `rmdir`           | 删除空目录                             |
| `touch`           | 创建文件/更新时间戳                    |
| `ln`              | 创建软/硬链接                          |
| `chmod`           | 修改权限                               |
| `chown`           | 修改属主                               |
| `chgrp`           | 修改属组                               |
| `pwd`             | 输出当前目录                           |
| `cat`             | 输出/拼接文件                          |
| `head`            | 取前几行                               |
| `tail`            | 取后几行                               |
| `wc`              | 统计行/字/字节数                       |
| `grep`            | 搜索/正则过滤文本                      |
| `sed`             | 替换/删除行等流编辑                    |
| `awk`             | 字段处理/格式化/统计                   |
| `cut`             | 按列或分隔符提取字段                   |
| `tr`              | 字符替换/删除                          |
| `sort`            | 排序                                   |
| `uniq`            | 去重/计数（通常配合 sort）             |
| `tee`             | 同时写 stdout 和文件                   |
| `xargs`           | 把 stdin 转参数执行命令                |
| `find`            | 文件查找/批量处理                      |
| `diff`            | 比较文件差异                           |
| `cmp`             | 字节级比较                             |
| `date`            | 获取时间/格式化时间                    |
| `sleep`           | 延迟执行                               |
| `id`              | 获取 uid/gid 信息                      |
| `whoami`          | 当前用户名                             |
| `uname`           | 获取系统信息                           |
| `ps`              | 查看进程列表                           |
| `kill`            | 发送信号                               |
| `tar`             | 打包/解包                              |
| `gzip` / `gunzip` | 压缩/解压                              |
| `ping`            | 网络连通性测试（服务器上可能缺或被禁） |

## TODO

```sh
#Creates a physical link.
ln file1 file2

#Creates a symbolic link.
- ln -s source_file target
```

```bash
xxd #查看二进制
objdump #查看二进制
file #查看文件信息
```

## locate

 It is used to locate a file in Linux System

## mv 

Used to move the files or directories. This command’s working is almost similar to _cp_ command but it deletes a copy of the file or directory from the source path. - Move multiple files

```sh
mv a.py b.py c.py Dir
mv a b c -t Dir
```

## chmod 

Used to modify the access/permission of a user.

```sh
#+ : add a permission
#- : cancel a permission
#=: add some permissions and can other permissions(if has)
#r: read x:Executable w: write
chmod +w file.sh
# 所有者读写权限（6），所属组有读权限（4），其他用户没有权限（0）
sudo chmod 640 .sshkey/id_rsa
```

## xargs

```bash
# 列出所有c文件，传给xargs，xargs把他当作参数传给 basename，
# XXX是占位符，常用的有 {} / XXX
# 列出所有c文件去掉后缀 .c
ls *.c | xargs -I XXX basename XXX .c
```

## 其他常用工具

不保证系统默认提供，但常用

| 工具                    | 用途                          |
| ----------------------- | ----------------------------- |
| `curl`                  | 下载/HTTP 请求                |
| `ip`                    | 网络配置（取代 ifconfig）     |
| `ss`                    | 查看端口/连接（取代 netstat） |
| `mount`                 | 挂载文件系统                  |
| `df`                    | 查看磁盘空间                  |
| `du`                    | 查看目录大小                  |
| `realpath` / `readlink` | 解析真实路径                  |
| `mktemp`                | 创建临时文件/目录             |
| `basename` / `dirname`  | 路径处理                      |
| `sha256sum` / `md5sum`  | 校验文件哈希                  |
