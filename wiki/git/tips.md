# tips

## 寻找删除文件

```sh
# 先查看所有可达的 blob
git rev-list --objects --all

# 文件曾经被添加到暂存区，但没有提交，可以查看不可达对象
git fsck --full --no-reflogs --unreachable

# 查看文件的所有commit（删除的文件也可以查看，只要曾经被git跟踪）
git log --all --full-history -- '**/example.lua'
```
