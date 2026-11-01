# 恢复文件

Linux 中 `rm` 只是删除文件名，只要有进程还打开着文件（fd 未关闭），文件数据就不会真正删除， 可通过 `/proc/<pid>/fd/<fd>` 读回文件内容

- inode：文件真实身份
- 目录项：文件名 → inode 的映射
- fd（文件描述符）：进程打开文件后的引用
- `/proc/<pid>/fd/` 下每个数字表示一个 fd 实际是指向文件的符号链接

> 删除文件 = 删除目录项  
> 真正释放 = 目录项删除 + 所有 fd 关闭

示例：

```text
3 -> /var/log/xxx.log (deleted)
```

## Eg：恢复被 rm 掉的 log 文件

### 场景

- 日志文件：`/var/log/app.log`
- 程序仍在运行并写日志
- 文件被误执行 `rm /var/log/app.log`

### 找到占用该文件的进程（pid）

```bash
lsof | grep app.log

# 或只看被删除的文件：
lsof | grep deleted

# 示例输出：
java 12345 app 3w REG 8,1 10485760 /var/log/app.log (deleted)
    pid：12345
    fd：3

# 确认 fd 指向已删除文件
ls -l /proc/12345/fd/3

# 输出：
3 -> /var/log/app.log (deleted)
```

### 通过 fd 恢复文件内容

```sh
cp /proc/12345/fd/3 /tmp/app.log.recover
cat /proc/12345/fd/3 > /tmp/app.log.recover
```
