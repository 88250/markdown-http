/*
 * Symphony - A modern community (forum/BBS/SNS/blog) platform written in Java.
 * Copyright (C) 2012-2018, b3log.org & hacpai.com
 *
 * 本文件属于 Sym 商业版的一部分，请仔细阅读项目根文件夹的 LICENSE 并严格遵守相关约定
 */

/**
 * @fileoverview Marked HTTP server.
 *
 * @author <a href="http://vanessa.b3log.org">Liyuan Li</a>
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.2.0.2, Jan 2, 2019
 * @since 1.0.0
 */

const http = require('http');
const marked = require('marked');
const renderer = new marked.Renderer();
const PORT = 8250;

renderer.listitem = function (text) {
  if (text.indexOf('<input') > -1) {
    return `<li class="content-reset__task">${text}</li>`;
  }

  return `<li>${text}</li>`;
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  smartLists: true,
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

process.on('uncaughtException', function (err) {
  console.log(err);
});

process.on('exit', function () {
  console.log("exit");
});

process.on('SIGTERM', function () {
  console.log("on signal [SIGTERM]");
  process.exit(0);
});

process.on('SIGINT', function () {
  console.log("on signal [SIGINT]");
  process.exit(0);
});

process.on('SIGUSR1', function () {
  console.log("on signal [SIGUSR1]");
  process.exit(0);
});

process.on('SIGUSR2', function () {
  console.log("on signal [SIGUSR2]");
  process.exit(0);
});

const server = http.createServer(function (request, response) {
  let mdContent = '';

  request.on('data', function (data) {
    mdContent += data;
  });

  request.on('end', function () {
    response.write(marked(mdContent));

    response.end();
  });
});

server.listen(PORT);
console.log("Marked engine is running at port: " + PORT);
