# node
node day 1

实现一个附近的人功能

### 实现附近的功能

基础概念

- 索引
  保存了数据和位置的关系描述清单

`db.createIndex(<key>, options)`

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