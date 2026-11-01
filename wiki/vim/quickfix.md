## quickfix

localfix 就是针对某个buffer的quickfix，只能在指定buffer打开，几乎没用

使用`vimgrep options *.html / grep options *.lua`会把结果发送到quickfix窗口里

- cope : copen
- ccl : cclose
- cn : cnext ]q
- cp : cprev [q
- cdo : 给每个quickfix结果执行
- caddfile/caddbuffer/caddexpr : 加载错误信息

more see :h fuickfix

## make

make 会把错误信息发送到quickfix，

make默认是执行make命令，可以通过makeprg设置，比如 set makeprg=go\ build，

可以在make后追加参数，比如make test 、make %

quickfix 接受错误信息的格式要通过errorformat设置

runtime/compiler里设置一些常见编译器/lint的makeprg和errorformat，可以通过compiler xxx命令启用，如compiler cargo
