const MongoClient = require('mongodb')

// test 数据库下 map集合保存这地理位置信息
const dbName = 'test'

// 连接数据库
function _connect(callback) {
    MongoClient.connect(`mongodb://localhost:27017/${dbName}`, (err, client) => {
        if (err) throw err
        console.log('连接数据库成功')
        callback(client)
    })
}
/**
 * 
 * @param {*} collectionName 
 * @param {*} objData 
 * @param {*} fn 
 */
const insert = (collectionName, objData, fn ) => {
    _connect((client) => {
        const col = client.db(dbName).collection(collectionName)
        col.insert(objData, (err, docs) => {
            client.close()
            fn(err, docs)
        })
    })
}
// insert('map', [
//     {
//         name: "A",
//         src: "",
//         sp: {
//             type: "Point",
//             coordinates: [ 106.550,29.564 ]
//         }
//     },
//     {
//         name: "B",
//         src: "",
//         sp: {
//             type: "Point",
//             coordinates: [ 107.550,30.564 ]
//         }
//     },
//     {
//         name: "C",
//         src: "",
//         sp: {
//             type: "Point",
//             coordinates: [ 107.000,30.000 ]
//         }
//     },
//     {
//         name: "D",
//         src: "",
//         sp: {
//             type: "Point",
//             coordinates: [ 105.550,28.988 ]
//         }
//     },
//     {
//         name: "E",
//         src: "",
//         sp: {
//             type: "Point",
//             coordinates: [ 105.980,30.988 ]
//         }
//     },
//     {
//         name: "F",
//         src: "",
//         sp: {
//             type: "Point",
//             coordinates: [ 106.480,29.828 ]
//         }
//     }
// ], (err, docs) => {
//     if(err) throw err
//     console.log(docs)
// })
/**
 * 
 * @param {*} collectionName 
 * @param {*} option  option = { location: { left: number, right:number} , distance: { max: number, min:number } }
 * @param {*} fn 
 * 找到附近的人，不显示距离
 */

const findAll = (collectionName, option, fn) => {
    _connect((client) => {
        const col = client.db(dbName).collection(collectionName)
        col.find({
            "sp": {
                $near: {
                    $geometry: {
                        type: "Point" ,
                        coordinates: [ parseFloat(option.location.left), parseFloat(option.location.right) ]
                    },
                    $maxDistance: option.distance.max? parseInt(option.distance.max): Math.pow(2, 31),
                    $minDistance: option.distance.min? parseInt(option.distance.max): Math.pow(2, 0)
                }
            }
        }, (err, docs) => {
            if (err) throw err
            client.close()
            fn(err, docs)
        })
    })
}

/**
 * 
 * @param {*} collectionName 
 * @param {*} option  option = { location: { left: number, right:number} , distance: { max: number, min:number } }
 * @param {*} fn 
 * 
 */

const findNear = (collectionName, option, fn) => {
    _connect((client) => {
        const col = client.db(dbName).collection(collectionName)
        col.aggregate({
            $geoNear: {
                near: {
                    type: 'Point', 
                    coordinates: [ option.left, option.right ]
                },
                distanceField: "dist.calculated",
                spherical: true,
                maxDistance: 10000000
            }
        }, (err, cursor) => {
            cursor.toArray((err, docs) => {
                fn(err, docs)
            })
          })
    })
}

module.exports = {
    insert,
    findAll,
    findNear
}