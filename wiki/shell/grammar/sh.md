# 语法

- [pure sh bible](https://github.com/dylanaraps/pure-sh-bible)

## 重定向

```bash
# '>' 将shell命令所得 stdout 去某文件
ls > ls_out

# '<' 将文件内容 stdin 命令
grep out < grep_in
```

## 单引号双引号

1. 单引号（' '）：单引号内的内容会被原样保留，不进行变量替换或命令替换。

2. 双引号（" "）：双引号内的内容会进行变量替换和命令替换。

例如：

```bash
$ echo '$(date)'
$(date)

$ echo "$(date)"
Mon Jul  1 12:34:56 UTC 2024
```

## shell 中变量的使用

`${VAR}` 和 `$VAR`：用于引用变量的值。`${VAR}` 提供了更多的灵活性，可以在变量名后紧跟其他字符时避免混淆。

`$(VAR)`：用于命令替换，将命令的输出赋值给变量或用于其他地方。

### 直接使用变量：`$VAR`

这是最常见的用法，用于直接引用变量的值。

```sh
NAME="Alice"
echo "Hello, $NAME!"
Hello, Alice!
```

### 使用大括号：`${VAR}`

使用 `${VAR}` 可以避免变量名和后续字符混淆，并且允许在变量扩展中使用一些特性。

```sh
NAME="Alice"
echo "Hello, ${NAME}!"
Hello, Alice!
```

避免混淆：

```sh
NAME="Alice"
echo "${NAME}123"  # 明确表示变量名结束
Alice123

# 如果不使用大括号，可能会产生混淆：
echo "$NAME123"  # 这里会尝试查找变量 NAME123
```

### 获取变量长度：`${#VAR}`

```sh
TEXT="Hello, World!"
echo "${#TEXT}"
13
```

### 移除前缀或后缀：`${VAR#pattern}` 和 `${VAR%pattern}`

移除最短匹配的前缀：

```sh
FILE="archive.tar.gz"
echo "${FILE#*.}"
tar.gz
```

移除最短匹配的后缀：

```sh
echo "${FILE%.*}"
archive.tar
```

### 移除最长匹配的前缀或后缀：`${VAR##pattern}` 和 `${VAR%%pattern}`

移除最长匹配的前缀：

```sh
echo "${FILE##*.}"
gz
```

移除最长匹配的后缀：

```sh
echo "${FILE%%.*}"
archive
```

### 默认值：`${VAR:-default}`

| Parameter      | What does it do?                                          |
| -------------- | --------------------------------------------------------- |
| ${VAR:-STRING} | If VAR is empty or unset, use STRING as its value.        |
| ${VAR-STRING}  | If VAR is unset, use STRING as its value.                 |
| ${VAR:=STRING} | If VAR is empty or unset, set the value of VAR to STRING. |
| ${VAR=STRING}  | If VAR is unset, set the value of VAR to STRING.          |

如果变量未设置或为空，可以使用默认值。

```sh
echo "${USERNAME:-guest}"
```

如果 `USERNAME` 未设置或为空，则输出 `guest`。

### 检查变量是否设置：`${VAR:+value}`

| Parameter      | What does it do?                              |
| -------------- | --------------------------------------------- |
| ${VAR:+STRING} | If VAR is not empty, use STRING as its value. |
| ${VAR+STRING}  | If VAR is set, use STRING as its value.       |

如果变量不为空，就使用 `value`，否则不进行任何替换。

```sh
USERNAME="Alice"
echo "${USERNAME:+User is set}"
User is set
```

如果 `USERNAME` 未设置，则不输出任何内容。

### 检查变量是否为空：`${VAR:?error message}`

| Parameter      | What does it do?                    |
| -------------- | ----------------------------------- |
| ${VAR:?STRING} | Display an error if empty or unset. |
| ${VAR?STRING}  | Display an error if unset.          |

如果变量未设置或为空，则打印错误消息并退出。

```sh
USERNAME="Alice"
echo ${USERNAME:?USERNAME is not set}
Alice
```

如果 `USERNAME` 未设置或为空，则输出：

```
bash: USERNAME: USERNAME is not set
```

## printf

不使用引号将变量传递给 printf，当变量值包含空格或其他特殊字符时，printf 命令会将其视为多个参数，而不是单个参数。

```bash
printf "$desktop_path"
```

## 引号、反引号

```sh
#  `` 中内容优先执行
str=`echo 'Hello World'`
```
