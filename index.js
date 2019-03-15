/**
 * @fileoverview Markdown HTTP server.
 *
 * @author <a href="http://vanessa.b3log.org">Liyuan Li</a>
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.3.0.0, Mar 15, 2019
 */

const http = require('http')
const PORT = 8250
const RENDER = 'markdown-it' // support 'markdown-it', 'marked'
const TASKLICLASS = 'content-reset__task'
const hljs = require('highlight.js')

const task = require('./markdown-it-task')

class MD {
  init () {
    switch (RENDER) {
      case 'marked':
        this.mdRender = this.initMarked()
        break
      case 'markdown-it':
        this.mdRender = this.initMarkdownIt()
        break
      default:
        break
    }
  }

  render (md) {
    let html
    switch (RENDER) {
      case 'marked':
        html = this.mdRender(md)
        break
      case 'markdown-it':
        html = this.mdRender.render(md)
        break
      default:
        html = md
        break
    }
    return html
  }

  highlight (str, lang) {
    if (lang === 'mermaid') {
      return str
    }
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str, true).value
    }
    return hljs.highlightAuto(str).value
  }

  initMarked () {
    const marked = require('marked')
    const renderer = new marked.Renderer()
    renderer.listitem = (text) => {
      if (text.indexOf('<input') > -1) {
        return `<li class="${TASKLICLASS}">${text}</li>`
      }
      return `<li>${text}</li>`
    }

    marked.setOptions({
      renderer: renderer,
      gfm: true,
      tables: true,
      breaks: true,
      smartLists: true,
      highlight: this.highlight,
    })
    return marked
  }

  initMarkdownIt () {
    const MarkdownIt = require('markdown-it')
    return new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: this.highlight,
    }).use(task)
  }
}

const md = new MD()
md.init()

process.on('uncaughtException', (e) => {
  console.log(err)
})

process.on('exit', () => {
  console.log('exit')
})

process.on('SIGTERM', () => {
  console.log('on signal [SIGTERM]')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('on signal [SIGINT]')
  process.exit(0)
})

process.on('SIGUSR1', () => {
  console.log('on signal [SIGUSR1]')
  process.exit(0)
})

process.on('SIGUSR2', () => {
  console.log('on signal [SIGUSR2]')
  process.exit(0)
})

const server = http.createServer((request, response) => {
  let mdContent = ''

  request.on('data', (data) => {
    mdContent += data
  })

  request.on('end', () => {
    response.write(md.render(mdContent))
    response.end()
  })
})

server.listen(PORT, '127.0.0.1')
console.log(`${RENDER} engine is running at port: ${PORT}`)
