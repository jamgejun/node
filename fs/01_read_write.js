// 引入核心对象fs
const fs = require('fs')

// 读取文件
fs.readFile('./01_read_write.js', (err, data) => {
    if(err) throw err; 
    console.log(data)
})

/*
写文件 fs.write('name', "content", "options: {
    flag: ''  追加    
}", callback)
*/
fs.writeFile('./a.txt', 'love Miny forerver', (err) => {
    if(err) throw err
    console.log('写文件完成')
})

// 追加方式1： appendFile("path", data, callback)
fs.appendFile('a.txt', 'write by Gray', (err) => {
    if(err) throw err
    console.log('追加成功')
})

// var name = 'hello'
// (function (){
//     if(typeof name === 'undefined') {
//         var name = 'world'
//         console.log(name)
//     } else {
//         console.log(name)
//     }
// })();

console.log(__dirname)
