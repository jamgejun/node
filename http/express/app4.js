const express = require('express')
const art = require('express-art-template')

const server = express()

const router = express.Router()

// 注册一个模板引擎  .html表示文件的后缀名 引擎声明
server.engine('.html', art)

// 去发开发和生产的不同配置
server.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
    // debug: 不压缩,不混淆.实时保持最新的数据
    // 非debug: 压缩/合并. list.html 属于静态数据, 不会实时更新 就算是修改了服务器的静态数据. 也不会更新只有服务器重启才会更新
    imports: {
        num: 20,
        reverse: (str) => {
            return '^_^'
        }
    }
    // imports 数据导入, 过滤操作等.在渲染引擎中提供使用
})

// 配置默认渲染引擎 以便于res的render使用
server.set('view engine', '.html')

// render 会自动在执行node命令的文件夹下 寻找views文件夹下的文件
router.get('/hero', (req, res) => {
    res.render('list.html', {
        heros: [{
            name: 'GrayJay'
        },{
            name: 'Miny'
        },{
            name: 'hello word'
        }]
    })
})

// 注册中间件
server.use(router)
server.listen(8888, () => {
    console.log('start on 8888 use art-template')
})