# stash

git stash会把所有未提交的修改（包括暂存的和非暂存的）都保存起来，用于后续恢复当前工作目录

stash是本地的，不会通过git push命令上传到git server上

## stash

```bash
# stash 工作区与暂存区
git stash
# 同上，但添加一个message，方便辨认
git stash save "stash info"
```

### stash 的文件

默认情况下，git stash会缓存下列文件：

- 添加到暂存区的修改（staged changes）
- Git跟踪的但并未添加到暂存区的修改（unstaged changes）

但不会缓存以下文件：

- 在工作目录中新的文件（untracked files）
- 被忽略的文件（ignored files）

git stash命令提供了参数用于缓存上面两种类型的文件

- 使用-u或者--include-untracked可以stash untracked文件。
- 使用-a或者--all命令可以stash当前目录下的所有修改。

## pop

命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，默认为第一个stash,即stash@{0}

```bash
# pop stash file，只恢复工作区
git stash pop

# 会同时恢复工作区与暂存区
git stash pop  --index
```

## apply

与pop相同，但不会删除stash记录， 默认使用第一个存储,即stash@{0}

```bash
# pop stash file，只恢复工作区
git stash apply

# 会同时恢复工作区与暂存区
git stash apply  --index
```

## 查看 stash

```bash
# 列出所有stash
git stash list
# 显示堆栈顶部stash的改动
git stash show
# 显示堆栈顶部stash的改动细节
git stash show -p
```

## 丢弃stash

```bash
#丢弃堆栈最顶层的stash
git stash drop
#删除所有stash
git stash clear
```

## 从stash创建分支

`git stash branch`在你stash时的所处的提交创建一个新的分支，拿出stash的所有改动（工作区与暂存区
），应用到此分支，如果成功，将会丢弃储藏

```bash
git stash branch newbranch
```

## 多个stash

默认都是操作堆栈顶部stash，即 `stash@{0}`

也可以自己指定

```bash
# 以下操作第二个stash，使用 git stash list 查看所有
git stash pop stash@{1}
git stash apply stash@{1}
git stash drop stash@{1}
git stash show stash@{1}
git stash show stash@{1} -p
```
