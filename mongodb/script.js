// 展示连接实例下的数据库
show dbs

// 切换数据库名
use dbsName

// 查看集合内容
show collections

// 清屏 
cls

// 查询数据
db.集合名.find()
db.users.find()
// 添加数据 使用对象集合的方式
db.集合名.save()
db.users.save({
    contry:'china',
    scoure: 77,
    name: '小明'
})
// 删除数据 匹配条件的对象都会被删除 如果是空对象，会全部匹配
db.users.remove({
    name: '小明'
})

// 更新数据 给出条件匹配对象， 使用$set添加数据
db.users.update({
    name:"小明"
}, {
    $set: {
    father: 'GrayJay'
}
})