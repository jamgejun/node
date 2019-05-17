const xlsx = require('node-xlsx').default;

const fs = require('fs')

const path = require('path')


// 读取方式，两种。读取fs返回的流文件，读取路径
const workSheetFromBuffer = xlsx.parse(fs.readFileSync(path.join(__dirname, `./excel/test.xlsx`)))

// 直接使用node-xlsx解析文件
const workSheetFromFile = xlsx.parse(path.join(__dirname, `./excel/test2.xlsx`))

console.log(workSheetFromBuffer[0].data)
console.log(workSheetFromFile[0].data)

// // 读取文件
// const data = [
//     [1,2,3], 
//     [true, false, null, 'sheetjs'], 
//     ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], 
//     ['baz', null, 'qux']
// ];

// var buffer = xlsx.build([
//     {
//         name: 'mySheetName',
//         data: data
//     }
// ])


// 读取文件
const data = [
    [1,2,3], 
    [true, false, null, 'sheetjs'], 
    ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], 
    ['baz', null, 'qux']
];

// start end
const range = {s: {c:0,r:0}, e: {c:0, r:3}}
const option = {
    'merges': [range]
}

var buffer = xlsx.build([
    {
        name: 'mySheetName',
        data: data
    }
], option)
fs.writeFile(path.join(__dirname, `./excel/test4.xlsx`), buffer, function (){});