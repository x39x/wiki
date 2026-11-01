# 笔记

## replace character

```sh
# use “tr” replace  ' '  with  '/n'
your-shell-command | tr ' ' '\n'`
```

## test if a command exist

```bash
command -v nvim >/dev/null 2>&1 && export EDITOR="nvim"
```

`>/dev/null` : 将输出重定向到 null

`2>&1`: 将标准错误重定向到标准输出

## if in ssh

```sh
[ -n "$SSH_TTY" ] && command -v fish >/dev/null 2>&1  && exec fish
```

## 后台运行

[nohup命令行后面的& 符合代表什么意思？？](https://www.zhihu.com/question/40910876/answer/932403152)

```sh
sleep 100 &
```

1. 任务在后台运行，不阻塞当前终端

2. 运行后在 C-z 暂停，使用 bg 让暂停的任务在后台继续运行

3. 查看后台任务使用jobs（jobs -l）拉回前台使用 fg

4. nohup python train.py > output.log 2>&1 &

5. nohup 表示 no hang up ，常住后台，关闭终端不影响

## 测试网络

```sh
curl https://clients3.google.com
```

this URL is the best option to ping as it should work 24/7 without maintenance pause

## 进程替换 Process Substitution

bash/zsh的特性

```sh
<(command)   # 把 command 的“输出”当成文件
>(command)   # 把 command 的“输入”当成文件
```

查看临时文件

```sh
ls <(pwd)
# /dev/fd/33
```

### 执行顺序

```sh
diff <(ls) <(ls -a)
```

1. Bash 提前 fork 子进程
2. 执行 ls
3. 把 ls 的 stdout 接到一个 pipe
4. 把 pipe 的读端暴露成 /dev/fd/XX
5. 把这个路径字符串传给 diff

即首先执行ls，将结果pipe到一个临时文件，接着执行

```sh
diff /dev/fd/63 /dev/fd/64
```

### >()

```sh
# tee 写入两个“文件” 实际是写入两个命令的 stdin
echo "hello" | tee >(grep h) >(wc -c)
# 重定向 stdout 到命令
ls > >(grep py)
```

## `[` 是`test`的别名

`[`并不是 sh 语法，而是一条命令

```sh
which [
/bin/[
```

判断一个条件如:

```bash
# -a:and, -o:or
[ "$(uname)" = "Darwin" -a -f "/opt/homebrew/bin/brew" ]
```

不能执行命令为条件

```bash
# 命令执行失败/成功不能当作条件
[ command -v nvim >/dev/null 2>&1 ]
```

## -

`-` 将stdin当作一个文件

```bash
tar -f - </dev/null
```

## bash zsh

zsh把“命令行输入框”当成一个可编程对象（ZLE） bash 只是 readline 的一层绑定
