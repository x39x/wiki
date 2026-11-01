# reset

`git reset` 本质上做两件事：

1. 移动 HEAD
2. 根据参数决定是否同步 index（暂存区）和 worktree（工作区）

> 1. 如果不指定 commit，默认是 `HEAD`，默认参数是 `--mixed`
>
>     即 `git reset` 等价于： `git reset --mixed HEAD` ，即把 HEAD 移动到 HEAD
>
> 2. `--` 表示后面跟的是文件路径，而不是 commit 或分支名

## 三种模式

| 模式              | HEAD | 暂存区(index)    | 工作区(worktree) |
| ----------------- | ---- | ---------------- | ---------------- |
| `--soft`          | 回退 | 不变             | 不变             |
| `--mixed`（默认） | 回退 | 同步到目标commit | 不变             |
| `--hard`          | 回退 | 同步到目标commit | 同步到目标commit |

假设当前历史：

```text
A --- B --- C (HEAD)
```

## --soft

```bash
git reset --soft B

# 结果：
# A --- B (HEAD)
```

变化：

- HEAD：从 C 移到 B
- 暂存区：保留 C 相对 B 的改动（不变，reset前index指向C，仍为此状态）
- 工作区：保持reset前的状态（不变）

效果：

- 撤销 commit
- 但保留 `git add` 状态

## --mixed（默认）

```sh
git reset B
# 等价于
git reset --mixed B
#结果：
# A --- B (HEAD)
```

变化：

- HEAD：从 C 移到 B
- 暂存区：重置为B
- 工作区： 保持reset前的状态（不变）

效果：

- 撤销 commit
- 撤销 staged（unstage）
- 文件内容保留

## --hard

> [!WARNING]  
> 会直接丢弃所有未提交修改，以及目标 commit 后的所有 commit

```sh
git reset --hard B
#结果：
# A --- B (HEAD)
# C 的所有改动被丢弃
```

变化：

- HEAD：移动到 B
- 暂存区：变成 B
- 工作区：变成 B

效果：

- index 改动丢失
- worktree 改动丢失
- 目标 commit 之后的 commit 也失去引用

### 关于 “commit 会不会被丢失”

reset 并不是“立即彻底删除 commit”。

```sh
git reset --hard B
```

此时：

- C 不再被当前分支引用
- 但短时间内通常还能通过 reflog 找回

例如：

```sh
git reflog
git reset --hard <C的hash>
```

git reflog 记录的是对 HEAD 引用的所有变动，而不仅仅是提交。它包括提交、分支切换、重置等操作。reflog 是本地的，并不会被推送到远程仓库，用于恢复误操作、找回丢失的提交等

## 文件 reset

可以只针对某些文件或路径来操作

> `git reset <commit> -- <path>` 只会重置指定文件在暂存区的内容为目标 commit 的版本，不会改变HEAD与工作区文件

例如：

```sh
git reset HEAD^ -- file.txt
```

- 文件级 reset只能用 mixed 模式
- 文件级 reset只会把 commit 版本同步到*暂存区*，无法改变HEAD与工作区文件状态
- 注意!!!：此时 HEAD不变，工作区内的是reset前的状态（不变），暂存区是HEAD^状态

### 非法写法

`--hard` 与`--soft`只能用于整个工作区

```sh
git reset --hard HEAD^ -- file.txt
# Cannot do hard reset with paths

git reset --soft HEAD^ -- file.txt
# Cannot do soft reset with paths
```
