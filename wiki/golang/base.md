# 基础

[Go代码风格](https://google.github.io/styleguide/go)

[Gomail is a simple and efficient package to send emails](https://github.com/go-gomail/gomail)

[Go 语言数据库/存储项目推荐](https://roseduan.github.io/p/go-%E8%AF%AD%E8%A8%80%E6%95%B0%E6%8D%AE%E5%BA%93/%E5%AD%98%E5%82%A8%E9%A1%B9%E7%9B%AE%E6%8E%A8%E8%8D%90/)

## Tips

1. package

    在同一个 package name 下可以理解为在同一个go文件中

    同一个 package name 下函数等可以直接使用无需引用

2. 引用本地包

```go
//module模式
import api "module_name/api"
//关闭module模式时
import api "./api"
```

3. 同一个文件夹下只能存在一个package name

## 变量和常量

#### 声明变量

```go
package main
import "fmt"
var a, b, c int
var (
    a1 int
    b1 float64
)
//这种不带声明格式的只能在函数体中出现
//g, h := 123, "hello"
func main() {
    d, e := 1, "one"
    fmt.Println(d,e)
}
```

#### 常量

1. 同时声明多个常量时，如果省略了值则表示和上面一行的值相同 如下 n2 n3都等于100

```go
const (
    n1 = 100
    n2
    n3
)
```

2. iota

    iota是go语言的常量计数器，只能在常量的表达式中使用。
    iota在const关键字出现时将被重置为0。const中每新增一行常量声明将使iota计数一次(iota可理解为const语句块中的行索引)。
    使用iota能简化定义，在定义枚举时很有用。

```go
const (
    n1 = iota //0
    n2        //1
    _         //_
    n         //3
)
const (
    n4 = iota //0
    n5        //1
)
const (
    n1 = iota //0
    n2 = 100  //100  可以中间插队
    n3 = iota //2
    n4        //3
)
```

- 定义数量级（这里的\<\<表示左移操作，1\<\<10表示将1的二进制表示向左移10位，也就是由1变成了10000000000，
  也就是十进制的1024。同理2\<\<2表示将2的二进制表示向左移2位，也就是由10变成了1000，也就是十进制的8。）

```go
const (
    _  = iota
    KB = 1 << (10 * iota)
    MB = 1 << (10 * iota)
    GB = 1 << (10 * iota)
    TB = 1 << (10 * iota)
    PB = 1 << (10 * iota)
)
```

    - 多个iota定义在一行

```go
const (
    a, b = iota + 1, iota + 2 //1,2
    c, d                      //2,3
    e, f                      //3,4
)

```

## 基本数据类型

| 类型         | 长度/字节 | 默认值 | 说明                                 |
| ------------ | --------- | ------ | ------------------------------------ |
| bool         | 1         | false  |                                      |
| byte         | 1         | 0      | uint8                                |
| rune         | 4         | 0      | Unicode Code Point, int32            |
| int uint     | 4 or 8    | 0      | 32 或 64 位                          |
| int8 uint8   | 1         | 0      | -128 \~ 127, 0 \~ 255，byte:uint8    |
| int16 uint16 | 2         | 0      | -32768 \~ 32767, 0 \~ 65535          |
| int32 uint32 | 4         | 0      | -21亿 \~ 21亿, 0 \~ 42亿，rune:int32 |
| int64 uint64 | 8         | 0      |                                      |
| float32      | 4         | 0.0    |                                      |
| float64      | 8         | 0.0    |                                      |
| complex64    | 8         |        |                                      |
| complex128   | 16        |        |                                      |
| uintptr      | 4 or 8    |        | 以存储指针的 uint32 或 uint64 整数   |
| array        |           |        | 值类型                               |
| struct       |           |        | 值类型                               |
| string       |           | ""     | UTF-8 字符串                         |
| slice        |           | nil    | 引用类型                             |
| map          |           | nil    | 引用类型                             |
| channel      |           | nil    | 引用类型                             |
| interface    |           | nil    | 接口                                 |
| function     |           | nil    | 函数                                 |

### 整型

按长度分为：int8、int16、int32、int64对应的无符号整型：uint8、uint16、uint32、uint64，
其中，uint8就是byte型，int16对应C语言中的short型，int64对应C语言中的long型。

#### 浮点型

Go语言支持两种浮点型数：float32和float64。这两种浮点型数据格式遵循IEEE 754标准： float32的浮点数的最大范围约为3.4e38，
可以使用常量定义：math.MaxFloat32。 float64 的浮点数的最大范围约为 1.8e308，可以使用一个常量定义：math.MaxFloat64。

#### 复数

complex64和complex128，复数有实部和虚部，complex64的实部和虚部为32位，complex128的实部和虚部为64位。

#### 字符串

Go语言中的字符串以原生数据类型出现，使用字符串就像使用其他原生数据类型（int、bool、float32、float64 等）一样。
Go 语言里的字符串的内部实现使用UTF-8编码。 字符串的值为双引号(")中的内容，可以在Go语言的源码中直接添加非ASCII码字符;

Go语言中要定义一个多行字符串时，就必须使用**反引号**字符,但是所有的转义字符均无效，文本将会原样输出;
Go 语言的字符串常见转义符包含回车、换行、单双引号、制表符等，如下

| _转义_ | _含义_             |
| ------ | ------------------ |
| `\r`   | 回车符（返回行首） |
| `\n`   | 换行符             |
| `\t`   | 制表符             |
| `\'`   | 单引号             |
| `\"`   | 双引号             |
| `\\`   | 反斜杠             |

#### byte和rune

字符用单引号包裹起来，Go语言的字符有以下两种；uint8类型，或者叫 byte 型，代表了ASCII码的一个字符；
rune类型，代表一个 UTF-8字符。 当需要处理中文、日文或者其他复合字符时，则需要用到rune类型。

**rune类型实际是一个int32**，Go使用了特殊的 rune 类型来处理 Unicode，让基于Unicode的文本处理更为方便，也可以使用byte型进行默认字符串处理，性能和扩展性都有照顾

**NOTE:** UTF8编码下一个中文汉字由3~4个字节组成，所以我们不能简单的按照字节去遍历一个包含中文的字符串

#### 修改字符串

字符串底层是一个byte数组，所以可以和[]byte类型相互转换。字符串是不能修改的字符串是由byte字节组成，所以字符串的长度是byte字节的长度。 **rune**类型用来表示utf8字符，一个rune字符由一个或多个byte组成")。

要修改字符串，需要先将其转换成[]rune或[]byte，完成后再转换为string。无论哪种转换，都会重新分配内存，并复制字节数组。

**Go语言中只有强制类型转换，没有隐式类型转换。该语法只能在两个类型之间支持相互转换的时候使用。强制类型转换的基本语法：T(v)**

```go
func CString() {
        s := "hello"
        b := []byte(s)
        b[0] = 'H'
        fmt.Println(string(b))
        s0 := "你好"
        b0 := []rune(s0)
        b0[0] = '我'
        fmt.Println(string(b0))
}
```
