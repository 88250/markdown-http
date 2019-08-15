const MarkdownIt = require('markdown-it')('commonmark')
const text = require('fs').readFileSync('benchmark/spec.md').toString()
let time = new Date().getTime();
console.log(time)
for (let i = 0; i < 300; i++) {
  const html = MarkdownIt.render(text)
}
let end = new Date().getTime()
console.log(end)
console.log((end - time)/300)
