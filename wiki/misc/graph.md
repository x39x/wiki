# 渲染

## 资料

- https://github.com/love2d/love

专注于2d的游戏引擎，小丑牌基于此，lua

- https://github.com/raysan5/raylib

基于OpenGL/GLFW的c库

https://zhuanlan.zhihu.com/p/458335134

## 常见图形API

### OpenGL

Khronos Group 维护，是一种早期的图形渲染 API 标准， 跨平台、易用性高、成熟稳定， 跨平台支持优异（支持 Windows、Linux、macOS 等）， 学习成本低，适合初学者和快速开发

### Vulkan

Khronos Group 开发，OpenGL 的继任者，现代、高性能、低开销，提供更细粒度的控制，适合高性能游戏和图形应用，适合跨平台应用（支持 Windows、Linux、Android ）

https://easyvulkan.github.io/

### Direct3D

微软专有，属于 DirectX 套件的一部分， Direct3D 11：传统 API，类似 OpenGL；Direct3D 12：更现代化，类似 Vulkan

### Metal

苹果开发的图形和计算 API

https://metaltutorial.com

## 其他

这些工具在底层 API（OpenGL、Vulkan）之上构建，提供更易用的接口

### BGFX

跨平台图形渲染库， 支持：Vulkan、Direct3D、OpenGL、Metal，提供统一的接口屏蔽底层差异

### WebGPU

WebGL 替代方案
