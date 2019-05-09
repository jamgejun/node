const fs = require('fs')

fs.access('file/b.txt', fs.constants.F_OK, (err) => {
    console.log(`${err ? "文件不存在" : "文件存在"}`)
})

fs.access('file/c.txt', fs.constants.F_OK, (err) => {
    console.log(`${err ? "文件不存在" : "文件存在"}`)
})

fs.access('file/b.txt', fs.constants.W_OK, (err) => {
    console.log(`${err ? "文件不可写" : "文件可写"}`)
})

fs.access('file/b.txt', fs.constants.R_OK, (err) => {
    console.log(`${err ? "文件不可读" : "文件可读"}`)
})