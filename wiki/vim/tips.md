# Tips

[Cheatsheet](https://github.com/skywind3000/awesome-cheatsheets)

[Cheatsheet](https://vim.rtorr.com/lang/zh_cn)

- `Ctrl w o` ：关闭其他所以窗口
- `cc` 清空一行并在合适的缩进位置进入插入模式
- `C-g` show current buffer path

- 10% 移动到文件 10% 处
- 在空白行使用 dip 命令可以删除所有临近的空白行，viw 可以选择连续空白
- 缩进时使用 `>8j >} <ap >ap =i} ==`会方便很多
- 插入模式下，当你发现一个单词写错了，应该多用 CTRL-W 这比 `<BackSpace>` 快
- c d x 命令会自动填充寄存器 "1 到 "9 , y 命令会自动填充 "0 寄存器
- 用 v 命令选择文本时，可以用 o 掉头选择，有时很有用
- 写文章时，可以写一段代码块，然后选中后执行 :!python 代码块就会被替换成结果
- 搜索时可以用 CTRL-R CTRL-W 插入光标下的单词，命令模式也能这么用
- 用 y复制文本后，命令模式中 CTRL-R 然后按双引号 0 可以插入之前复制内容
- 某些情况下 Vim 绘制高亮慢，滚屏刷新慢可以试试 set re=1 使用老的正则引擎

## TODO

- [editorconfig](https://editorconfig.org/)

- `:h channel`
- `vim.async`

可以被多个编辑器读取

## 执行外部命令

- `:!cmd`执行命令行命令把他的stdout指向vim的消息窗口
- `:r !cmd`同样的，只是把输出pipe到你cursor的下一行
- `:w !cmd`把本buffer内容pipe到这个命令的stdin
- `:.!cmd` 把当前行pipe给cmd，再把cmd的stdout输出读回来替换掉当前行
- `:%!cmd` 同上，但是当前buffer,再把cmd的stdout输出读回来替换掉当前buffer
- `:'<'>!cmd`,同上，但是选取区域,再把cmd的stdout输出读回来替换掉所选区域
