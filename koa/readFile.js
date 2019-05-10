const koa = require('koa')
const fs = require('fs')

const app = new koa()

function asyncReadFile() {
    // 失败 err 成功 data
    return new Promise((resovle, reject) => {
        fs.readFile('./index.html', (err, data) => {
            if(err) {
                reject(err)
                return
            }
            resovle(data)  
        })
    })
}
// async await ==> promise
// 如果是二进制数据或者是buffer文件，就作为下载处理
app.use(async (ctx, next) => {
        let data = await asyncReadFile()
        ctx.body = data
        ctx.set('content-type', 'text/html;charset=utf-8')
        ctx.status = 200
        next()
})

app.listen(9999, () => {
    console.log('start on 9999 readFile')
})