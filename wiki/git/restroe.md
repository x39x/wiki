# restore

git restore 是 Git 2.23 引入的新命令，用来“恢复文件内容”，替代 `checkout/reset` 一些语义不明的操作

主要作用：

- 丢弃修改
- unstage
- 从某个 commit 恢复文件

> 丢弃改动可以用 checkout
>
> unstage 可以用 reset
>
> 从 commit 恢复可以用 reset/checkout

## 丢弃当前文件修改

优先从index找，如果没有就使用HEAD

```sh
git restore file
# 暂存区 -> 工作区
```

即：用暂存区或HEAD内容覆盖工作区文件

## 撤销 add

> 如果是 `git add -p` 部分暂存，也可以用 `git restore --staged -p` 来交互式撤销。

```
git restore --staged file
```

用HEAD内容覆盖暂存区文件（即index与HEAD相同，干净状态）

## 完全恢复到 HEAD

```
git restore --staged --worktree file
```

用HEAD同时覆盖暂存区和工作区

## 从旧 commit 恢复

> 默认是`--worktree` 把 commit 版本同步到工作区，不改变HEAD
>
> `--staged` 参数把 commit 版本同步到暂存区，不改变HEAD

```
git restore --source=<commit> file
```

用commit内容覆盖工作区文件

## 恢复整个项目

优先从index找，如果没有就使用HEAD

```
git restore .
```
