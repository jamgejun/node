// 上传文件，错误处理

const express = require('express')
const art = require('express-art-template')
const server = express()
const fs = require('fs')

const router = express.Router()

server.engine('.html', art)
server.set('view engine', '.html')

// 暴露静态文件，递归查找 不需要加前缀。加上虚拟目录  express.static 表示暴露文件夹下所有的文件
server.use('/public', express.static('./public'))

router.get('/', (req, res, next) => {
    // 加入获取文件
    let errorPath = './abc/e.txt'
    try {
        fs.readFileSync(errorPath)
        res.render('file')
    } catch (err) {
        // 传出
        next(err)
    }
    next();
})

// 处理错误 err first 四个参数
router.use((err, req, res, next) => {
    res.send(`<h1>您的页面跑丢了，请返回<a href ="/">首页</a></h1>`)
    next();
})

// 最后一条路由中 统一处理
router.all('*', (req, res, next) => {
    res.send(`adress has wrong go to <a href="/">index</a>`);
    next();
})

server.use(router)
server.listen(8888, () => {
    console.log('start on 8888 deal err')
})