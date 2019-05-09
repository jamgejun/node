const fs = require('fs')
const path = require('path')

const myPath = path.resolve(__dirname, './a.txt')
console.log(myPath)

// fs.stat(myPath, (err, stat) => {
//     if(err) throw err;
//     console.log(`${JSON.stringify(stat)}`)
// })

// fs.rename(myPath, path.resolve(__dirname, 'change.txt'), (err) => {
//     if(err) throw err;
//     fs.stat(myPath, (err, data) => {
//         if(err) throw err;// 出错，因为文件名被修改。
//         console.log(`file prototype ${data}`)
//     })
// })
fs.stat(myPath, (err, stats) => {
    console.log(`${stats.isBlockDevice() ? "is a blockDevice": "not a blockDevice"}`)
})