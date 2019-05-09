const http = require('http')

http.createServer((req, res) => {
    res.end('8888端口被访问了')
}).listen(8888, () => {
    console.log('8888服务器启动')
})
