const koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session')
const static = require('koa-static')
const render = require('koa-art-template')
const bodyparser = require('koa-bodyparser')

const path = require('path')

let app = new koa()
let router = new Router()

app.keys = ['some secret hurr']
const sessionConfig = {
    key: 'koa:sess', // session 别名
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) 不允许客户端操作cookie (default true) */
    signed: true, /**数字签名，保证数据不被篡改 */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  }
app.use(session(sessionConfig, app))

render(app ,{
    root: path.join(__dirname, '../view'),
    extname: ".html",
    debuge: process.env.NODE_ENV !== 'production'
})
app.use(static(path.join(__dirname, '../public')))

// 定义一个对象存储session数据
let store = {
    storage: {},
    get (key) { // session_id
        return this.storage[key]
    },
    set (key, session) { // session_value
        this.storage[key] = session
    },
    destory (key) {
        delete this.storage[key]
    }
}


router.get('/', async ctx => {
    ctx.render('login')
})
router.post('/login', async (ctx, next) => {
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    if(username != 'abc' || password != '123') {
        ctx.throw(400, 'password or username not right')
    } else {
        ctx.session.user = {
            username: username
        }
        ctx.redirect('/index')
    }
})
router.get('/index', async (ctx, next) => {
    ctx.render('index', {
        user: [
            {
                name: `${ctx.session.user.username}`,
                time: `${Date.now()}`
            }
        ]
    })
})
app.use(bodyparser())

// 错误处理
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        // 捕获中间件中的异常
        console.log(`..........`, e)
        ctx.status = 200,
        ctx.body = `
            <div>
                ^_^ 出错了
            </div>
        `
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

// 错误处理 仅仅是服务器的日志记录
app.on('error', (err, ctx) => {
    console.log(err)
    ctx.body = `
        <div>
            ^_^
        </div>
    `
})


app.listen(3000, () => {
    console.log(`start on 3000`)
})