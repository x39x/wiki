# proxy

## rules

- [SukkaW rules](https://github.com/SukkaW/Surge)
- [meta rules](https://github.com/MetaCubeX/meta-rules-dat)

## sb

- [template](https://github.com/LongLights/sing-box_template_merge_sub-store)

可将set_system_proxy设为true，自动设置系统代理

### 局域网 dns

监听局域网 dns 请求需要添加入站，[参考](https://github.com/SagerNet/sing-box/issues/2729)

```jsonc
"inbounds": [
    //........
    {
        "tag": "dns-in",
        "type": "direct",
        "listen": "::",
        "listen_port": 53,
        "network": "udp"
    }
    //........
]
```

## 软路由

路由器常用芯片：rk mtk

- rk：

    常用于机顶盒等嵌入式设备，有图形处理加速（电视等） 高性能rk系列也有加密算法扩展

- mtk（mediatek）

    常用于路由器，有网络转发硬件加速 不适合软路由（cpu差，代理用不了转发加速）

- x86

    n150/n355(2025发布）

## tips

传统的 HTTP 或者 SOCKS5 代理都是可以直接用域名建立连接的，应用发起请求的时候不需要 dns 解析得到 ip ，直接用域名向代理发起连接请求，这样可以充分利用代理的域名分流能力 ，但会有程序不遵循系统代理

tun 使用虚拟网卡，其它程序并不知道自己使用了代理，需要先进行 dns 解析得到 IP ，再用 IP 建立连接，这样相比传统代理会带来一些麻烦

1. 需要分两步处理请求，先接管 dns 解析，再接管后续的的连接
2. 第二步连接时代理拿到的是 ip ，没有域名，无法实现域名分流， 可通过“域名嗅探”，从应用层的 http/tls 里的信息来获取域名

fake-ip 模式下 tun 接管 dns 解析后返回一个 fake ip ，拿到 fake ip 建立实际连接的时通过映射关系还原域名

但 fake ip 会进入系统 dns 缓存，如果关掉代理之后可能会上不了网，需要清除系统的 dns 缓存

- [Report](https://gfw.report)
- [代理实现](https://imciel.com/2020/08/27/create-custom-tunnel/)
- [ssr 的前世今生](https://shadowsockshelp.github.io)

- [xtls 文档](https://xtls.github.io/)
- [xtls reality](https://github.com/XTLS/REALITY)

- [内核字段介绍](https://core-tutorial.argsment.com/zh)
- [Meta 完整配置示例](https://github.com/MetaCubeX/mihomo/blob/Meta/docs/config.yaml)
- [Surge 配置](https://blog.skk.moe/post/i-have-my-unique-surge-setup/)
- [Nginx](https://www.zhihu.com/question/21483073/answer/2252761291)
