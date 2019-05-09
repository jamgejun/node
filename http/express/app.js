// 引入express框架
const express = require('express')

// 创建一个服务器
const server = express()

// 开启端口
server.listen('8888', () => {
    console.log('start on 8888')
})

// 处理响应
server.use('/', (req, res, next) => {
    res.end('hello world!');
    next();
})