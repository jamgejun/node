const express = require('express')
const fs = require('fs')
const art = require('express-art-template')
const formidable = require('formidable')
const path = require('path')

const server = express()
const router = express.Router()
let heros = []

server.engine('.html', art)
server.set('view engine', '.html')

router.get('/', (req, res, next) => {
    try {
        res.render('hero-list', {
            heros
        })
        next();
    } catch (e) {
        next(e)
    }
})

// router.get('/imgs', (req, res, next) => {
//     let data = fs.readFileSync('./public/imgs/1.jpg')
//     res.end(data)
// })

router.get('/hero-list', (req, res, next) => {
    res.json(heros)
})

router.post('/add', (req, res, next) => {
    // 解析文件 使用包
    var form = new formidable.IncomingForm();
    
    // 解析上传目录
    form.uploadDir = path.resolve(__dirname, './public/imgs')

    // 保持原有后缀名
    form.keepExtensions = true;

    // 解析
    form.parse(req, function(err, fields, files) {
        console.log(fields)
        // fields.nickname
        // files.pic.path
        // path.parse(files.pic.path)
        console.log(files)

        let name = fields.nickname
        let src = "imgs/" + path.parse(files.pic.path).base;
        heros.push({
            name,
            src
        })
        res.redirect('/')
    });
 
})

router.all('*', (req, res, next)=> {
    res.render('404.html')
    next();
})


router.use((err, req, res, next) => {
    res.send(`your page is gone please clike <a href = "/">here</a> to find`);
    next();
})

server.use(express.static('./public'))
server.use(router)

server.listen(8888, () => {
    console.log('start on 8888 upload img')
})