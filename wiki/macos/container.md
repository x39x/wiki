# container

- 专门为 Apple Silicon 优化
- OCI 兼容（能跑大部分 Docker 镜像）
- 每个 container 对应一个轻量 VM，而不是 Docker “一个 Linux VM 里面跑很多容器”

```text
Docker Desktop:
macOS
 └── 一个 Linux VM
      ├── nginx
      ├── postgres
      └── redis

Apple container:
macOS
 ├── 小 VM (nginx)
 ├── 小 VM (postgres)
 └── 小 VM (redis)
```

优点：

- 更安全
- 隔离强
- 网络独立

缺点：

- 理论上开销更大
- orchestration 还不成熟

隔离更强，但目前生态还不如 Docker 完整（如 compose 支持）

## 常用镜像

### debian

- https://hub.docker.com/layers/library/debian/stable-slim/images
- https://hub.docker.com/layers/library/debian/stable/images
- https://hub.docker.com/layers/library/debian/testing-slim/images
- https://hub.docker.com/layers/library/debian/testing/images
- https://hub.docker.com/layers/library/debian/unstable-slim/images
- https://hub.docker.com/layers/library/debian/unstable/images

```bash
# debian 中 slim 一般指精简版
debian:stable-slim
debian:stable
debian:testing-slim
debian:testing
debian:unstable-slim
debian:unstable
```

- https://hub.docker.com/hardened-images/catalog/dhi/debian-base

hardened images，更精简、安全

需要登陆使用，其中fips可能需要收费，目前container不兼容

### alpine

- https://hub.docker.com/_/alpine

alpine 镜像只有几 MB，edge 版是滚动开发分支，如需稳定版应该指定版本号，使用 musl libc，不是 glibc

```bash
alpine:3.22.4
```

### fedora

- https://hub.docker.com/layers/library/fedora/latest/images
- https://hub.docker.com/layers/library/fedora/rawhide/images

arch 没有官方的arm镜像，如果需要使用较新的软件包，推荐 fedora

rawhide 是 development branch ，latest 是最新稳定版

```bash
fedora:latest
fedora:rawhide
```

## 安装

Homebrew 安装：

```bash
brew install  container
```

启动后台服务：

使用 `brew services`管理

```bash
brew services start container
```

When starting container with `brew services`, no kernel is installed
automatically. Install the recommended kernel before running containers:

```bash
container system kernel set --recommended
```

if you don't need a background service you can just run:

```bash
container system start --disable-kernel-install
```

查看状态：

```bash
container system status
```

## 常用命令

### 镜像

- 拉镜像

```bash
container image pull nginx
container image pull name:tag
```

- 查看镜像

```bash
container image ls
```

- 删除镜像

```bash
container image delete name:tag
```

### 容器实例

- 启动

```bash
container start -i <id>
```

`-i` 是 interactive，会重新连进去

- 停止

```bash
container stop id
```

- 查看

```bash
container list
container list -a
```

- 删除

```bash
container rm id
container rm -a
```

## 运行容器

```bash
container run nginx
```

相当于：

```bash
container create ...
container start ...
```

### 后台运行

```bash
container run -d nginx
```

### 指定id

```bash
container run --name my_web nginx
```

## 端口映射

```bash
container run -p 8080:80 nginx
```

然后：

```bash
curl localhost:8080
```

即可访问

## 进入容器

```bash
container exec -it my_web sh
```

### 以交互 shell 启动

```bash
container run -it fedora:rawhide bash
```

无 `-it` 参数通常会直接退出

#### `-i` = interactive

把当前终端的 stdin(fd0) pipe/socket 到 container，让容器里的 bash/sh 可以持续读取输入

默认情况下： `container run alpine sh` 没有交互终端，stdin 接受 EOF，shell 会直接退出

#### `-t` = pseudo tty

分配一个伪终端（PTY） 让 container 觉得： “在真正终端里运行”

否则很多程序会认为： stdout 不是 tty

- 没有颜色
- 没有交互
- readline 不工作
- vim/top/bash 行编辑异常

## 挂载目录

挂当前目录：

```bash
container run \
  -v $(pwd):/workspace \
  -it ubuntu bash
```

容器里：

```bash
cd /workspace
```

## Dockerfile 构建

构建镜像：

```bash
container build --tag myapp --file Dockerfile .
```

运行：

```bash
container run myapp
```

## Tips

### 临时 shell

```bash
container run --rm -it alpine sh
```

退出自动删除。

很适合：

- 测试命令
- 调试网络
- 临时环境

### 看日志

```bash
container logs web
```

实时：

```bash
container logs -f web
```

### 清理所有停止容器

```bash
container prune
```

## 具体使用

### 开发环境

- Node.js

```bash
container run -it \
  -v $(pwd):/app \
  -w /app \
  -p 3000:3000 \
  -v node_modules:/app/node_modules \
  node:22 bash
```

- `-v node_modules:/app/node_modules`

把 container 管理的一块“持久存储空间 node_modules”，挂载到容器里的 `/app/node_modules`

container 会在内部创建类似 `/var/lib/docker/volumes/node_modules/_data` 避免污染宿主机和跨平台问题

### 运行数据库

1. PostgreSQL

```bash
container run -d \
  --name pg \
  -e POSTGRES_PASSWORD=123456 \
  -p 5432:5432 \
  postgres
```

连接：

```bash
psql -h localhost -U postgres
```

2. Redis

```bash
container run -d -p 6379:6379 redis
```
