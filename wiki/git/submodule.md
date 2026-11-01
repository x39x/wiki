# submodule

https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97

https://superuser.com/questions/1600823/whats-the-benefit-of-specifying-a-branch-for-a-submodule

```sh
# add submodule
git submodule add  http://github.com/xxx
# add specific branch
git submodule add -b branchname http://github.com/xxx
```

主仓库是包含 `.gitmodules` 的仓库，也就是当前仓库
主仓库不会包含子模块的实际代码，只记录两项信息：

- 子模块的远程地址
- 子模块的特定 commit 哈希

## 更新

主仓库在自己的 commit 中记录每个子模块对应的 commit 哈希。
运行 `git submodule update` 的目的，是让子模块工作目录切换到主仓库记录的这个哈希。

### 同步子模块到主仓库记录的版本

这是最常用的方式，用于让子模块与主仓库同步到主仓库要求的版本。

```bash
git submodule update --init --recursive
```

- `--init`：初始化子模块
- `--recursive`：对子模块内的子模块也递归更新

该命令会：

- 初始化子模块
- checkout到主仓库记录的commit

### 从remote更新

```bash
git submodule update --remote
# 可选：
git submodule update --remote --rebase
git submodule update --remote --merge
```

如果不确定有没有初始化过：

```bash
git submodule update --init --recursive --remote
```

也可以手动进入子模块目录更新

```bash
cd path/to/submodule
git fetch
git checkout main
git pull
```

## 检查状态

```bash
git submodule status
```
