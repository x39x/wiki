# merge and rebase

```bash
git rebase/merge
#CONFLICT -> fix conflicts
git rebase/merge --continue

#? rebase set of patches onto a new base
git rebase

#merges branch_name into current branch
git merge (branch_name)

#rebase server -> client
git rebase --onto master (server client 范围)
```

## squash

`--squash` 选项的含义是：拿过该分支的改动，但丢弃该分支的commit信息，不提交、不移动HEAD，因此需要一条额外的commit命令。其效果相当于将another分支上的多个commit合并成一个，放在当前分支上，原来的commit历史则没有拿过来。

```bash
git merge/rebase --squash developing
git commit -m "message here"
```

## git rebase -i 交互式变基

### 基本命令

```bash
git rebase -i <commit>
# 或
git rebase -i HEAD~N
```

- `<commit>`：要从哪个提交之后开始变基。
- `HEAD~N`：表示从当前 HEAD 向上 N 个提交开始。

### 常见操作关键词

| 命令     | 含义说明                             |
| -------- | ------------------------------------ |
| `pick`   | 使用该提交（默认行为）               |
| `reword` | 修改该提交的说明                     |
| `edit`   | 暂停变基，允许你修改该提交内容       |
| `squash` | 将该提交与上一个提交合并，并编辑说明 |
| `fixup`  | 与 squash 类似，但跳过提交说明编辑   |
| `drop`   | 删除该提交                           |

### 示例操作

```bash
git rebase -i HEAD~3
```

编辑器中可能出现：

```
pick 1234abc Fix typo
pick 5678def Add feature X
pick 9abc012 Refactor code
```

你可以修改为：

```
pick 1234abc Fix typo
squash 5678def Add feature X
reword 9abc012 Refactor code
```

含义：

- 第二个提交将合并到第一个提交中
- 第三个提交保留，但会要求修改提交说明

### 变基过程中的操作

- 遇到冲突时：

```bash
# 解决冲突后
git add <filename>
git rebase --continue
```

- 放弃变基：

```bash
git rebase --abort
```

- 跳过当前提交：

```bash
git rebase --skip
```

### 使用场景

- 合并多个杂乱提交为一个逻辑清晰的提交（squash）
- 修改提交说明（reword）
- 删除误提交（drop）
- 调整提交顺序（上下移动行）
