# ACL 权限管理

ACL（Access Control List）用于为特定用户或组设置精细化访问权限

优于传统 Unix 权限（user/group/other 三段式）

## 查看文件 ACL

```sh
ls -le file.txt
```

- 输出示例：

```sh
-rw-r-----+ 1 root  wheel  1675 Apr 25 16:20 id_rsa
 0: user:user1 allow read
```

## 添加 ACL 条目

```sh
sudo chmod +a "user1 allow read" file.txt
```

- 格式说明：

```sh
chmod +a "<user|group>:<name> <allow|deny> <permissions>" file
```

- 示例：

```sh
chmod +a "user1 allow read,write" file.txt
chmod +a "group:staff deny delete" file.txt
```

## 删除指定 ACL 条目

1. 查看 ACL 编号：

```sh
ls -le file.txt
```

2. 删除第 N 条 ACL（如第 0 条）：

```sh
sudo chmod -a# 0 file.txt
```

## 移除所有 ACL 条目

```sh
sudo chmod -N file.txt
```

## 支持的权限（常用）

| 权限         | 含义           |
| ------------ | -------------- |
| read         | 读取内容       |
| write        | 修改内容       |
| execute      | 执行或访问目录 |
| delete       | 删除文件       |
| add_file     | 向目录添加文件 |
| delete_child | 删除子文件     |
