# fish

如果在配置里 exec了fish，启动bash可以 bash --norc

[fish 教程,很详细从安装到语法细节都有 ](https://github.com/jorgebucaran/cookbook.fish)

https://wiki.archlinuxcn.org/wiki/Fish

## psub(Process Substitution)

进程替换

```fish
diff (ls | psub) (ls -a | psub)
# 同 diff <(ls) <(ls -a)
```

psub 是 fish 内置命令（函数），行为是：

1. 读取 stdin
2. 写入一个 临时文件
3. 输出这个临时文件的路径
