# commit / revert

- git commit
- git commit -v(verbose) more detail
- git commit -a : auto add

## revert 撤销提交

revert的原理是，在当前提交后面，新增一次提交，抵消掉上一次提交导致的所有变化。它不会改变过去的历史，所以是首选方式，没有任何丢失代码的风险。

git revert 命令只能抵消上一个提交，如果想抵消多个提交，必须在命令行**依次**指定这些提交（强行revert多个会产生冲突）

```bash
#提交代码以后，提交有问题，应该撤销掉
git revert HEAD
git revert [倒数第2个提交]
git revert [倒数第3个提交]
--no-edit #执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息。
--no-commit #只抵消暂存区和工作区的文件变化，不产生新的提交。
```

## amend 追加提交

### 追加未添加的修改

```bash
# 把漏提交的文件添加进 index
git add path/to/missing-file
# 使用 --amend 将它们补进上一次 commit
git commit --amend
```

编辑 commit message（默认会打开编辑器），可以保留原信息或修改，保存退出即可
如果不想改 commit message，可以加 --no-edit

```bash
git commit --amend --no-edit
```

它的原理是产生一个新的提交对象，替换掉上一次提交产生的提交对象

### 追加/修改 commit 信息

提交信息写错，这时可以使用 amend 修改上一次的提交信息

```bash
git commit --amend -m "Fixes bug #42"
```

> 注意: 这时如果暂存区有发生变化的文件，会一起提交到仓库。
