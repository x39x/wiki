# dap

## adapter

需要为每个语言配置 adapter ，例如

```lua
dap.adapters.debugpy= {
        command = python_path,
        type = "executable",
        args = { "-m", "debugpy.adapter" },
        name = "debugpy",
}
```

adapter 是对应的调试器，配置中需要启动命令，参数，类型等等

## configurations

dap 会从 provider 中加载配置，默认dap.configurations和.vscode/launch.json

可以自定义 provider, see [:help dap](https://github.com/mfussenegger/nvim-dap/blob/5860c7c501eb428d3137ee22c522828d20cca0b3/doc/dap.txt#L1381)

configurations 里给对应adapter配置调试方式，可以指定多个

```lua
local python={}
python[#python + 1] = {
        type = "debugpy",
        name = "Launch File",
        request = "launch",
        program = debug_file,
        pythonPath = python_path,
}
dap.configurations.python = python
```

其中 type 是对应adapter的名称

> 在debugpy等调试器中，并不严格检测type名称，但在vscode-js-debug有多种调试类型的调试器中，type必须严格按照它定义的type来写，如`pwa-node`
> `pwa-chrome`

## launch.json

launch.json attributes see https://code.visualstudio.com/docs/debugtest/debugging-configuration#_launchjson-attributes

每个 adapter 会提供一些扩展配置，去 adapter 文档查看，如：https://github.com/microsoft/debugpy/wiki/Debug-configuration-settings

```json
{
    "$schema": "https://raw.githubusercontent.com/mfussenegger/dapconfig-schema/master/dapconfig-schema.json",
    "version": "0.2.0",
    "configurations": [
        {
            "name": "dap name",
            "type": "adapter name",
            "request": "launch or attach",
            "mode": "debug",
            "program": "debug program",
            "console": "integratedTerminal",
            "env": {},
            "args": []
        }
    ]
}
```
