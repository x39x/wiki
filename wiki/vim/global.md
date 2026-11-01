# global cmd

`:global` 可以简写为`:g`，可以对所有匹配到的执行操作

```sh
# 即针对在[range]范围内，所有匹配{pattern}模式的行，执行[command]命令。
:[range]g/{pattern}/[command]
# 命令:g!及其同义词:v，则可以针对所有不匹配模式的行执行操作。即针对在[range]范围内，所有不匹配{pattern}条件的行，执行[command]命令
:[range]g!/{pattern}/[command]
```

如果没有指定[range]，则针对文件中的所有行执行命令。也可以使用行地址，把全局搜索限定在指定的行或行范围内。

[pattern] 是匹配条件，也可以是一个[range]

如果没有指定[command]，则执行:print命令来显示行内容。

整个命令可以理解成，在range范围内匹配pattern的行执行Ex command

常用的Ex command：

- d 删除
- m 移动
- t 拷贝
- s 替换

```sh
# 相关帮助信息：
:h :g
:h range
:h /\@!
:help Ex-commands
```

## 插入

```sh
# 在20行到200行之间，每一行下插入空行
:20,200g/^/put _
```

## 全局查找

```sh
#查找并显示文件中所有包含模式pattern的行，并移动到最后一个匹配处：
:g/pattern

#查找并显示文件中所有包含模式pattern的行：
:g/pattern/p

#查找并显示文件中所有精确匹配单词pattern的行：
:g/\<pattern\>/p

#查找并显示第20到40行之间所有包含模式pattern的行：
:20,40g/pattern/p

#查找并显示文件中所有不包行模式pattern的行，并显示这些行号：
:g!/pattern/nu
```

## 全局删除

```sh
#删除包含模式patternn的行：
:g/pattern/d

#删除不包含模式pattern的行：
:g!/pattern/d

#删除所有空行：
:g/^$/d

#删除所有空行以及仅包含空格和Tab制表符的行：
:g/^[ tab]*$/d

# 在大量删除，指定blackhole寄存器_可以避免拷贝计算提高性能
:g/pattern/d_

#删除指定范围内的文本，例如以下文本中的“DESCRIPTION”部分：
:g/DESCRIPTION/,/PARAMETERS/-1d
```

![global_d](vim_global.png)

## 全局替换

```sh
# 将包含“microsoft antitrust”的行中的“judgment”替换为“ripoff”：
:g/microsoft antitrust/s/judgment/ripoff/

# 将在包含“microsoft antitrust”的前两行及后两行中进行替换：
:g/microsoft antitrust/-2,/microsoft antitrust/+2s/judgment/ripoff/c

# the best of times; the worst of times: end
# 将第1部分文字替换为“The greatest of times;”
:g/end$/s/.*of times;/The greatest of times;/
# -> The greatest of times; the worst of times: end

# 使用 :g 匹配一个范围，接着使用 s（同:% s)在这个范围内替换
# 即在匹配行后添加文字
:g/pattern/s/$/mytext

# 将aaa替换成bbb，除非该行中有ccc或者ddd
:v/ccc\|ddd/s/aaa/bbb/g
```

## 全局移动

```sh
# 将所有的行按相反的顺序排列。其中，查找模式.*将匹配所有行，m0命令将每一行移动到0行之后：
:g/.*/m0

# 以下两条命令均可以将所有不是以数字开头的行，移动到文件末尾
:g!/^[[:digit:]]/m$
:g/^[^[:digit:]]/m$
```

## 全局复制

```sh
# 使用以下命令，可以重复每一行。其中:t或:copy为复制命令：
:g/^/t.

# 将包含模式pattern的行，复制到文件末尾：
:g/pattern/t$

# Win32编译条件提取出来，拷贝到文件末：
g/#ifdef WIN32/+1,/#else\|#endif/-1 t $
```

## 特殊技巧

- 删除偶数行

```sh
:g/^/+1 d
```

这条命令也是匹配所有行，然后隔行删除（其中+1用以定位于当前行的下一行）。 为什么是隔行呢？因为在对第一行执行+1 d命令时删除的是第二行，而第二行虽然也被标记了，但已不存在了， 因此不会执行删除第三行的命令。

也可以用:normal命令实现：

```sh
:%normal! jdd
```

% 指定整个文件，然后依次执行普通模式下的 jdd，即下移删除一行。与 global 命令不同之处在于， %normal! jdd 是按照行号顺序执行，在第一行时删除了第二行，后面的所有行号都减一， 因此在第二行执行 jdd 时删除的是原来的第四行。也就是说，global 命令是通过偶数行标记的消失实现的， 而 normal 命令是通过后续行的自动前移实现的。

- 删除奇数行

normal 命令实现：%normal! dd也同样会删除整个文件，%normal! jkdd即可删除奇数行

## global与substitute

两种思路，:g是匹配后执行操作，:s是搜索替换

```sh
# double所有行
:%s/.*/&\r&/
:g/^/t.
```
