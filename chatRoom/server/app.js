const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')
const session = require('koa-session')
const Io = require('koa-socket')
const Path = require('path')

let app = new Koa()
let router = new Router()
let io = new Io()
// 配置view页面
render(app, {
    root: Path.join(__dirname, '../views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})
app.keys = ['chatRoom on line']
app.use(session(require('./sessionConfig'), app))
app.use(static(Path.join(__dirname, '../public')))

// socket通信部分
io.attach(app)
global.myScoketSession = {}
function findSocketId(socketId, flag) {
    for (let value in myScoketSession) {
        if (myScoketSession[value].socketId === socketId) {
            // 如果是flag=1 返回的key值，如果不是，则返回对象
            return flag !==1 ? myScoketSession[value] : value
        }
    }
}
let msgs = [{
    username: 'GrayJay',
    content: '欢迎'
}]

io.on('login', (context, data) => {
    myScoketSession[data.id].socketId = context.socket.socket.id;

    // 测试用户上线
    console.log(Object.keys(myScoketSession).length)
    io.broadcast('online', {
        online: myScoketSession
    })
    context.socket.on('disconnect', (msg) => {
        let socketId = msg.socket.socket.id
        let id = findSocketId(socketId, 1)
        console.log(`${myScoketSession[id].username} 退出了`)
        delete myScoketSession[id];
    })
})


io.on('sendMsg', (context, data) => {
    let socketId = context.socket.socket.id;
    let user = findSocketId(socketId, 0);
    let msg = {
        username: user.username,
        content: data.newContent
    }
    msgs.push(msg);
    io.broadcast('allmsg', msg)
})
io.on('sendPrivateMsg', (context, data) => {
    // 获取socketid to msg
    let fromSocketId = context.socket.socket.id;
    let { username } = findSocketId(fromSocketId, 0);
    // koa-socket 是一个socket.io的语法糖，app._io就是io对象
    let { to , newContent } = data;
    app._io.to(to).emit('privateMsg', `${username} 对你说：${newContent}`)
})

io.on('JoinGroup', (context, data) => {
    let groupId = data;
    // 使用当前socket加入组
    let fromSocketId = context.socket.socket.id;
    let { username } = findSocketId(fromSocketId, 0);
    context.socket.socket.join(groupId)
    app._io.to(groupId).emit('group', `${username} 在 ${groupId} 中说: 你好`)
})

io.on('sendGroup', (context, data) => {
    let { groupId, newContent } = data;
    // 使用当前socket加入组
    let fromSocketId = context.socket.socket.id;
    let { username } = findSocketId(fromSocketId, 0);
    context.socket.socket.join(groupId)
    app._io.to(groupId).emit('group', `${username} 在 ${groupId} 中说: ${newContent}`)
})
// http通信部分
router.get('/',async (ctx, next) => {
    if(ctx.session.user) {
        ctx.render('chatRoom')
    } else {
        ctx.render('login')
    }
})
router.post('/login',async (ctx, next) => {
    let { username, password } = ctx.request.body;
    let id = Date.now()
    myScoketSession[id] = {
        username
    }
    ctx.render('chatRoom', {
        username,
        msgs,
        id
    })
})



app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('在线聊天室已启动')
})