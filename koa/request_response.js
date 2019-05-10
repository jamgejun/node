// 简单的请求和响应的api

const koa = require('koa')

const app = new koa()

app.use((ctx, next) => {
    console.log(ctx.request.url)
    console.log(ctx.request.method)
    console.log(ctx.request.headers)
    next()
})

app.use((ctx, next) => {
    console.log('go next')
    ctx.response.set('mytest', '123')
    ctx.response.status = 201
    ctx.response.body = `<h1>hello world</h1>`
})
app.listen(8888, () => {
    console.log('start on koa request response')
})