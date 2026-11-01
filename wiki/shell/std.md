# stdin / stdout / stderr

Unix/Linux 里每个进程默认都会打开 3 个文件描述符（fd）

| fd  | 名字   | 默认指向     |
| --- | ------ | ------------ |
| 0   | stdin  | 键盘输入     |
| 1   | stdout | 终端输出     |
| 2   | stderr | 终端错误输出 |

它们本质上只是：

```text
fd0
fd1
fd2
```

三个普通文件描述符

Unix shell 的重定向： 修改进程的 fd0/fd1/fd2 指向

## stdout

默认输出到终端。

```bash
echo hello
#等价于：
#stdout -> terminal
```

### 重定向 stdout

```bash
echo hello > out.txt
#等价于：fd1 -> out.txt
echo hello 1> out.txt

```

## stderr

程序错误默认输出到终端

例如：

```bash
ls not_exist
# 错误信息来自 stderr。
```

### 重定向 stderr

```bash
ls not_exist 2> err.txt
#表示： fd2 -> err.txt
```

## stdin

默认从键盘读取

例如：

```bash
cat
#会一直等待输入。
```

### 重定向 stdin

```bash
cat < input.txt
#等价于：
cat 0< input.txt
#等价于：
cat input.txt
# 表示：
# fd0 <- input.txt
```

## 同时重定向 stdout 和 stderr

```bash
cmd > out.txt 2>&1
```

执行顺序：

```text
fd1 -> out.txt
fd2 -> fd1 当前的位置
     -> out.txt
```

最终：

```text
stdout -> out.txt
stderr -> out.txt
```

## `&` 的含义

`&` 表示：引用文件描述符

### `2>1`

```text
stderr -> 文件 "1"
```

### `2>&1`

```text
stderr -> fd1 当前的位置
```

## pipe

前一个程序输出作为后一个程序输入

```bash
echo hello | cat
# echo 的 stdout(fd1)
#     ->
# pipe
#     ->
# cat 的 stdin(fd0)
```

## here document(bash/zsh)

把多行文本给 stdin

```bash
cat <<EOF
hello
world
EOF
```

## here string(bash/zsh)

把 string 给 stdin

```bash
grep hello <<< "hello world"
```

## 丢弃 std

```text
`/dev/null`
写进去的数据直接丢弃
读出来永远 EOF
```

### 丢弃 stdout

```bash
cmd > /dev/null
```

### 丢弃 stderr

```bash
cmd 2> /dev/null
```

### 全部丢弃

```bash
cmd > /dev/null 2>&1
```

## exec 修改当前 shell fd

### stdin

```bash
exec 0< input.txt
```

之后当前 shell 的 stdin 来自文件

### stdout

```bash
exec 1> log.txt
```

之后 shell 输出全部写入文件

### 关闭 fd

关闭 stdin， `-`不是特殊fd，这是 bash 特殊语法

```bash
exec 0<&-

# >&word
# 如果：
#      word 是数字
#      → dup fd
# 如果：
#      word 是 -
#      → close fd
```

## Tips

`< > &`不要有空格

### 重定向顺序

```bash
cmd 2>&1 > out.txt

# 执行顺序：
# fd2 -> terminal
# fd1 -> out.txt
# 最终：
# stdout -> out.txt
# stderr -> terminal
```

因为 `2>&1` 执行的时候 fd1 还指向 `terminal` 的位置
