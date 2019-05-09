// 引入核心对象
const fs = require('fs')

// 先读后写

let data = fs.readFileSync('./a.txt', 'utf-8')

console.log(data)

fs.writeFileSync('./b.txt', data)

console.log('文件复制成功')