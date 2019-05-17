var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: 'WOSHIshuaibi9696',
    database: 'test'
});

let db = {}

db.q = (sql, params, callback) => {        
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
            return 
        } 
        connection.query(sql, params, function (err, results) {
            // 关闭连接
            connection.release()
            callback(err, results)
        })
    })
}

module.exports = db;