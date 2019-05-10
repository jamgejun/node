const express = require('express')
const art = require('express-art-template')
const path = require('path')
const formiable = require('formidable')

// 引入db数据库操作
const db = require("./mapTool")
const app = express()
const router = express.Router()

app.engine('.html', art)
app.set('view engine', '.html')

router.get('/', (req, res, next) => {
    try {
        const cookie = req.headers.cookie.split(";").filter((value) => {
            return value.match(/location/g) ? value : ""
        })
        if (cookie.length) {
            res.redirect('/nearMe')
        } else {
            res.render('index')  
        }
    } catch (e) {
        return next(e)
    }
})

router.get('/nearMe', (req, res, next) => {
    const cookie = req.headers.cookie.split(";").filter((value) => {
        return value.match(/location=/g) ? value.slice(10) : ""
    }).join().slice(10).split(",")
    db.findNear('map', {
            left: parseFloat(cookie[1]) ,
            right: parseFloat(cookie[0])
    }, (err, docs) => {
        if(err) throw err
        console.log(docs)
        res.render('nearMe', {
            heros: docs
        })  
    })
})

// 接受数据
router.post('/add', (req, res, next) => {
    // 使用formiable解析参数
    var form = new formiable.IncomingForm();
    form.uploadDir = path.resolve(__dirname, './public/imgs')
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        let cname = fields.name
        let csp = fields.sp.split(',')
        let csrc = 'imgs/' + path.parse(files.pic.path).base;
        db.insert('map', {   
            name:cname, 
            src: csrc,
            sp: { 
                type:"Point", 
                coordinates:[ parseFloat(csp[1]), parseFloat(csp[0])] 
            }
        }
        , (err) => {
            if (err) throw err
            res.setHeader("Set-Cookie", `location=${csp.join(',')}`)
            res.redirect('/nearMe')
        })
    })
})

router.all('*', (req, res, next) => {
    res.render('./pages/404')
})

router.use((err, req, res, next) => {
    if(err) {
        res.render('./pages/error', {
            err
        })
    }
})

app.use(express.static('./public'))
app.use(router)

app.listen(8888, () => {
    console.log('satrt on 8888 close to me')
})