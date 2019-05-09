// 接受一段字符串路径
const path = require('path')

// 拼接一个路径
let myPath = path.join(__dirname, 'abc', 'miny', 'love.txt')

// 解析这个路径为对象，更容易操作
let pathObj = path.parse(myPath)

console.log(pathObj)
/*
{ root: 'E:\\',
  dir: 'E:\\JAM\\study-online\\node\\abc\\miny',
  base: 'love.txt',
  ext: '.txt',
  name: 'love' 
}
修改pathObj对象中的base属性，用于修改文件名和文件后缀
*/

// path.format 接受文件对象，输出路径字符串
const formPath = path.format(pathObj)
console.log(formPath)