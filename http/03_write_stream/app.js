const http = require('http')
const fs = require('fs')

http.createServer((req, res)=> {
    if(req.url === '/') {
        fs.readFile('./index.html', (err, data) => {
            res.writeHead(200, {
                'content-type': 'text/html; charset = utf-8'
            })
            res.end(data)
        })
    } else if (req.url === '/test' && req.method === 'GET') {
        // 告诉客户端，使用流数据进行显示
        res.writeHead(200,{'content-type': 'application/octet-stream; charset = utf - 8'})
        setInterval(() => {
            res.write(`^_^ ${Date.now()}`)
        }, 1000)
    }
}).listen('9999', ()=> {
    console.log('start on 9999')
})