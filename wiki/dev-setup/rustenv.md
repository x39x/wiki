# Rust

## 使用 Homebrew 安装

```sh
brew install rustup
rustup install stable # 安装基础工具链
rustup component add rust-analyzer # lsp serve
```

### 配置环境变量

通过homebrew安装不会自动link cargo等，需要自己处理

[参考](https://rust-lang.github.io/rustup/installation/other.html#homebrew)

```bash
ADD_TO_PATH "$(brew --prefix rustup)/bin"
```

## curl 安装

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## rustup 使用

| 功能                     | 命令                                           |
| ------------------------ | ---------------------------------------------- |
| 查看当前安装的 Rust 版本 | rustup show                                    |
| 安装最新 stable 版本     | rustup install stable                          |
| 安装 nightly 版本        | rustup install nightly                         |
| 使用特定版本的 Rust      | rustup default stable / rustup default nightly |
| 临时使用某版本           | rustup run nightly cargo build                 |
| 更新 Rust 工具链         | rustup update                                  |
| 添加组件（如 rustfmt等） | rustup component add rust-analyzer             |
| 添加目标平台             | rustup target add wasm32-unknown-unknown       |
| 卸载某版本               | rustup uninstall nightly                       |

### 每个项目使用不同版本（可选）

```sh
# 进入项目目录后运行：
rustup override set nightly
# 该项目就默认使用 nightly 版本了。
```

## 配置 PATH 环境变量

```sh
export PATH="$HOME/.cargo/bin:$PATH"
```

## 卸载 rustup

```sh
brew remove rustup
rustup self uninstall
```
