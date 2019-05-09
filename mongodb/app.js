const express = require('express')
const art = require('express-art-template')
const path = require('path')
const fs = require('fs')
const formiable = require('formidable')

// 引入db数据库操作
const db = require("./dbtools")
const app = express()
const router = express.Router()

app.engine('.html', art)
app.set('view engine', '.html')

router.get('/', (req, res, next) => {
    try {
        db.find('heros', {}, (err, heros) => {
            if(err) throw err
            res.render('index', {
                heros
            })
            next()
        })
    } catch (e) {
        return next(e)
    }
})

// 接受数据
router.post('/add', (req, res, next) => {
    var form = new formiable.IncomingForm();
    form.uploadDir = path.resolve(__dirname, './public/imgs')
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(fields)
        console.log(files)
        let name = fields.name
        let address = fields.address
        let src = 'imgs/' + path.parse(files.pic.path).base;
        db.insert('heros', [{
            name,
            address,
            src
        }], (err) => {
            if (err) throw err
            res.redirect('/')
        })
    })
})

router.all('*', (req, res, next) => {
    res.render('./pages/404')
})

router.use((err, req, res, next) => {
    if(err) {
        res.json(err)
        res.render('./pages/error')
    }
})

app.use(express.static('./public'))
app.use(router)

app.listen(8888, () => {
    console.log('satrt on 8888 close to me')
})