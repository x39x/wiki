# Node

Node.js 有两个主要的发布版本：

1. Current (当前版本): 最新的功能版本，可能包含新特性和改进，但不保证长期稳定性。
2. LTS (长期支持版本): 经过充分测试并得到长期支持，适合生产环境使用，通常每个 LTS 版本会在发布后的 30 个月内收到更新和支持。

brew 默认是 Current ，推荐使用 LTS ，一般是 Current 版本号减一或者减二（LTS都是偶数版本）

```sh
brew install node@LTS
brew link node@LTS
brew unlink node@20
```

## 全局 Node

### 查看版本

```bash
pnpm env list                     # 查看本地已安装的 Node 版本
pnpm env list --remote            # 查看可用的远程 Node 版本
pnpm env use --global 22          # 安装并切换到 Node 22 最新小版本
pnpm env use --global lts         # 安装并切换到最新 LTS 版本
pnpm env use --global latest      # 安装最新版本
pnpm env remove --global 14.0.0
```

安装位置在：`~/.local/share/pnpm/nodejs/ ($PNPM_HOME/nodejs/)`

## 项目 Node

- 项目目录下创建 `.npmrc` 文件：

```ini
use-node-version=23.11.0
```

- 或者在 `pnpm-workspace.yaml` 中指定

```yaml
useNodeVersion: 23.11.0
```

执行 `pnpm init`会自动为该项目下载对应版本的 Node，仅在执行 `pnpm script` 命令时使用该版本。

例如：

```json
"scripts": {
  "nodeversion": "node -v",
  "dev": "node dev.js"
}
```

执行以下命令时将使用 `.npmrc` 指定的 Node：

```bash
pnpm nodeversion   # 输出 23.11.0
pnpm dev       # 运行时使用 23.11.0
```

而全局的 `node` 命令仍使用系统默认版本，不受影响。

### 注意事项

- `.npmrc` 中的 `use-node-version` 是 pnpm 自行支持的字段，不属于标准 npm 配置。
- 仅 `pnpm run` 和 `pnpm <script>` 命令会使用该 Node 版本。
- 不会自动切换 shell 中的 `node`，如需自动切换请使用 `fnm` 或 `volta`。
- 参考: [How to manage multiple nodejs versions with pnpm?](https://medium.com/frontendweb/how-to-manage-multiple-nodejs-versions-with-pnpm-8bcce90abedb)
