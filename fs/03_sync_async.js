// 异步和同步的区别 E:\迅雷下载\修女BD1080P高清中英双字.mp4
const fs = require('fs')

console.log('read before')

// 异步
fs.readFile('E:/迅雷下载/修女BD1080P高清中英双字.mp4',(err, data) => {
    if(err) throw err;
    console.log(data)
})

console.log('读取完成')

// 同步
fs.readFileSync('E:/迅雷下载/修女BD1080P高清中英双字.mp4')