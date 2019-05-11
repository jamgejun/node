const koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const session = require('koa-session');
const bodyparser = require('koa-bodyParser')
const static = require('koa-static')

const path = require('path')


let app = new koa()
let router = new Router()

// 通过任意字符串为基准，进行加密算法的字符串
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess', // session 别名
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) 不允许客户端操作cookie (default true) */
    signed: true, /**数字签名，保证数据不被篡改 */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  };

app.use(session(CONFIG, app))

render(app, {
    root: path.join(__dirname, '../view'),
    extname: ".html",
    debuge: process.env.NODE_ENV !== 'production'
})
app.use(static(path.join(__dirname, '../public')))

router.get('/', async ctx => {
    ctx.render('index')
})

router.post('/login', async ctx=> {
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    if(username != "abc" || password != "123"){
        // koa中的异常处理
        ctx.set('content-type', "text/html;charset=utf-8")
        ctx.throw(400, `<div>
        ^_^
    </div>`)
        return
    } else {
        ctx.session.user = {
            username: 'abc'
        },
        ctx.body = "登陆成功"
    }
})

router.get('/list', async ctx => {
    ctx.body = `当前登陆用户名：${ctx.session.user.username}`
})

app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())

// 错误处理
app.on('error', (err, ctx) => {
    console.log(err)
    ctx.body = `
        <div>
            ^_^
        </div>
    `
})


app.listen(3000, () => {
    console.log('rookect is laji')
})