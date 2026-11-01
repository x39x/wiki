# sparse

- https://git-scm.com/docs/git-sparse-checkout/

`git sparse-checkout` ：只把 Git 仓库中的一部分文件检出到工作目录，而不是整个仓库的文件全部放到本地

- 常用命令仍然可以使用，但部分操作在 sparse 模式下会有不同表现
- 执行 `set` 缩小范围时，Git 可能会删除范围外的已跟踪文件，以及某些被忽略的文件。不要把未提交的本地文件放在即将排除的目录里
- 恢复成普通完整工作目录：`git sparse-checkout disable`

## clone

```bash
git clone --filter=blob:none --sparse https://github.com/OWNER/REPO.git

cd REPO

git sparse-checkout set cmd internal
```

- `--sparse`：克隆时启用稀疏检出，默认只检出根目录的文件。
- `--filter=blob:none`：尽可能延迟下载文件内容，等需要时再获取。
- `git sparse-checkout set cmd internal`：让 `cmd/` 和 `internal/` 中的文件出现在工作目录中。

## 对已有仓库使用

假设已经执行过普通的 `git clone`，进入仓库后执行：

```
git sparse-checkout init --cone
git sparse-checkout set cmd internal
```

`--cone` 是推荐使用的目录模式，这一步可以不用做，直接执行 `git sparse-checkout set dir1 dir2` 即可

### cone 模式

```
git sparse-checkout set dirA
```

checkout 出 dirA 里的全部所有文件，包括子目录，checkout 出 dirA 的所有父目录（包括仓库根目录）里的**文件**

非cone模式使用正则匹配文件，不推荐使用

## 常用命令

| 命令                              | 作用                                                 |
| --------------------------------- | ---------------------------------------------------- |
| `git sparse-checkout set A B`     | 只保留指定目录及其规则要求的文件，替换原来的选择范围 |
| `git sparse-checkout add C`       | 在现有范围上增加目录 `C`                             |
| `git sparse-checkout list`        | 查看当前选择的目录                                   |
| `git sparse-checkout reapply`     | 重新应用稀疏检出规则                                 |
| `git sparse-checkout disable`     | 关闭稀疏检出，恢复所有已跟踪文件                     |
| `git sparse-checkout check-rules` | 检查路径是否匹配规则                                 |
