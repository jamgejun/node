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

global.mySessionStore = {
    // "时间戳id": {
    //     username,
    //     socketId: "XX"
    // }
}

function findSocketId(socketId) {
    for (var value in global.mySessionStore) {
        let obj = global.mySessionStore[value]
        if(obj.socketId === socketId ) {
            return obj
        }
    }
}


// 引入socket.io
const Io = require('koa-socket')
const io = new Io()

let id = 0;
io.attach(app); // 附加到app上产生关联
io.on('connection', (context) => {
    console.log(`当前在线人数：${++id}`)
})

// 接受用户消息
io.on('sendMsg', (context, data) => {
    // context.socket表示客户端的连接 context.socket.socketId 私聊用
    let obj = findSocketId(context.socket.socket.id)
    console.log(obj);
    console.log('消息来了',obj.username+""+data.newContent)
    let answer = {
        username:obj.username,
        content: data.newContent
    }
    io.broadcast('msg1', answer)
    // 因为socket服务器中，没有session机制。需要拿到username
})
io.on('login', (context, data) => {
    console.log(data.id);
    global.mySessionStore[data.id].socketId = context.socket.socket.id;
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
    // 1. 生成一个时间戳，将时间戳响应给客户端（类似cookie）
    let id = Date.now();
    ctx.session.user.id = id;

    // 2. 保存到自己的sessionStore中
    global.mySessionStore[id] = {
        username: ctx.session.user.username,
        socketId: ""
    }
    ctx.redirect('/list')
    next();
})
.get('/list', async (ctx, next) => {
    // 使用时间戳id值
    ctx.render('socketIo/chatRoom', {
        user: ctx.session.user.username,
        id:ctx.session.user.id,
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