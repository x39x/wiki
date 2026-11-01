# lua

## metatable

lua 的元表是用来改变 table 默认行为的

### `__newindex`

改变字段赋值行为

```lua
local a = {}
改变字段赋值行为
setmetatable(a, {
    __newindex = function(t, key, value)
        print("set: ", key.." ".. value)
        rawset(t, key, value)
    end,
})

a.name = "Tom" -- set: name Tom
```

### `__call`

改变调用行为

```lua
local t = {}
setmetatable(t, {
    __call = function(self, name)
        print("Hello", name)
    end,
})
t("Tom") -- Hello Tom
```

写公共库时很有用

```lua
-- utils.log
local M
setmetatable(t, {
    __call = function(self,...)
        self.print_log(...)
    end,
})

-- when use
local log = require("utils.log")
log("hello",log.level_info)
```

如果不设置 `__call`， 只能这样 `log.print_log(...)` 调用

### `__index`

改变读取行为，foo 中找不到bar，会去 foo `metatable` 的 `__index` 里找，`__index` 可以是表，也可以是函数

1. 如果 `__index` 是表，就从表里寻找 bar
2. 如果 `__index` 是函数，就传入自身和 `key` 执行

```lua
local a = {}
setmetatable(a, {
    __index = {
        color = "red",
    },
})
print(a.color) -- red

-----------------------------------------------------

local t = {}
setmetatable(t,{
    __index = function(t, key)
        -- 可以用来设置未找到 `key` 时的默认行为
        print("no key: ", key)
    end,
})
print(t.a) --  no key: a

```

## 面向对象

lua 可以用 `metatable` 和 `__index` 来模拟面向对象

将一个表的 `__index` 指向自身当作类，在初始化时将这个表设置为实例的 `metatable`

```lua
local Bag = {}
Bag.__index = Bag

function Bag:new()
    local t = {
        items = {},
    }
    return setmetatable(t, self)
end

function Bag:put(item)
    table.insert(self.items, item)
end

function Bag.list(t)
    return t.items
end

local mybag = Bag:new()
mybag:put("hello")
mybag:put("world")

for _, v in ipairs(mybag:list()) do
    print(v)
end

```

### colon

':' 是一个特殊的语法糖

用来定义函数时会隐式传入 self 作为第一个参数

```lua
function Bag:put(item)
    print(self, item)
end
-- 等价于
function Bag.put(self, item)
    print(self, item)
end
```

调用时冒号会把冒号前面的变量作为第一个参数传进去

```lua
my_bag:put("apple")
-- 等价于
my_bag.put(my_bag, "apple")
```

### tips

也可以不将类的 `__index` 设置为自身，只是一般都这样用

除了冒号调用，lua基本没有专门为面向对象设计的特性，只是用已有的特性模拟

```lua
local idx = {
    a = function(t, v)
        print("a: " .. t[v])
    end,
    b = "b: hello",
}

function idx:c(v)
    print("c: " .. self[v])
end

local C = {
    __index = idx,
    __call = function(t, ...)
        t.a(t, ...)
    end,
}

C.new = function()
    local t = {
        i = "apple",
    }
    setmetatable(t, C)
    return t
end

local c = C.new()

c:a("i")
print(c.b)
c:c("i")
c("i")
```

## 其他

### ipairs

`ipairs` 从 1 开始严格按顺序遍历 table，只能遍历数字 `key`，性能比 `pairs` 好

```lua
local t = {
    [1] = 1,
    [2] = 2,
    [4] = 4,
}

for _, v in ipairs(t) do
    print(v)
end
-- 1 2
-- [3] 不存在，会停下
```
