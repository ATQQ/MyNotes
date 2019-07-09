# 2019年7月7日11:21:36
## 使用vue-cli3.x正确打包项目,配合nginx运行打包后的内容
**vue.config.js**
```js
module.exports = {
    publicPath: './',//打包后的位置(如果不设置这个静态资源会报404)
    outputDir: 'dist',//打包后的目录名称
    assetsDir: 'static'//静态资源目录名称
}
```
**router.js**
```js
export default new Router({
    mode: 'history',//配合nginx本地才能正常的使用history模式
    base: process.env.BASE_URL
})
```
[官方文档对history模式的解释与配置方法](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

### 配置nginx([小白入门配置教程](https://www.cnblogs.com/roseAT/p/11013868.html))
**nginx.conf**
```
server {
        listen       8888;//监听端口
        server_name  localhost;

        location / {
	   try_files $uri $uri/ /index.html; #加上这句即可使用history模式进行路由

            root 	D:\documents\study\Vuejs\epadmin\dist;#打包后的dist根目录
            autoindex on;       #开启nginx目录浏览功能
            autoindex_exact_size off;   #文件大小从KB开始显示
            charset utf-8;          #显示中文
            add_header 'Access-Control-Allow-Origin' '*'; #允许来自所有的访问地址
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, PUT, POST, DELETE, OPTIONS'; #支持请求方式
            add_header 'Access-Control-Allow-Headers' 'Content-Type,*';
			add_header 'Access-Control-Allow-Headers' 'x_hztz_token,*';
        }
        
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```
**tips:** 配置完nginx记得使用命令重载配置
```
nginx -s reload
```

以上都配置完成后 运行打包项目命令
```
npm run build
```
打包后的目录结构
![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190707115002729-1931252950.png)

<br>

浏览器输入 http://localhost:8888 即可正常访问到打包后的资源
![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190707114850754-1740467751.png)


# 2019年7月8日12:43:32

## Vue-cli3.x中使用Axios发送跨域请求的配置方法

1. 安装axios
```
npm i axios -s
```
2. main.js中引入
   ```js
   import axios from 'axios'
    //将axios挂载在Vue扩展上
    Vue.prototype.$http=axios
    //在其他地方使用只需使用 this.$http来代替axios;
    //配置baseUrl
    axios.defaults.baseURL = '/api'
   ```
3. vue.config.js配置
   在devServer中加入
   ```js
   proxy: {
          '/api': {
                target: 'http://localhost:8888/EasyPicker',//请求的目标地址的BaseURL
                changeOrigin: true, //是否开启跨域
                pathRewrite: {
                    '^/api': '' //规定请求地址以什么作为开头
                }
            }
        }
   ```
   配置完成后如下
   ```js
   module.exports = {
    configureWebpack: {
        devServer: {
                proxy: {
                    '/api': {
                        target: 'http://localhost:8888/EasyPicker',
                        changeOrigin: true, //是否跨域
                        pathRewrite: {
                        '^/api': '' //规定请求地址以什么作为开头
                        }
                    }
                }
            }
        }
    }
   ```
**完成上述配置后差不多算大功告成了,下面是请求示例**
* demo1:
  * 如果我们要发送请求的路径为 **http://localhost:8888/EasyPicker/user/login**
  * 配置完成后的请求方式为(关于axios更具体的用法请参照[中文文档](https://www.kancloud.cn/yunye/axios/234845))
  * ```js
    this.$http("/user/login",{
        username:"admin",
        password:"123456"
    })
    ```
  * 控制台发送的请求截图![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190708130842272-733772609.png)
  * 显示的路径为 ↓
  * http://localhost:8088/api/user/login
  * 实际请求路径为↓
  * http://localhost:8888/EasyPicker/user/login
 
 ---
 通过上述简单的配置即可完成跨域请求的发送,前后端分离开发中非常实用的技巧

# 2019年7月9日12:22:08
## Vue中利用$emit实现子组件向父组件通信
### 父组件
```vue
<template>
    <div>
        <p>我是父组件</p>
        <child :isShow="show" @hidechild="hidechild"></child>
        <button @click="show=true">显示子组件</button>
    </div>
</template>

<script>
    import child from "./child"
    export default {
        date(){
            return{
                show:false
            }
        },
        components:{
            child
        },
        methods:{
            hidechild:function () {
                this.show=false
            }
        }
    }
</script>
```
### 子组件
```
<template>
    <div>
        <h2 v-show="isShow">我是子组件</h2>
        <button @click="hideMyself()">隐藏子组件</button>
    </div>
</template>

<script>
    export default {
        name:"child",
        props:{
            isShow:Boolean
        },
        methods:{
            hideMyself:function () {
                this.$emit('hidechild');
                //通过调用父组件的方法改变props中参数的内容
                //$emit(eventname,args); 可以携带参数
            }
        }
    }
</script>

```