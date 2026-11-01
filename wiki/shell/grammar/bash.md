# bash 扩展

- [pure bash bible](https://github.com/dylanaraps/pure-bash-bible)
- [bash 常见错误](http://mywiki.wooledge.org/BashPitfalls)

“bash 语法”是在 POSIX shell 基础上的扩展

## set

### set

```bash
#子命令失败，整个管道命令就失败，脚本终止执行。搭配 -e 使用
set -o pipefail
#脚本只要发生错误，就终止执行,set +e表示关闭-e选项，set -e表示重新打开-e选项
set -o errexit = set -e
#遇到不存在的变量报错，并停止执行
set -o nounset = set -u
#在运行结果之前，先输出执行的那一行命令行,首以 + 表示
set -o xtrace   = set -x
```

### unset

```bash
# -f 　仅删除函数 -v 　仅删除变量。
unset [-fv][变量或函数名称]
```

## [[]]

```bash
#bash:
[[$a == *.txt]]

# sh 不支持模式匹配
[ "$a" = "*.txt" ]
```

### [ 本质是命令

```bash
[ "$a" = "$b" ]
# 等价于：
test "$a" = "$b"
```

- 空格必须严格
- shell 会先展开变量
- 容易受 glob 影响

### [[ 是 shell 语法

[[$a == *.txt]]

特点：

- 不做 word splitting
- 更安全
- 支持：
    - glob
    - regex
    - &&
    - ||

例如：

```bash
[[$a =~ ^test]]

# POSIX sh 没有 =~
```

## 数组

POSIX shell 只有字符串

```bash
# bash:
arr=(a b c)
echo "${arr[1]}"
```

## (( )) 算术语法

```bash
# bash:
((i++))

#sh：
i=$((i + 1))
```

## function 关键字

```bash
#bash:
function hello() {
    echo hi
}

# POSIX：
hello() {
    echo hi
}
```

## brace expansion

```bash
# bash:
echo {1..5}
# 输出： 1 2 3 4 5
```

## process substitution

```bash
diff <(ls a) <(ls b)
```

## source

在 bash 里 source 是 `.` 的别名，语义更明确

```bash
# bash:
source file.sh

# POSIX：
. file.sh
```

## 字符串替换增强

### 变量替换：`${VAR/pattern/replacement}`

替换变量值中的某个部分。

```sh
PATH="/usr/bin:/bin:/usr/sbin:/sbin"
echo "${PATH/bin/local/bin}"
/usr/local/bin:/bin:/usr/sbin:/sbin
```

### 子字符串：`${VAR:offset:length}`

提取变量值中的子字符串。

```sh
TEXT="Hello, World!"
echo "${TEXT:7:5}"
World
```
