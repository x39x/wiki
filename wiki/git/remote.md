# remote

## 查看与设置 Remote URL

```bash
git remote -v                      # 查看所有 remote 的 fetch/push URL
git remote show <name>            # 查看指定 remote 的详细信息
git remote get-url <name>         # 获取 fetch URL
git remote get-url --push <name> # 获取第一个 push URL
git remote get-url --push --all <name> # 获取所有 push URL
```

## 添加多个 push URL 到同一个 remote

```bash
git remote set-url --add --push <name> <url>  # 添加 push URL
```

注意：  
一旦使用 `--push` 设置 URL，Git 会**清除默认的 push 设置**，只保留你手动添加的。

示例（添加 GitHub 和 GitLab）：

```bash
git remote set-url --push github https://github.com/x39x/39link.git
git remote set-url --add  --push github https://gitlab.com/x39x/39link.git
```

## 推送到多个 URL

```bash
git push github <branch>
```

若有多个 push URL，Git 会依次推送到每一个。
