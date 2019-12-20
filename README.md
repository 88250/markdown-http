<p align = "center">
<em>该项目将逐步停止支持，请使用 <a href="https://github.com/88250/lute-http">Lute HTTP</a> 替代</em>
</p>

---

# markdown-http

## 简介

包装 Markdown 处理器以 HTTP 服务发布。可选择 [markdown-it](https://github.com/markdown-it/markdown-it) 或 [Marked](https://github.com/markedjs/marked) 作为底层处理器，默认使用 markdown-it。

## 背景

该项目主要是为了让 [Sym](https://github.com/88250/symphony)、[Solo](https://github.com/88250/solo)、[Pipe](https://github.com/88250/pipe) 提供更好的 Markdown 渲染，解决各项目内建的 Markdown 处理不统一的问题。

## 文档

1. 安装 Node.js
2. 初始化环境：`npm install`
3. 在 `index.js` 中配置 `const RENDER` 为需要的 markdown 解析器
4. 启动：`npm run start` 需要监听 `8250` 端口，所以启动前请确认该端口可用
5. 你可能需要 [nohup](https://hacpai.com/man?cmd=nohup) 和 `&` 让进程在后台运行：`nohup npm run start > markdown.log 2>&1 &`
6. 重启 Sym/Solo/Pipe 后就会使用配置的 markdown 解析器作为渲染引擎了

## 授权

markdown-http 使用 [MIT](https://opensource.org/licenses/MIT) 开源协议。

## 鸣谢

* [Marked](https://github.com/markedjs/marked)：A markdown parser and compiler. Built for speed
* [markdown-it](https://github.com/markdown-it/markdown-it)：Markdown parser, done right. 100% CommonMark support, extensions, syntax plugins & high speed
* [highlight.js](https://github.com/highlightjs/highlight.js)：Javascript syntax highlighter
