# node
node day 1

实现一个附近的人功能

### 实现附近的功能

基础概念

- 索引
  保存了数据和位置的关系描述清单

`db.createIndex(<key>, options)`

```
db.find({
    <!-- 根据索引查找附近的人 -->
    sp: {
        $nearSphere: {
            <!-- 中心点位置 -->
            $geometry: {
                type: 'Point',
                coordinates: [105.304,41.783]
            },
            <!-- 最小距离 -->
            $minDistance: 25000, 
            <!-- 最大距离 -->
            $maxDistance: 60000
        }
    }
})
```

查找，根据给定了的索引值，使用near变量，查找附近得人
```
db.map.find({
   "sp": {
     $near: {
       $geometry: {
          type: "Point" ,
          coordinates: [ 105.304,41.783 ]
       },
       $maxDistance: 25000,
       $minDistance: 60000
     }
   }
})
```

聚合操作
```
db.map.aggregate({
    $geoNear: {
        near: {
            type: 'Point', 
            coordinates: [ 105.304,41.783 ]
        },
        distanceField: "dist.calculated",
        spherical: true,
        maxDistance: 40000
    }
})
```


### express和koa

koa实际上是express的升级版，支持了es7语法，async和await，promise等语法。

中间件聚合成了`context`，其中包含`request`和`response`。