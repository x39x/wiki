# 常用命令

[GitHub Documentation](https://docs.github.com/cn/get-started)

[GIt Documentation](https://git-scm.com/doc)

## Branch

```sh
#shows branches
git branch

# creates a branch
git branch (name)

#查看分支最后一次提交
git branch -v

#delete branch
#删除本地分支
git branch -d localBranchName
#删除远程分支
git push origin --delete remoteBranchName
```

github 上的默认分支必须去仓库页 setting 解除保护后删除

| 命令                      | 说明                                   |
| ------------------------- | -------------------------------------- |
| git branch -d branch-name | 安全删除，必须是已经完全合并的分支     |
| git branch -D branch-name | 强制删除，即使还有没合并的内容也直接删 |

## git cherry pick

`git cherry-pick`是一个很强大的命令，它可以将任何Git提交的内容单独拿出来，然后追加到当前HEAD。比如在某一个分支中的某一次提交可以使用`cherry-pick`应用到另外一个分支中。`git cherry-pick`可以用于撤回改变。比如说某一次提交被放入了错误的分支，那么可以切换到正确的分支，然后使用`cherry-pick`将这次提交拿到正确的分支中

```bash
git cherry-pick xxx
```

## diff and log

```bash
# shows a flattened log of history
git log

# visualizes history as a graph
git log --all --graph --decorate

# show changes you made relative to the staging area
git diff (filename)

# shows differences in a file between snapshots
git diff (revision) (filename)
```

## rm mv

```bash
# 从本地删除，不会出现在未跟踪文件中
git rm （-f 强制删除在stage里的）

#不再跟踪，本地依然存在
git rm --cached file

#rename
git mv a b
```

## 拉取变化

```sh
# retrieve objects/references from a remote
git fetch

# same as git fetch; git merge
git pull

# 查看远程仓库状态
git remote show remote

# not git fetch and git merge
git pull --rebase

```

## target 写法

常见 target：

| 写法            | 含义                 |
| --------------- | -------------------- |
| `HEAD^`         | 上一个 commit        |
| `HEAD~1`        | 上一个 commit        |
| `HEAD~2`        | 上两个 commit        |
| `<branch>`      | reset 到某个分支位置 |
| `<commit_hash>` | 指定 commit          |

## 取消跟踪（untrack）

把文件从 Git 的暂存区/版本控制中移除，但保留你本地磁盘上的文件

```bash
git rm --cached [filename]
git rm -r --cached [dir_name]
```

### E.g.

```bash
git rm --cached config.json
```

效果：

- Git 不再跟踪 `config.json`（下一次 commit 会把它从仓库里删掉）
- 但目录里 `config.json` 文件还在

`git status` 会显示类似：

- `deleted: config.json`（staged deletion）
- 同时工作区可能显示 `untracked: config.json`（因为文件还在，但 Git 不管它了）
