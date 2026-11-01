# Makefile

- https://seisman.github.io/how-to-write-makefile/
- https://gavinliu6.github.io/Makefile-Tutorial-zh-CN/
- https://modern-cmake-cn.github.io/Modern-CMake-zh_CN/

> Makefile可以使用 bear 工具生成`compile_commands.json`文件

```bash
# 指定输出 json 文件位置和编译命令
bear --output build/compile_commands.json -- make
```

## Makefile 三要素

```make
目标:依赖
        执行语句
```

## 变量通配符与 wildcard 函数

- 在 Makefile 中`$(function arguments)`的写法用于函数调用，wildcard
  的用法如下：

```make
$(wildcard pattern)
$(wildcard *.c) # ‘*’匹配任意长度的任意字符，
SRC := $(wildcard *.c) # 利用变量
```

- 使用变量时也需要 `$()`

```make
main: $(SRC)
	clang  $(SRC) -o main
```

## 变量的赋值与修改

- `:=` 简单赋值，同其他语言中的`=`

```make
x := foo
y := $(x) bar # foo bar
x := later    # later
```

- `=` 递归赋值，会优先展开变量的引用

```make
x := foo
y  = $(x) bar # later bar
x := later    # later
```

- `+=` 附加赋值，向后添加（appending）

```make
objects = main.o
objects += another.o  # main.o another.o
```

- `?=` 条件赋值，仅在值没有被建立的情况下创建值

```make
foo := ugh
foo ?= Huh # foo最终为ugh
```

## 复杂目录结构

- 使用 `foreach` 函数遍历列表添加

```make
SUBDIR := .
SUBDIR += ./func

# 等效于EXPANDED := ./*.c ./func/*.c
EXPANDED := $(foreach dir,$(SUBDIR),$(dir)/*.c)
```

## 保存`*.o`文件

> 注意依赖，最先生成的放在最后，最后生成的放在最前面

- `%`通配符

```make
%.o : %.c
        gcc -c $(INCS) $< -o $@
```

第一个`%`是匹配 Makefile 命令所有以`.o`结尾的的目标或依赖，第二个`%`的作用是将`%.o`中`%`的内容挪过来，
自动变量`$>`是指依赖表中的第一个依赖，`$@`指目标

- 替换函数`patsubst`

```make
#匹配 text 文本中与 pattern 部分，并替换为 replacement
$(patsubst pattern,replacement,text)
$(patsubst %.c,%.o,$(SRCS))
```

- `dir`函数

```Makefile
#递归返回文件的所有路径
$(dir ./output/func/bar.o)
# output/ output/func
```

- 保存`*.o`到指定目录

```make
# Makefile
SUBDIR := ./
SUBDIR += ./fun/

BIN:=./bin/

INCL := $(foreach dir, $(SUBDIR),-I$(dir))
SRCS := $(foreach dir,$(SUBDIR),$(wildcard $(dir)*.c))
OBJS :=$(patsubst %.c,$(BIN)%.o,$(SRCS))

main: $(OBJS)
	clang $(OBJS) -o main

$(BIN)%.o:%.c
	mkdir -p $(dir $@)
	gcc -c $(INCL) $< -o $@
```

## 伪目标与简化输出

一些不生成 target 的命令（如 clean），若是目录下有同名文件，
则会执行失败，为了解决这一问题，可以将其添加为伪目标`.PHONY`的依赖；
在 Makefile 命令前添加`@`符号则会在执行时隐藏

```make
OUTPUT := ./output
clean:
        @rm -r $(OUTPUT)
        echo "clean success"
.PHONY : clean
#make clean 终端执行结果如下
#echo "clean success"
#clean success
```

## 自动生成依赖

为 gcc/clang 添加`-MP`选项，这会为每个依赖添加一个没有任何依赖的伪目标。可以有效避免删除头文件时，Makefile 因找不到目标来更新依赖所报的错误;
添加`-MMD`选项，自动生成记录有依赖关系的`*.d`文件

在 Makefile 中用`include`引入依赖关系，在命令前添加`-`，忽略错误（第一次编译时还没有生成`*.d`文件）

```make
SUBDIR := ./
SUBDIR += ./fun/

BIN:=./bin/

INCL := $(foreach dir, $(SUBDIR),-I$(dir))
SRCS := $(foreach dir,$(SUBDIR),$(wildcard $(dir)*.c))
OBJS := $(patsubst %.c,$(BIN)%.o,$(SRCS))
DEPS := $(patsubst %.c,$(BIN)%.d,$(SRCS))

main: $(OBJS)
	clang $(OBJS) -o main

$(BIN)%.o:%.c
	@mkdir -p $(dir $@)
	clang -MMD -MP -c $(INCL) $< -o $@ #*.d 与 *.o 文件在同一目录下

clean:
	@rm -r $(BIN)
	@rm ./main
	@echo "clean success"


.PHONY : clean

-include $(DEPS)

```

## 模板

```make
ROOT := $(shell pwd)

SUBDIR := $(ROOT)
SUBDIR += $(ROOT)/func

TARGET := main
OUTPUT := ./output

INCS := $(foreach dir,$(SUBDIR),-I$(dir))
SRCS := $(foreach dir,$(SUBDIR),$(wildcard $(dir)/*.c))
OBJS := $(patsubst $(ROOT)/%.c,$(OUTPUT)/%.o,$(SRCS))
DEPS := $(patsubst %.o,%.d,$(OBJS))

$(TARGET) : $(OBJS)
        @echo linking...
        @gcc $(OBJS) -o $@
        @echo complete!

$(OUTPUT)/%.o : %.c
        @echo compile $<...
        @mkdir -p $(dir $@)
        @gcc -MMD -MP -c $(INCS) $< -o $@

.PHONY : clean

clean:
        @echo try to clean...
        @rm -r $(OUTPUT)
        @echo complete!

-include $(DEPS)
```
