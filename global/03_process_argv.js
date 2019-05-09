// 拿到接受命令行参数
// 输出形式: [node绝对路径，文件绝对路径，参数1，参数2]
let num1 = process.argv[2]-0
let num2 = process.argv[3]-0
console.log("计算中....")
setTimeout(() => {
    console.log(`结果为：${num1 + num2}`)
}, 2000)