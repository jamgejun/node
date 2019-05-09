const express = require('express')

const server = express()

const router = express.Router()

router.get('/json', (req, res) => {
    // 返回json格式
    res.json([{
        "name": "GrayJay",
        "sex": "man"
    }])
})
.get('/redirect', (req, res) => {
    // 重定向
    res.redirect('http://www.baidu.com')
})
.get('/download', (req, res) => {
    // 下载 注意返回响应的http头部信息 content-type类型 响应头实现:Content-Disposition: attachment; filename="app.js"
    res.download('./app.js')
})
.get('/jsonp', (req, res) => {
    // 返回jsonp
    res.jsonp('GrayJay love Miny')
})

server.use(router)
server.listen(9999, () => {
    console.log('9999端口启动, res响应的扩展')
})