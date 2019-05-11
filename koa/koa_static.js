const koa = require('koa')
const static = require('koa-static')

const app = new koa()

app.use(static(__dirname + './public'))

app.listen(3000)