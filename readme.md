# GBC表情包搜索器

## 项目简介

本项目是一个基于 Node.js + Express 的本地表情包图片搜索与浏览工具。前端支持关键词搜索、图片悬停操作（下载、复制链接），后端自动读取本地图片目录并提供 API。（后端[imgapi](https://github.com/122440367/imgapi)）

---

## 目录结构

```
d:\img\
│
├── public\
│   ├── index.html         # 主页面
│   ├── main.css           # 页面样式
│   ├── javascript.js      # 前端逻辑
│   ├── src\
│   │   ├── download.svg   # 下载按钮图标
│   │   └── copy.svg       # 复制按钮图标
│
├── server\
│   └── server.js          # Express 后端服务
│
├── 各类图片文件（jpg/png/gif/webp等，直接放在 d:\img 目录下）
```

---

## 主要文件说明

### 1. index.html

- 前端主页面，包含搜索框、图片展示区。
- 通过 `<script src="javascript.js"></script>` 加载前端逻辑。
- 通过 `<link rel="stylesheet" href="./main.css">` 加载样式。

### 2. main.css

- 页面整体样式，包括响应式布局、图片悬停效果、按钮样式等。

### 3. javascript.js

- 前端核心逻辑：
  - 页面加载时自动请求 `/api/images` 获取图片数据。
  - 支持关键词搜索、清空输入、回车搜索。
  - 动态生成图片卡片，悬停显示下载和复制按钮。
  - 下载按钮：下载当前图片。
  - 复制按钮：复制完整图片链接到剪贴板。

### 4. download.svg 和 copy.svg

- 分别为下载和复制按钮的 SVG 图标。

### 5. server.js

- Node.js + Express 后端服务。
- 静态服务 public 目录和图片目录。
- `/api/images` 接口自动读取图片目录，支持关键词过滤和分页。
- 图片通过 `/images/文件名` 访问。

---

## 使用说明

1. **图片准备**  
   将你的表情包图片（jpg/png/gif/webp）直接放在 img 目录下。

2. **启动服务**  
   进入 server 目录，运行：
   ```bash
   node server.js
   ```
   默认服务地址为 [http://localhost:3000](http://localhost:3000)

3. **访问网页**  
   在浏览器打开 [http://localhost:3000](http://localhost:3000) 即可使用。

---

## 功能特性

- 支持关键词模糊搜索图片文件名
- 图片悬停显示下载和复制链接按钮
- 复制按钮自动生成完整图片链接
- 响应式布局，适配不同屏幕
- 前后端分离，易于扩展

---

## 依赖环境

- Node.js 16+
- Express

---

## 常见问题

- **图片不显示？**  
  请确保图片文件放在 img 根目录，格式为 jpg/png/gif/webp。

- **SVG 图标不显示？**  
  请确保 `download.svg` 和 `copy.svg` 位于 src 目录下。

---

## 目录结构示意图

```
d:\img
│
├── public
│   ├── index.html
│   ├── main.css
│   ├── javascript.js
│   └── src
│       ├── download.svg
│       └── copy.svg
│
├── server
│   └── server.js
│
├── 图片1.jpg
├── 图片2.png
├── ...
```

---

**如需自定义图片目录或端口，请修改 server.js 中的相关配置。**
