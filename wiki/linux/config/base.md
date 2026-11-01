# 新系统基本配置

## audio

- https://wiki.archlinuxcn.org/wiki/WirePlumber
- https://wiki.archlinuxcn.org/wiki/PipeWire
- https://linuxgenie.net/install-pipewire-on-arch-linux/

```sh
pipewire         # 音频、视频流和硬件处理的核心服务
wireplumber      # PipeWire 的会话和策略管理器
pipewire-alsa    # pulse  兼容层
pipewire-pulse   # ALSA 兼容层
```

## 背光调节

https://github.com/Hummer12007/brightnessctl

## 剪切板

- https://github.com/bugaevc/wl-clipboard

    Wayland 的命令行复制/粘贴工具

- https://github.com/bugaevc/wl-clipboard

    Wayland 剪贴板

- https://github.com/sentriz/cliphist

    支持多媒体的 Wayland 剪贴板管理器

配合 wtype

## 截图

- https://github.com/emersion/slurp
- https://git.sr.ht/~emersion/grim/
- https://github.com/jtheoof/swappy

```sh
#  对整个屏幕截屏
grim 截屏.png
# 在 Sway 中对当前窗口截屏
swaymsg -t get_tree | jq -r '.. | select(.focused?) | .rect | "\(.x),\(.y) \(.width)x\(.height)"' | grim -g - 截屏.png
# 在 Hyprland 中对当前窗口截屏
hyprctl -j activewindow | jq -r '"\(.at[0]),\(.at[1]) \(.size[0])x\(.size[1])"' | grim -g - 截屏.png
# 对选区截屏
slurp | grim -g - 截屏.png
# 对选区截屏并使用 wl-clipboard包 将结果存入剪贴板
slurp | grim -g - - | wl-copy

# swappy 编辑图片
grim -g "$(slurp)" - | swappy -f -
swappy -f "~/Desktop/my-gnome-saved-file.png"
# Grab a swappshot from a specific window under Sway, using swaymsg and jq:
grim -g "$(swaymsg -t get_tree | jq -r '.. | select(.pid? and .visible?) | .rect | "\(.x),\(.y) \(.width)x\(.height)"' | slurp)" - | swappy -f -
```

## 屏幕录制

- https://github.com/ammen99/wf-recorder

```sh
# 对整个屏幕录屏
wf-recorder -f recording.mp4
# 对选区录屏
wf-recorder -g "$(slurp)"
```

- https://wiki.archlinuxcn.org/wiki/%E5%B1%8F%E5%B9%95%E6%8D%95%E8%8E%B7#Wayland

## 多媒体

### 图片查看

- https://sr.ht/~exec64/imv/
- https://github.com/artemsen/swayimg

### 音乐播放

- https://wiki.archlinux.org/title/Music_Player_Daemon

### 视频播放

- https://github.com/mpv-player/mpv

## 防火墙

- https://wiki.archlinux.org/title/Nftables

- https://wiki.archlinux.org/title/Firewalld

- https://wiki.archlinux.org/title/Uncomplicated_Firewall

## TODO

- https://github.com/elkowar/eww

    桌面小组件

- https://github.com/emersion/mako
- https://github.com/dunst-project/dunst

    通知

- https://github.com/coffeeispower/woomer

    Zoomer application for Wayland inspired by tsoding's boomer

- https://github.com/hyprwm/hyprpicker

    Wayland color picker

- https://gitlab.com/chinstrap/gammastep

    自动调节屏幕色温

---

## arch pack

```sh
# sys
linux 6.15.2.arch1-1
linux-firmware 20250508.788aadc8-2
base 3-2
base-devel 1-2
# hw
intel-ucode 20250512-1
vulkan-intel 1:25.1.3-3

# ctr
iwd 3.9-1
brightnessctl 0.5.1-3
# yay
archlinuxcn-keyring 20250531-1
yay 12.5.0-1
###
daed 1.0.0-1
# wm
sway 1:1.11-1
swaybg 1.2.1-1
swayidle 1.8.0-2
swaylock 1.8.2-1
i3blocks 1.5-4
tofi 0.9.1-3
mako 1.10.0-1
# uf
swappy 1.5.1-2
slurp 1.5.0-1
grim 1.4.1-3
wl-clipboard 1:2.2.1-2
cliphist 1:0.6.1-1
wtype 0.4-2
# im
fcitx5 5.1.12-1
fcitx5-gtk 5.1.3-1
fcitx5-qt 5.1.9-6
fcitx5-rime 5.1.10-1
# media
mpv 1:0.40.0-3
imv 4.5.0-5
# xx
unzip 6.0-22
man-db 2.13.1-1
openssh 10.0p1-3
nodejs-lts-jod 22.16.0-1
pnpm 11.4.1-1
```
