# 配置｜配置文件加载

## 切换shell

```bash
echo $SHELL
cat /etc/shells #add /bin/zsh
chsh -s /bin/zsh
```

需要重启或重新登录

## bash/zsh配置文件读取规则

![config load](config_load.png)

> 非常纯粹的屎 交互推荐使用fish 脚本推荐使用python

### 登陆shell

#### bash

`etc/profile` / `etc/profile.d`是系统级，

`~/.bash_profile`->`~/.bash_login`->`~/.profile` 为用户级，读取到任意一个就会停止不会重复加载

> [!NOTE]
> tty/ssh 遵循 login shell 规则不会自动读取 bashrc

#### zsh

zprotfile: just login , zshenv: always

`.zlogin` and `.zlogout`

- [参考](https://unix.stackexchange.com/a/71258)

### 非登陆intertive shell

- bash 只加载bashrc

- zsh: `/etc/zshenv`->`~/.zshenv`->`~/.zshrc`

### MacOS

Linux中GUI（例如sway）一般在login
shell的配置中启动，它会自动继承（如bash_profile中）环境变量，所以在Linux的GUI下打开一个新的终端模拟器窗口它也会自动从桌面环境/窗口管理器中继承环境变量，但MacOS的GUI不通过shell启动，它有自己的启动/加载全局配置的方式，因此macOS中打开新终端会以login
shell的方式启动，否则无法加载
一些预设的环境变量（如bash_profile），这与终端模拟器的实现有关，默认终端/Ghostty/Alacritty遵循这一行为

- [参考](https://ghostty.org/docs/help/macos-login-shells)

## zsh config

```sh
setopt emacs
setopt AUTO_CD
unsetopt BEEP
export CLICOLOR=1
export PS1=$'\n%n@%m:\e[0;34m%~\e[0m\n$ '
```
