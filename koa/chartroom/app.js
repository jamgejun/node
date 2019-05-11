//  koa 聊天的数据 登录 koa-session 静态资源 模板渲染
const koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const session = require('koa-session')
const render = require('koa-art-template')
const bodyparser = require('koa-bodyparser')

const path = require('path')

let app = new koa()
let router = new Router()

// 配置模板文件
render(app ,{
    root: path.join(__dirname, '../view'),
    extname: '.html',
    debuge: process.env.NODE_ENV !== 'production'
})
// 配置静态资源
app.use(static(path.join(__dirname, '../public')))

// 配置session
app.keys = ['some secret hurr']
let sessionconfig = {
    key: 'koa:sess', // session 别名
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) 不允许客户端操作cookie (default true) */
    signed: true, /**数字签名，保证数据不被篡改 */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}

let store = {
    myStore: {},
    get (key) {
        return this.myStore[key]
    },
    set (key, session) {
        this.myStore[key] = session
    },
    destory() {
        delete this.myStore[key]
    }
}
app.use(session(sessionconfig, app))

const msgs = [
    {
        username: 'GrayJay',
        content: "hhe"
    },
    {
        username: 'Miny',
        content: "xiix"
    },
    {
        username: 'world',
        content: "kekek"
    },
]

router.get('/', async (ctx, next) => {
    ctx.render('login')
    next()
})
.post('/login', async (ctx, next) => {
    let {username,password } = ctx.request.body
    ctx.session.user = {
        username
    }
    ctx.redirect('/list')
    next();
})
.get('/list', async (ctx, next) => {
    ctx.render('list', {
        user: ctx.session.user.username,
        msgs
    })
})
app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('chart online')
})