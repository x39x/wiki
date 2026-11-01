# Command Line Tools 加载机制

Command Line Tools默认安装在：

/Library/Developer/CommandLineTools

其中真实的可执行工具位于：

/Library/Developer/CommandLineTools/usr/bin

## PATH

该目录 **不会被自动加入 PATH**。

/usr/bin 中的开发工具，以 gcc 为例：

```sh
which gcc
/usr/bin/gcc

ls -l /usr/bin/gcc
-rwxr-xr-x root wheel 116K /usr/bin/gcc
```

特征：

- 不是软链接
- 文件体积很小
- 不包含真正的编译器实现

/usr/bin/gcc 是 Apple 提供的 shim（包装器）可执行文件。

macOS 使用一个全局的“当前开发者工具目录 Developer Directory（开发者目录）” 该路径决定了开发工具的实际来源。

```sh
xcode-select -p
# maybe
/Library/Developer/CommandLineTools
/Applications/Xcode.app/Contents/Developer
```

## shim 的工作方式

```sh
# 当执行：
gcc main.c
# 实际执行流程为：
shell
└── /usr/bin/gcc (shim)
└── xcrun
└── $DEVELOPER_DIR/usr/bin/gcc
```

shim 程序通过 xcrun：

1. 读取当前 Developer Directory
2. 在对应目录下查找同名工具
3. 执行找到的真实可执行文件
4. 查看真实可执行文件路径
5. 使用 xcrun 可以直接解析真实路径：

```
xcrun --find gcc
xcrun --find git
xcrun --find clang
```

## 为什么不用软链接

Apple 没有将 /usr/bin/gcc 指向某个固定路径的原因：

- 需要支持在 CLT 与 Xcode 之间切换
- xcode-select --switch 可以在不修改 PATH 的情况下生效
- /usr/bin 受系统完整性保护（SIP），作为稳定入口存在
- shim 机制允许统一调度所有开发工具

## 工具链切换

切换当前使用的开发工具目录：

sudo xcode-select --switch /Library/Developer/CommandLineTools
sudo xcode-select --switch /Applications/Xcode.app

切换后，/usr/bin/\* 的行为会随之改变，无需调整 PATH。
