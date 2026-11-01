# 缩写

缩写在你输入“单词结束符”时触发，比如：

- 空格
- 回车
- tab
- `.` `,` `;` `:` `)` `]` 等标点

## iabbrev/iab

只在 **Insert 模式** 生效：

```vim
:iab btw by the way
```

## cabbrev/cab

只在 **命令行模式** 生效（: / ? ）

```vim
:cab W w
:cab Q q
:cab Wq wq
```

## abbrev/ab

默认同时作用于 Insert 和 Command-line

## 查看当前所有缩写

```vim
:ab
:iab
:cab
```

## 删除缩写

删除某一个：

```vim
:iunab foo
:cunab W
:unab foo
```

删除所有 insert 缩写：

```vim
:iabclear
```

## buffer-local 缩写

```vim
:iabbrev <buffer> rt return
```

## expr 缩写

Neovim/Vim 支持用表达式决定展开内容

```vim
:iabbrev <expr> dt strftime("%Y-%m-%d")
"2026-05-05
```
