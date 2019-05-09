const http = require('http')
const jq = require('jquery')
const path = require('path')

console.log(require.resolve('jquery'))
console.log(jq)
http.createServer((req, res)=> {
    console.log(req.url)
    console.log(req.headers)
    console.log(req.method)
    console.log(req.on('data', (data) => {  // 监听data
        console.log(data.toString())
    }))
    res.writeHead(200, {"content-type": "text/html;charset=utf-8"}) // 返回状态码，并给出头部信息
    res.end('hello word!')
}).listen(8888, () => {
    console.log('start on 8888')
})