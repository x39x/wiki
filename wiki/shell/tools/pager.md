# 文件查看

## `cat`

`cat` = concatenate

最原始的用途其实是“拼接文件”，顺便也能输出内容。

特点：

- 一次性直接输出全部内容
- 不分页
- 不交互
- 常用于管道

例如：

```sh
cat file.txt | grep hello
```

或者：

```sh
cat a b c > all.txt
```

适合：

- 小文件
- 管道处理
- 拼接文件
- 快速 dump 内容

不适合：

- 大文件阅读

因为内容会瞬间刷满终端。

## `more`

more (Unix)

`more` 是早期分页器（pager）。

特点：

- 一页一页显示
- 只能有限地向前翻
- 交互能力弱
- 很老

例如：

```sh
more file.txt
```

常见操作：

- 空格：下一页
- Enter：下一行
- q：退出

缺点：

- 往回翻页很麻烦甚至不支持
- 搜索能力弱

现在基本被 `less` 替代。

## `less`

用来替代 `more` 名字来自一句 Unix 玩笑：

> less is more

这是现代 Linux/Unix 最常用 pager。

特点：

- 可上下翻页
- 支持搜索
- 支持跳转
- 支持大文件
- 不会一次性读完整文件
- 很适合日志查看

例如：

```sh
less file.txt
```

常见操作：

| 操作     | 功能           |
| -------- | -------------- |
| j/k      | 上下移动       |
| 空格     | 下一页         |
| b        | 上一页         |
| /pattern | 搜索           |
| n        | 下一个搜索结果 |
| g        | 文件开头       |
| G        | 文件结尾       |
| q        | 退出           |

适合：

- 阅读日志
- 查看大文件
- `git log`
- `man`
- 命令输出分页

很多工具内部默认就调用 `less`：

```sh
git log
man ls
systemctl status
```
