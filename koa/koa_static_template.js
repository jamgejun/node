const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const Path = require('path')

// 处理渲染模板
const render = require('koa-art-template')
const app = new koa()

const router = new Router()

// 设置渲染模板
render(app, {
    root: Path.join(__dirname, 'view'),
    // 设置后缀名
    extname:".html",
    // debuge:false 则每次压缩页面及js，包括混淆，静态数据不会实时更新（不是每次都读取文件）
    debuge: process.env.NODE_ENV !== 'production'
})

router.get('/', async ctx => {
    ctx.render('index')
})

// 处理静态资源之前，重写url，改变用户url的请求
app.use(async (ctx, next) => {
    if(ctx.url.startsWith('./public')) {
        // 当存在的public的时候，对于url进行改写
        ctx.url = ctx.url.replace('/public', '')
    }
    // 异步机制 同意放行
    await next()
})

app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8888, () => {

})