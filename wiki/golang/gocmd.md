# Golang 常用命令与基本配置

```sh
brew install golang
export GOPATH="$HOME/.local/share/golang"
export GO111MODULE=on
```

## Golang 环境变量

> 使用go env查看所有go相关环境变量

1. `GOROOT`:go的安装路径 Eg：`GOROOT=/usr/local/golang`
    - 配置好该环境变量才可以使用 Go toolchain

2. `GOPATH`，go 工作目录，可以有多个
    - 默认路径是\$HOME/go
    - 与 GOROOT 不同，不能把GOPAH设置为GOROOT
    - 下主要包含三个目录：bin(二进制) pkg（编译后文件） src（源码）

3. `GO111MODULE=off|on|auto`，控制go modules 开关
    - on: 模块支持，go会忽略GOPATH和vendor文件夹，只根据go.mod下载依赖
    - off: 无模块支持，go会从GOPATH 和vendor文件夹寻找包
    - auto: 在\$GOPATH/src 外面且根目录有 go.mod 文件时，开启模块支持

4. `GOPROXY` 加速Module依赖下载，使用goproxy.cn代理 (将 GO111MODULE 设置为on)
    - Go 1.13及以上版本:`go env -w GOPROXY=https://goproxy.cn,direct`
    - Go 1.13以下的版本: `export GOPROXY=https://goproxy.cn`

## Go toolchain

1. `go get `
    - 过远程拉取或更新代码包及其依赖包，并自动完成编译和安装 Eg:`go get github.com/davyxu/cellnet`
    - **GO111MODULE = auto | off**时下载的包会安装在GOPATH/src下，import导入非标准包的时候也会从这个目录搜索；
      **GO111MODULE=on**时下载的包会安装在GOPATH/pkg/mod/下，import导入非标准包的时候是从这个目录搜索

2. go mod init

```sh
cd ~/GoProject/xxx
go mod init module_name
```

3. go mod tidy

    tidy会检测该文件夹目录下所有引入的依赖,写入 go.mod 文件，

4. go mod download

    下载依赖至GOPATH下的pkg/mod文件夹中（不安装），同时会在项目根目录下生成 go.sum 文件,

5. go mod vendor

    会将依赖转移至该项目根目录下的 vendor(自动新建) 文件夹下

## go cmd

```sh
# 打印Go语言的环境信息
go env

# 编译并运行命令源码文件
go run

# 可以根据要求和实际情况从互联网上下载或更新指定的代码包及其依赖包，并对它们进行编译和安装
go get

# 编译指定的源码文件或代码包以及它们的依赖包
go build

# 用于编译并安装指定的代码包及它们的依赖包
go install

# 删除掉执行其它命令时产生的一些文件和目录
 go clean

# 打印附于Go语言程序实体上的文档。我们可以通过把程序实体的标识符作为该命令的参数来达到查看其文档的目的
go doc

# 测试
go test

# 列出指定的代码包的信息
go list

# 把指定代码包的所有Go语言源码文件中的旧版本代码修正为新版本的代码
go fix

# 检查Go语言源码中静态错误的简单工具
go vet

# 交互式的访问概要文件的内容
go tool pprof
```
