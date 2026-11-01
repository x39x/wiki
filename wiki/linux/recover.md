# 系统拯救

https://zhuanlan.zhihu.com/p/20062978

当 Linux 核心命令损坏、权限错乱、动态链接库丢失，或者系统无法正常启动

> 自救的优先级与顺序

1. 先检查是否还能执行 BusyBox
2. 若命令无法执行，尝试通过 `ld.so` 手动加载
3. 若权限错乱，用 Python、Perl 或 `setfacl` 修复
4. 若命令丢失，用 Python 或 GCC 重建
5. 最后实在无解，再从外部环境 chroot 修复

## BusyBox

BusyBox 是一个多功能的单一二进制文件，几乎能模拟 Linux 的所有常用命令。

```bash
busybox sh
busybox cp /mnt/backup/chmod /bin/chmod
busybox chmod 755 /bin
```

可以建立软链接，直接使用这些命令

```bash
ln -s /bin/busybox /bin/chmod
ln -s /bin/busybox /bin/cp
```

## 动态链接器（ld.so）

有时候 `/bin/ls` `/bin/bash` 等命令明明存在，却报错说文件不存在。往往是因为动态链接器损坏或被误删。Linux 的 ELF 可执行文件依赖 `/lib64/ld-linux-x86-64.so.2`（或类似路径）去加载 libc 等共享库。 当链接器不在时，程序就无法执行。可以手动指定链接器运行命令：

```bash
/lib64/ld-linux-x86-64.so.2 /bin/ls
```

或者带上库搜索路径：

```bash
/lib64/ld-linux-x86-64.so.2 --library-path /lib/x86_64-linux-gnu /bin/bash
```

这种方式常常能“唤醒”一个表面上无法运行的 shell，为后续修复争取时间。

## Python

Python 内置了文件操作、权限管理、命令执行等几乎所有基础功能。当 `chmod`、`cp`、`mv` 等命令无法使用时，可以用 Python 代替：只要 Python 还能运行，可以几乎重现一套基础命令环境。

```bash
python -c "import shutil; shutil.copy('/mnt/chmod', '/bin/chmod')"
python -c "import os; os.chmod('/bin/chmod', 0o755)"
```

若要查看目录、执行命令：

```bash
python -c "import os; print(os.listdir('/'))"
python -c "import os; os.system('/bin/busybox sh')"
```

## GCC：自编自救

当编译器（`gcc` 或 `tcc`）还能工作时，可以直接编写最小可用版本的命令。
例如自己重建一个简单的 `chmod`：

```bash
cat > chmod.c <<'EOF'
#include <sys/stat.h>
#include <stdlib.h>
int main(int argc, char **argv) {
    if (argc < 3) return 1;
    long mode = strtol(argv[1], 0, 8);
    return chmod(argv[2], mode);
}
EOF

gcc chmod.c -o /bin/chmod
```

静态链接编译（`-static`）还能保证命令在没有共享库的情况下也能运行。
对于极端场景，C 语言意味着拥有真正意义上的自救能力。

## Perl、setfacl、install

当 `chmod` 损坏，甚至无法重建时，还有其他途径。

Perl 可以直接修改文件权限：

```bash
perl -e 'chmod 0755, "/bin/bash"'
```

`setfacl` 允许通过访问控制列表调整权限，即使传统权限系统坏掉也能生效。
而 `install` 命令则是 `cp + chmod` 的组合，常用于恢复命令时一并设置权限：

```bash
install -m 755 /mnt/chmod /bin/chmod
```

## 其他应急思路

若系统完全无法进入正常环境，可从 live USB 或其他系统挂载出原系统分区：

```bash
mount /dev/sda2 /mnt
chroot /mnt /bin/bash
```

在新的 chroot 环境中，系统的库和命令可被重新修复、重建。
此外，也可提前准备一个静态链接的 shell（如 `/bin/bash.static`），在关键时刻替换损坏的 bash。
