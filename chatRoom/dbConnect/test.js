const db = require('./mysql')

db.q('insert into student (name,sex,age) values(?,?,?)', ['民民', 'female', '18'], (err, results) => {
    if(err) throw err
    console.log(results)
}) 