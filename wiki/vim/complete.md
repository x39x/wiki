# complete

insert模式 C-x 有很多补全模式，直接C-n会展示complete设置的所有补全源

`C-y` 接受补全，`C-e`关闭补全

```vim
:h complete
```

### completefunc

直接设置completefunc通过C-x C-u触发，也可以直接 `set complete "F{FUNC2},F{FUNC2}"`设置多个补全函数到默认补全

```vim
:h completefunc
```

### vim.lua_omnifunc()

Omnifunc for completing Lua values from the runtime Lua interpreter, similar to the builtin completion for the `:lua` command. Activate using `set omnifunc=v:lua.vim.lua_omnifunc` in a Lua buffer.

## lsp

lsp 补全有两种方式，`omnifunc/vim.lsp.completion.enable`，

- `omnifunc`会聚合所有client，`vim.lsp.completion`为client单独所有
- 两个是不同的实现，会冲突

```lua
-- Enable completion and configure keybindings.
if client.supports_method(methods.textDocument_completion) then
    vim.lsp.completion.enable(true, client.id, bufnr, { autotrigger = true })

    keymap('<C-n>', function()
        if tonumber(vim.fn.pumvisible()) ~= 0 then
            feedkeys '<C-n>'
        else
            if next(vim.lsp.get_clients { bufnr = 0 }) then
                vim.lsp.completion.trigger()
            end
        end
    end, 'Trigger/select next completion', 'i')
end
```

### vim.lsp.omnifunc()

lsp server 启动时会自动设置这个omnifunc，可使用`set omnifunc?`查看
