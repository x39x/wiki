# overseer

- 定义task

```lua
local task = overseer.new_task({
    cmd = vim.fn.expandcmd(cmd),
    components = {
        {
            "on_output_quickfix",
            errorformat = vim.o.grepformat,
            open = not params.bang,
            open_height = 8,
            items_only = true,
        },
        -- We don't care to keep this around as long as most tasks
        { "on_complete_dispose", timeout = 30 },
        "default",
    },
})
task:start()
```

基本不用，主要以下两种方法生成

在`overseer.template`文件里定义的 `definition`和`provider` 默认 lazyload 调用命令时才会触发运行

## definition

根据条件生成task

```lua
return {
  -- Required fields
  name = "Some Task",
  builder = function(params)
    -- This must return an overseer.TaskDefinition
    return {
      -- cmd is the only required field. It can be a list or a string.
      cmd = { "echo", "hello", "world" },
      -- additional arguments for the cmd (usually only useful if cmd is a string)
      args = {},
      name = "Greet",
      cwd = "/tmp",
      components = {  "default" },
      -- arbitrary table of data for your own personal use
      metadata = {
        foo = "bar",
      },
    }
  end,
  -- Tags can be used in overseer.run_task()
  tags = {overseer.TAG.BUILD},
  params = {
    -- 定义需要参数的类型，执行task时会根据类型 select/input
    -- See :help overseer-params
  },
  condition = {
    filetype = { "c", "cpp" },
    dir = "/home/user/my_project",
  },
}
```

## providers

动态生成多个task

```lua
return {
    generator = function(search)
        -- ...
        -- return a list of tasks
        return {...}
    end,
    --....
    -- 缓存标志，相同就使用缓存
    cache_key = function(opts)
        return vim.fs.find("Makefile", { upward = true, type = "file", path = opts.dir })[1]
    end,
}
```

## hook

```lua
-- name 是 template 名，module 是 template 文件名
-- opts: module / name, filetype, dir, tag
overseer.add_template_hook({ module = "^make", filetype = "c" }, function(task_defn, util)
		util.add_component(task_defn, { "on_output_parse", problem_matcher = "$gcc" })
		util.add_component(task_defn, { "on_result_diagnostics_quickfix", close = true, open = true })
end)
```

## setup

```lua
disable_template_modules = {
    -- 这里拿到的是template文件基于runtimpath的完整路径，可以基于此过滤
    -- 比如默认位于 overseer.nvim/lua/的 "overseer.template.make",
    -- 如果有需要配置时可以 lua/overseer/user/template/make.lua，根据命名空间过滤

    -- 必须用^开头才能触发正则过滤，否则是判断是否相等
    -- "^.*cargo",
},
```

## run

可以根据不同条件过滤

```lua
-- Run the task named "make all"
-- equivalent to :OverseerRun make\ all
overseer.run_task({name = "make all"})
-- Run the default "build" task
-- equivalent to :OverseerRun BUILD
overseer.run_task({tags = {overseer.TAG.BUILD}})
-- Run the task named "serve" with some default parameters
overseer.run_task({name = "serve", params = {port = 8080}})
-- Create a task but do not start it
overseer.run_task({name = "make", autostart = false}, function(task)
    -- do something with the task
end)
-- Run a task and immediately open the floating window
overseer.run_task({name = "make"}, function(task)
    if task then
        overseer.run_action(task, 'open float')
    end
end)
```
