# sway

- i3blocks
- swaybg
- swaylock
- swayidle
- tofi

## Input

- 查看设备名称。

```sh
swaymsg -t get_inputs

# 输出类似这样：
{
    "identifier": "1133:16450:Logitech_USB_Receiver",
    ...
}
```

- 调试

```sh
xkbcli interactive-wayland
```

- 键盘

    https://www.reddit.com/r/swaywm/comments/1b8hw3u/using_super_l_and_super_r_as_two_distinct/

- 鼠标、触控板

```sh
# accel_profile: #设置加速模式，adaptive（动态加速）或 flat（恒定速度）
# pointer_accel: #设置加速度，范围通常是 -1.0 到 1.0
# natural_scroll enabled # 是否启用自然滚动方向
# scroll_factor 1.5 # 滚轮滚动速度倍数（不一定所有设备都支持）
input "1133:16450:Logitech_USB_Receiver" {
    accel_profile "adaptive"
    pointer_accel 0.3
    natural_scroll enabled
}
```
