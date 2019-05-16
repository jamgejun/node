const Koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const render = require('koa-art-template')

const path = require('path')

let app = new Koa()
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

// 使用render模板渲染
render(app, {
    root: path.join(__dirname, '../view'),
    extname: ".html",
    debuge: process.env.NODE_ENV !== 'production'
})
// 输出静态文件目录
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

// 引入socket.io
const Io = require('koa-socket')
const io = new Io()

io.attach(app); // 附加到app上产生关联
io.on('connection', (ctx, next) => {
    console.log('连接上了')
})
// 结束

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
.post('/add', async (ctx, next) => {
    let username = ctx.session.user.username;
    let content = ctx.request.body.msg;
    // 加入到数组中，返回最新消息回去
    msgs.push({
        username,
        content
    })
    ctx.body = msgs;
})


app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000, () => {
    console.log('socket.io for chatRoom')
})