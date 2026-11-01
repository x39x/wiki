# 输入法

## Package

```
fcitx5 fcitx5-gtk fcitx5-qt fcitx5-configtool fcitx5-rime
```

- fcitx5: 输入法基础框架主程序
- fcitx5-gtk: GTK 程序的支持， 修复打字太快漏字的问题
- fcitx5-qt: QT5 程序的支持， 修复打字太快漏字的问题
- fcitx5-rime: RIME 输入法
- fcitx5-configtool: 图形化配置工具

## 环境变量

添加环境变量在 login shell 的配置文件里

纯Wayland环境似乎不添加也不影响，目前未出现问题

## 主题

[fcitx5-themes-candlelight](https://github.com/thep0y/fcitx5-themes-candlelight)

```bash
git clone https://github.com/thep0y/fcitx5-themes.git
# 将想要使用的皮肤复制到该放的位置
cd fcitx5-themes
cp spring ~/.local/share/fcitx5/themes -r
# 修改皮肤配置文件(若没有配置文件则自动创建)：
```

## 基本配置

参考：

- [fcitx](https://fcitx-im.org/wiki/Setup_Fcitx_5/zh-cn)
- [archwiki](https://wiki.archlinuxcn.org/wiki/Fcitx5)

修改 `~/.config/fcitx5/conf/classicui.conf`

```bash
# 垂直候选列表
Vertical Candidate List=False
# 按屏幕 DPI 使用
PerScreenDPI=True
# Font (设置成你喜欢的字体)
Font="Smartisan Compact CNS 13"
# 主题(这里要改成你想要使用的主题名，主题名就在下面)
Theme=spring
```

## fcitx5-rime

1. config file

```bash
$HOME/.local/share/fcitx5/rime
```

2. [rime-ice](https://github.com/iDvel/rime-ice)

https://github.com/iDvel/rime-ice/issues/840

某些发行版可能会缺少 librime-lua，如 fedora 等
