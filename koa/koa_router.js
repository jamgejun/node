const koa = require('koa')
const bodyparser =  require('koa-bodyparser')
const Router = require('koa-router')

const app = new koa()
const router = new Router()

router.get('/', async ctx =>{
    ctx.body = "index"
})
router.post('/post', async ctx => {
    ctx.body = ctx.request.body
})


app.use(bodyparser())
app.use(router.routes()) //路由和实例挂钩

// 优化分头处理405 和501 不在全是404
// 405 表示url存在，但没有给出响应。 501 表示不支持该方法
app.use(router.allowedMethods())

app.listen(8888, () => {
    console.log('start')
})