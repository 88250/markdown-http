# http-marked

包装 [Marked](https://github.com/markedjs/marked) 作为 HTTP 服务发布。

## 动机

该项目主要是为了让 [Sym](https://github.com/b3log/symphony)、[Solo](https://github.com/b3log/solo)、[Pipe](https://github.com/b3log/pipe) 提供更好的 Markdown 渲染，解决各项目内建的 Markdown 处理不统一的问题。

## 用法

1. 安装 Node.js
2. 安装 marked：`npm install`
3. `node http.js` 启动 marked（你可能需要 [nohup](https://hacpai.com/man?cmd=nohup)）。Marked 需要监听 `8250` 端口，所以启动前请确认该端口可用
4. 重启 Sym/Solo/Pipe 后就会使用 Marked 作为 markdown 渲染引擎了