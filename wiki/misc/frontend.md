# 前端

## JavaScript

- https://wangdoc.com
- https://www.zhihu.com/question/62791509

```javascript
var a = 0;
//  无效，var不支持局部作用域，支持函数作用域和全局作用域
{
    var a = 1;
}
console.log(a); // 1
```

```javascript
// 不写 var/let/const 会隐式定义一个全局变量
function f() {
    a = 0;
}
console.log(a); // 0
```

var 定义在函数内的变量只能在函数内使用

```javascript
var a = 1;
function f() {
    var a = 0;
    console.log(a); // 0
}
console.log(a); // 1
```

### [mitt ](https://github.com/developit/mitt)

mitt 是一个轻量级的JavaScript事件总线库

https://blog.ymzhao.work/study/source-code/mitt

### others

- https://github.com/vladocar/nanoJS
- https://github.com/gnat/surreal
- https://github.com/fabiospampinato/cash
- https://github.com/jamiebuilds/the-super-tiny-compiler
