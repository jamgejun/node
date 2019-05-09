const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/test';
const dbname = 'test'

function _connect(callback) {
    MongoClient.connect(url, (err, client) => {
        if(err) throw err
        callback(client)
    })
}

function _init() {
    // db.map.createIndex({"sp": "2dsphere"})

    _connect((client) => {
        const col = client.db(dbname).collection(cname);
        col.createIndex({
            "anystr": "2dsphere"
        }, (err) => {
            if(err) throw err
            console.log('索引创建成功');
            client.close();
        })
    })
}

_init()

const insert = (collectionName, arrData, fn) => {
    _connect((client) => {
        const col = client.db(dbname).collection(collectionName)
        col.insertMany(arrData, (err, result) => {
            client.close();
            fn(err, result);
        })
    })
}

const find = (collectionName, filter, fn) => {
    _connect((client) => {
        const col = client.db(dbname).collection(collectionName)
        col.find(filter).toArray((err, docs) => {
            client.close();
            fn(err, docs);
        })
    })
}


const update = (collectionName, filter, updated, fn) => {
    _connect((client) => {
        const col = client.db(dbname).collection(collectionName)
        col.update(filter,{ $set: updated}, (err, result) => {
            client.close();
            fn(err, result);
        })
    })
}

const remove = (collectionName, filter, fn) => {
    _connect((client) => {
        const col = client.db(dbname).collection(collectionName)
        col.remove(filter, (err, result) => {
            client.close();
            fn(err, result);
        })
    })
}

module.exports = {
    insert,
    find,
    remove,
    update
}