# 改键

- https://github.com/rvaiya/keyd

keyd在内核劫持物理键盘的输入，但是输出时 `[command alt ctrl shift]`
这些修饰键默认的键值都是左边的，即 `command_r` 也会输出 `command_l` 的键值，
需要在配置文件中指定来修复

```ini
[main]
rightmeta=rightmeta
rightalt=rightalt
rightcontrol=rightcontrol
rightshift=rightshift
```

## 按键模拟

- https://github.com/ReimuNotMoe/ydotool

    https://askubuntu.com/questions/1413829/how-can-i-install-and-use-the-latest-ydotool-keyboard-automation-tool-working-o

- https://github.com/atx/wtype

## Xmodmap

写一个配置文件.Xmodmap放在 `~`下，使用`xmodmap ~/.Xmodmap` 命令加载

```bash
# set Caps_Lock as Control
remove Lock      = Caps_Lock
keysym Caps_Lock = Control_L
add    Control   = Control_L
```

## setxkbmap

添加到bash_profile

```bash
# swap left Control and Caps_Lock
setxkbmap -option ctrl:swapcaps
# set Caps_Lock as Control
setxkbmap -option ctrl:nocaps
# swap alt and super
setxkbmap -option altwin:swap_alt_win
```
