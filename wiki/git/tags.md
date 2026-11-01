# tags

语义化版本

https://semver.org/lang/zh-CN/

```sh
# show tag
git tag

# 创建附注标签
git tag -a v1.4 -m "my version 1.4"

# 创建轻量标签
- git tag v1.4

# show information of tag
git show tag

# 后期打标签
git tag -a v1.2 9fceb02(校验和或部分校验和)

# 推送tag
git push origin tag

# push all tags
git push origin --tags

# delete local tags
git tag -d tag
git push origin --delete tag
```
