# zip

解压缩名为 filename.zip 的 ZIP 文件，并将其内容提取到名为 directory_name 的新文件夹中，如果目录不存在，它会被创建

```bash
unzip filename.zip -d directory_name
```

这将创建名为 archive.zip 的 ZIP 文件，并将 file1、file2 和 file3 添加到其中。你还可以指定目录，以压缩整个目录及其内容：

```bash
zip archive.zip file1 file2 file3
```
