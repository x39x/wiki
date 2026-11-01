# checkout

checkout 的两个核心功能

### 1. 移动 HEAD

```sh
git checkout main
git checkout abc1234
```

### 2. 用某版本覆盖文件

```sh
git checkout -- file
git checkout abc1234 -- file
```

## 恢复文件

> `--` 表示后面的是文件路径，不是分支名/commit

> 如果不指定 commit：
>
> 1. 优先从 index（暂存区）恢复
> 2. 如果暂存区没有，则恢复为 HEAD 版本

### 丢弃工作区文件修改

```sh
git checkout -- main.c
```

效果：

- 丢弃 `main.c` 在工作区的修改
- 如果 `main.c` 已 `git add`，恢复为index版本
- 否则恢复为 `HEAD` 版本
- 如果指定HEAD，`git checkout HEAD -- main.c`，则跳过index恢复为HEAD版本

### 丢弃整个工作区修改

```sh
git checkout -- .
```

效果：

- 丢弃改动，将当前目录下所有文件恢复为 index 或 `HEAD` 状态

### 从指定 commit 恢复文件

> index 和工作区的改动都会被直接丢弃
>
> 恢复指定文件只会把 commit 版本同步到工作区/暂存区，无法改变HEAD里文件状态

```sh
git checkout abc1234 -- main.c
```

效果：

- 将 `main.c` 恢复为 `abc1234` 的版本
- 恢复后的内容会写入：
    - 工作区
    - 暂存区

### 理解

checkout 恢复文件时，本质是在“拷贝版本”

```txt
某个 commit/index ---> 工作区/index
```

例如：

```bash
git checkout HEAD -- main.c
```

表示：

```txt
HEAD 中的 main.c → 覆盖当前文件
```

## 切换分支

切换到已有分支

```bash
git checkout dev
```

切回上一个分支

```bash
git checkout -
```

## 创建并切换分支

创建新分支并立即切换

```bash
git checkout -b feature/login
```

等价于：

```bash
git branch feature/login
git checkout feature/login
# or
git switch -c feature/login
```

基于某个提交创建分支

```bash
git checkout -b fix abc1234
```

表示： 从 abc1234 这个提交创建新分支 fix

### 创建本地跟踪分支

```bash
git checkout -b main origin/main
```

或者：

```bash
git checkout --track origin/main
```

## 查看提交

### 切换到某个提交

```bash
git checkout abc1234
```

此时：

- 不在任何分支上
- HEAD 直接指向提交
- 叫做 Detached HEAD 状态

### 查看远程分支

```bash
git checkout origin/main
```
