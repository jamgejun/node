const express = require('express')

const server = express()

// 使用router路由
let router = express.Router()

router.get('/login', (req, res) => {
    res.end('login page')
}).get('/register', (req, res) => {
    res.end('register page')
})

// 注册使用
server.use(router)

// 服务器启动端口
server.listen(8888)