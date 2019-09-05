# UnhandledPromiseRejectionWarning: SequelizeConnectionError: Client does not support authentication protocol requested by server; consider upgrading MySQL client

## 解决方案
### 使用可视化数据库管理工具操作
1.
![](https://img2018.cnblogs.com/blog/1504886/201909/1504886-20190903203912268-441787618.png)
<br>
2. 把加密方式改为mysql_

![](https://img2018.cnblogs.com/blog/1504886/201909/1504886-20190903204014333-987846066.png)

## SQL
```sql
ALTER USER `nowadmin`@`localhost` IDENTIFIED WITH mysql_native_password;
```
nowadmin  替换成操作目标数据的用户名,
这里最好不使用root用户 创建一个新的用户使用Sequelize操作