启动服务
```shell
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
```

停止服务
```shell
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --shutdown
```
```
mongo
> use admin
switched to db admin
> db.shutdownServer()
```

shell
```
mongo
```

展示数据库
```
show dbs
```

切换
```
use dbName
```

插入
```sh
# 过期
db.collection.insert()
# collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead

```

更新-1
```shell
# _id存在则更新否则新插入
db.collection.save()
```

更新-2
```shell
db.collection.update(<query>,<data>)

db.collection.update(<query>,{$set:{}})

# $set 的对象并入原始对象类似 Object.assign(old,$set)
(>) 大于 - $gt
(<) 小于 - $lt
(>=) 大于等于 - $gte
(<= ) 小于等于 - $lte
(!=) 不等于 $ne
```

删除
```shell
db.col.remove(<query>)

# 删除所有
db.col.remove({})
```

查询
```shell
db.collection.find(query, projection)

db.connection.find({$or:[{x:1},{y:1},{z:1}]})
select * from connection where x = 1 or y = 1 or z = 1


where likes>50 AND (by = '菜鸟教程' OR title = 'MongoDB 教程'
# 等价于
db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]})


# 查询 title 包含"教"字的文档：
db.col.find({title:/教/})
# 教结尾
db.col.find({title:/^教/})
# 教开头
db.col.find({title:/教$/})

# 限定查询数量
db.col.find(<query>).limit(<number>)
# 跳过指定数量
db.col.find(<query>).skip(<number>)

# 结果排序
# 1 升序 -1 降序
db.COLLECTION_NAME.find().sort({KEY:1})
```

索引

```sh
db.third.createIndex({"birthday":1},{expireAfterSeconds:5})

# 扫描 Document 过期数据并删除是独立线程执行，默认 60s 扫描一次，删除也不一定是立即删除成功。
```
TODO: 还有点疑问


