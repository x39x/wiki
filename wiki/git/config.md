# 配置文件

https://jvns.ca/blog/2024/02/16/popular-git-config-options/

```bash
git config --list  # 查看所有配置
git config [key] #查看单个配置
git config --list --show-origin # 配置以及配置文件所在位置
```

Git 相关配置保存在 ~/.gitconfig 或 ~/.config/git/config 中

```toml
[user]
name = xxx
email = xxx@mail.com

[core]
editor = nvim
excludesfile = ~/.config/git/gitignore

[merge]
conflictstyle = diff3

[diff]
external = difft --syntax-highlight off

[credential]
helper = cache
```

## delta

一个优化 diff log 等信息展示的工具

```toml
[merge]
conflictstyle = diff3
[diff]
colorMoved = default
[interactive]
diffFilter = delta --color-only
[delta]
side-by-side = true
```

## 网络

将所有 https 都换为 ssh

```toml
# use ssh
[url "git@github.com:"]
insteadOf = https://github.com/
```

配置代理

```toml
# use proxy
[http "https://github.com"]
proxy = socks5://127.0.0.1:7890
```

### 安全

```toml
# storing authentication information (recommended to use cache,no store)
[credential]
helper = cache
```

## Merge Tools

```toml
[merge]
conflictstyle = diff3
tool = nvimdiff

[mergetool]
keepBackup = false

# 定义 nvimdiff 命令
[mergetool "nvimdiff"]
cmd = nvim -d $LOCAL $REMOTE $MERGED -c '$wincmd w' -c 'wincmd J'
```

## Git hook

特定条件下执行的shell脚本

```bash
cd .git/hooks
# commit之后执行，条件与文件名相关
touch post-commit
```

## git tools

### difftastic

优化 diff 的工具，建议关闭它默认的语法高亮，会分不清 diff 的代码

```toml
[diff]
external = difft --syntax-highlight off

# git log -p --ext-diff
# git show --ext-diff

```

### git graph

- https://github.com/lusingander/serie
- https://github.com/git-bahn/git-graph
- https://github.com/isakbm/gitgraph.nvim
- https://github.com/rbong/vim-flog
