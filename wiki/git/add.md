# add

## 按照 hunk 粒度 add

```sh
git add -p <file>
#或对所有文件：
git add -p
```

然后 Git 会展示每个 hunk（代码块），并让你选择如何处理：

常用操作选项：

输入 作用

- y 暂存此 hunk
- n 不暂存
- q 退出
- a 暂存当前文件的所有 hunks
- d 不暂存当前文件任何 hunk
- s 将当前 hunk 再细分成更小的 hunks
- e 手工编辑当前 hunk 内容

最常用的是 s（split），能把一个 hunk 切到更细，甚至细到一行。
