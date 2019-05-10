const express = require('express')

const server1 = express()

server1.use( (req, res, next) => {
    res.end('express')
})

server1.listen(8888, () => {
    console.log('express start on 8888')
})

const koa = require('koa')

const server2 = new koa()

// context 包含 request对象， response对象
server2.use( (context) => {
    context.body = "koa ok"
})

server2.listen(9999, () => {
    console.log('koa start on 9999')
})