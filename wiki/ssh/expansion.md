# 常见问题

通过 OSC 52 从远程复制粘贴，大部分终端都支持 OSC 52 协议

## nvim 配置

```lua
vim.g.clipboard = {
    name = 'OSC 52',
    copy = {
        ['+'] = require('vim.ui.clipboard.osc52').copy('+'),
        ['*'] = require('vim.ui.clipboard.osc52').copy('*'),
    },
    paste = {
        ['+'] = require('vim.ui.clipboard.osc52').paste('+'),
        ['*'] = require('vim.ui.clipboard.osc52').paste('*'),
    },
}
```

## tmux

```bash
set-option -s set-clipboard on
set-option -g allow-passthrough on
```

## Shell Behavior

> 此部分是我实际使用中遇到的问题，不一定准确，仅起参考作用

ssh 连接 server shell 不会加载 `.bashrc`，只会按顺序加载 `.bash_profile .profile`

通过 ssh 执行命令时会加载 `.bashrc`

```bash
# 会加载 .bashrc 里的内容
echo  "Hello world" | ssh -p 2222 username@ip_address "cat >> ~/hello"
```

## 其他

[SSH 命令的三种代理功能（-L/-R/-D）](https://zhuanlan.zhihu.com/p/57630633)
