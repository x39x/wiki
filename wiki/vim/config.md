# config

## 插件

- https://github.com/stevearc/aerial.nvim
- https://github.com/MagicDuck/grug-far.nvim
- https://github.com/mfussenegger/nvim-lint
- https://github.com/windwp/nvim-ts-autotag

## 加载顺序

详细参考：

```vim
:h runtimepath
:h startup
:h ftplugin-overrule
```

1. 设置vim.o.shell
2. 处理启动参数
3. 启动nvim server
4. 等待UI连接
5. Setup |default-mappings| and |default-autocmds|. Create |popup-menu|
6. Enable filetype and indent plugins

    这里是指设置一些autocmd，在打开文件时根据类型加载对应配置，即加载下面两个文件

    ```vim
    :runtime! ftplugin.vim indent.vim
    ```

7. 加载用户配置
8. 文件类型检测

    设置一些检测文件类型的autocmd，即加载以下文件

    ```vim
    :runtime! filetype.lua
    ```

9. 加载syntax文件
10. Set the |v:vim_did_init| variable to 1.
11. 加载runtime里的plugin文件
    1. 先加载vim文件，再加载lua文件
    2. 接着加载pack path里start文件夹里的pack
    3. 最后加载所有runtime（加载完pack后runtime会改变）里的after/plugin文件
    4. `vim.pack.add`里的pack在opt文件夹里，在加载配置文件时由 `vim.pack` 处理

---

`plugin autoload`这两个目录是vimscript插件使用的，其中plugin会在vim启动时加载，autoload里的函数会在调用时加载

nvim plugin 、ftplugin、queries是在[内置runtime目录](https://github.com/neovim/neovim/blob/master/runtime)
中的对应目录加载前加载，after/plugin 是在runtime目录后加载，可以用来覆盖默认设置
