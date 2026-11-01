# C/C++

## LLVM

```bash
brew install llvm
export LDFLAGS="-L/opt/homebrew/opt/llvm/lib"
export CPPFLAGS="-I/opt/homebrew/opt/llvm/include"
export PATH=/opt/homebrew/opt/llvm/bin:$PATH
```

clangd 需要 `compile_commands.json` 提供补全和跳转支持

## CMake 工程生成 `compile_commands.json`

```bash
cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1
# or add to CMakeLists.txt
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
```

## Makefile 工程生成 `compile_commands.json`

```bash
brew install bear
bear cmd # Eg: bear make
```

## clangd 指定 `compile_commands.json` 位置

```bash
clangd --compile-commands-dir=${workspaceFolder}/build/
```

## Clangd config file

project configuration: a file named .clangd in the source tree. (clangd searches in all parent directories of the active file)
Generally this should be used for shared and checked-in settings.
(Existing directories named .clangd can be deleted. These were used for temporary storage by clangd before version 11.)

user configuration: a config.yaml file in an OS-specific directory:

Windows: %LocalAppData%\clangd\config.yaml, typically C:\Users\Bob\AppData\Local\clangd\config.yaml.
macOS: ~/Library/Preferences/clangd/config.yaml
Linux and others: $XDG_CONFIG_HOME/clangd/config.yaml, typically ~/.config/clangd/config.yaml.
Private settings go here, and can be scoped to projects using If conditions.

Each file can contain multiple fragments separated by --- lines. (This is only useful if the fragments have different If conditions).
JSON is a subset of YAML, so you can use that syntax if you prefer.
Changes should take effect immediately as you continue to edit code.

## 刷题

add to /usr/local/include/bits/stdc++.h on macos

```cpp
#include <algorithm>
#include <cmath>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <vector>
using namespace std;
```

then #include <bits/stdc++.h>
