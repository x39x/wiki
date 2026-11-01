# Tmux

## Tips

tmux 更新后需要 kill all session ，否则会得到`open terminal failed: not a terminal`的错误

## 配置文件

`~/.tmux.conf`

`set = set-option` ,`setw = set-option -w = set-window-option`

-s / -g / -w / -p 决定作用域；

-a 追加，-u 取消；

-g 不是“全局一切”，而是“全局 session / 全局 window”

| 作用域  | 说明                      | 常用命令 |
| ------- | ------------------------- | -------- |
| session | 会话级别                  | set      |
| server  | tmux 服务器级别，全局唯一 | set -s   |
| window  | 窗口级别                  | set -w   |
| pane    | 面板级别                  | set -p   |

- 继承关系

global → session → window → pane

- 没设置的会继承上层
- pane 会继承 window
- window 会继承 global window option
- session 会继承 global session option

## statusbar

```bash
# set-letft Will result in ‘foobar’
set -g status-left "foo"
set -ag status-left "bar"
```

## escape-time

- `set-option -g escape-time 50`

终端标准 VT220 下面，所有光标，功能键都是一系列以 ESC 字符（ascii 码 0x1b）开头的字符串，使用`showkey -a` 查看
设置为 0 可以解决 ESC 键延迟，但当 SSH 连接时，tmux中判断功能键和 ALT+字符会经常失效，设置为 50 毫秒即可解决

## color

- default-terminal

`default-terminal`选项填入tmux内你想要的终端类型，一般为`tmux-256color` or `screen-256color`，优先`tmux-256color`,某些设备不支持`tmux-256color`时使用`screen-256color`

```bash
set-option -g default-terminal "tmux-256color"
set-option -g default-terminal "screen-256color"
```

- terminal-features

`terminal-features`选项填入没有启用tmux时的终端类型，即`echo $TERM`的结果，一般为alacritty 、xterm-kitty 、xterm-256color等

```bash
set-option -a terminal-overrides ",xterm-256color:RGB"
set-option -a terminal-features ',alacritty:RGB'
set-option -a terminal-overrides ",xterm-ghostty:RGB"
# 通配符启用所有终端 RGB
set-option -a terminal-features '*:RGB'
```

```bash
# 兼容老版本 tmux（< 3.2） 使用 terminal-overrides + Tc：
set-option -a terminal-overrides ",alacritty:Tc"
set-option -a terminal-overrides ",XXX:Tc" # XXX means Term kind
```

## Shortcuts & Command

> [!NOTE]  
> 命令可以`Ctrl b :`后执行，如
> `:rename-session [-t current-name] [new-name]`
>
> tmux ls 不会显示session编号

#### Session

| cmd                   | Description      |
| --------------------- | ---------------- |
| `tmux new -s name`    | 新建 session     |
| `tmux attach -t name` | 连接 session     |
| `tmux ls`             | 列出所有 session |
| `Ctrl b + d`          | 分离当前 session |
| `Ctrl b + s`          | 列出当前 session |
| `Ctrl b + $`          | 重命名 session   |

```bash
tmux new -s <session-name>
tmux detach
tmux ls or tmux list-session
tmux attach -t 0 or <session-name>
tmux kill-session -t 0 or <session-name>
tmux switch -t 0 or <session-name>
tmux rename-session -t 0 <new-name>
```

#### Window

| cmd               | Description |
| ----------------- | ----------- |
| `Ctrl b + c`      | 新建win     |
| `Ctrl b + n`      | next        |
| `Ctrl b + p`      | pre         |
| `Ctrl b + number` | 选择 window |
| `Ctrl b + w`      | 列出 window |
| `Ctrl b + ,`      | 重命名      |

```bash
tmux new-window
# 新建一个指定名称的窗口
tmux new-window -n <window-name>

# 切换到指定编号的窗口
tmux select-window -t <window-number>
# 切换到指定名称的窗口
tmux select-window -t <window-name>

tmux rename-window <new-name>
```

#### Pane

| cmd              | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `Ctrl b + o`     | next pane                                            |
| `Ctrl b + ;`     | pre pane                                             |
| `Ctrl b + !`     | 以当前窗口新建 win                                   |
| `Ctrl b + z`     | 全屏当前 pane ，再次使用复原                         |
| `Ctrl b + q`     | 显示窗格编号                                         |
| `Ctrl+b {`       | 当前窗格与上一个窗格交换位置。                       |
| `Ctrl+b }`       | 当前窗格与下一个窗格交换位置。                       |
| `Ctrl+b Ctrl+o`  | 所有窗格向前移动一个位置，第一个窗格变成最后一个窗格 |
| `Ctrl+b Alt+o`   | 所有窗格向后移动一个位置，最后一个窗格变成第一个窗格 |
| `Ctrl b + %`     | 竖分屏                                               |
| `Ctrl b + "`     | 横分屏                                               |
| `Ctrl b + x`     | close                                                |
| `Ctrl b + arrow` | focus                                                |

```bash
tmux split-window
tmux split-window -h/-v

 光标切换到上方窗格
tmux select-pane -U
# 光标切换到下方窗格
tmux select-pane -D
# 光标切换到左边窗格
tmux select-pane -L
# 光标切换到右边窗格
tmux select-pane -R

 # 当前窗格上移
tmux swap-pane -U
# 当前窗格下移
tmux swap-pane -D
```

#### Other

| cmd        | Description             |
| ---------- | ----------------------- |
| `Ctrl b+[` | start copy-mode(q:quit) |

```bash
# 列出所有快捷键，及其对应的 Tmux 命令
tmux list-keys
# 列出所有 Tmux 命令及其参数
tmux list-commands
# 列出当前所有 Tmux 会话的信息
tmux info
# 重新加载当前的 Tmux 配置
tmux source-file ~/.tmux.conf
```
