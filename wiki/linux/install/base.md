# 镜像烧录

## `dd` 命令行工具

1. 插入 U 盘，确保其容量足够。

2. 打开终端，输入以下命令查看设备列表：

```bash
diskutil list
```

找到你的 U 盘设备标识符，例如 `/dev/disk2`。

3. 卸载 U 盘（**注意，不要移除 U 盘本身**）：

```bash
diskutil unmountDisk /dev/disk2
```

4. 将 ISO 文件写入 U 盘（将 `path_to_your_iso` 替换为你的 ISO 文件路径）：

```bash
sudo dd if=path_to_iso.iso of=/dev/disk3 bs=4M status=progress && sync
```

- `if=` 表示输入文件（你的 ISO 文件路径）。
- `of=` 表示输出设备（U 盘设备路径）。
- `bs=1m` 设置块大小为 4MB
- `status=progress` 显示复制过程进度，方便查看写入情况
- `sync` 强制把写入的数据从内存刷到磁盘，确保数据安全，防止缓存没写完就拔出 U 盘

7. 完成后，安全弹出 U 盘：

```bash
diskutil eject /dev/disk2
```

## 使用 `Disk Utility` 图形界面

1. **下载镜像**：同方法 1。
2. **插入 U 盘**：打开 `Disk Utility`。
3. **格式化 U 盘**：
    - 选择 U 盘。
    - 点击 `Erase`（抹掉），选择 `格式：ExFAT` 或 `MS-DOS (FAT)`，名称随意。
    - 点击 `Erase` 进行格式化。

4. **恢复镜像**：
    - 在 `Disk Utility` 菜单栏，点击 `Restore`（恢复）。
    - 选择你的 ISO 镜像作为源。
    - 选择你的 U 盘作为目标。
    - 点击 `Restore` 开始写入。
