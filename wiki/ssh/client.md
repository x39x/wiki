# Client

Client 一般指自己的电脑

## 基本使用

```bash
# -p 指定端口。
ssh -p 2222 user1@@xxx.xxx.xxx.xxx
```

配置好公钥、私钥后免密连接

## 别名

```bash
# ~/.ssh/config 文件
Host shortName
        HostName xxx.xxx.xxx.xxx
        User user1
        Port 2222
        IdentityFIle ~/.ssh/id_rsa # 私钥
```

使用 `ssh shortName` 即可连接
