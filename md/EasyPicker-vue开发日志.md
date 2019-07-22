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
```vue
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

# 2019年7月22日19:49:09
## vue-cli3.x中使用axios发送请求,配合webpack中的devServer编写本地mock数据接口(get/post/put/delete)

~~手把手式笔记~~

### Axios配置

1. 安装 axios
```text
npm install axios
```

2. main.js同级目录新建axios配置文件setaxios.js
```js
import axios from 'axios'
// import store from './store' //vuex
// import router from './router' //路由

export default function setAxios() {
    //拦截request请求
    axios.interceptors.request.use(
        config=>{
            console.log(config.data);
            return config;
        }
    )

    //拦截response回调
    axios.interceptors.response.use(
        response=>{
            if(response.status===200){
                const data=response.data
                // if (data.code === 400){
                //     //登录过期,权限不足
                //     console.warn("登陆过期");
                //     //清除token
                //     store.commit('setToken','')
                //     window.localStorage.removeItem('token')
                //     //跳转登录
                //     router.replace({
                //         path:"/login"
                //     })
                // }
                return data;
            }
            return response;
        }
    )
}
```


3. main.js中引入axios与其配置文件
```js
import axios from 'axios'
import setaxios from './setaxios'

//Vue全局挂载axios
Vue.prototype.$http=axios
//设置baseUrl
axios.defaults.baseURL = '/api'
```
### devServer中配置本地mock数据接口(vue.config.js文件中)[参考webpack中文文档](https://webpack.docschina.org/configuration/dev-server/#devserver-before)
```js
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    configureWebpack: {
        devServer: {
            contentBase: './build',//项目基本访问目录
            host: 'localhost',//服务器ip地址
            port: 8088,//端口
            open: true, //自动打开页面
            hot: true,//模块热替换
            hotOnly: true,//只有热更新不会刷新页面
            //mock数据接口部分 关键部分
            before(app) {
                const bodyParser = require('body-parser')
                app.use(bodyParser.json())  //通过bodyParser获取req.body）
                
                /**
                *   testGet
                */
                app.get('/api/test/get',(req,resp)=>{
                    console.log(req.query);

                    resp.json({
                        "code":111,
                        "msg":"get测试成功"
                    })
                })


                /**
                 * testPost
                 */
                app.post('/api/test/post', (req, resp) => {
                    console.log(req.body);

                    resp.json({
                        "code": 123,
                        "msg": "post测试成功"
                    })
                })

                /**
                 * testPut
                 */
                app.put('/api/test/put', (req, resp) => {
                    console.log(req.body)
                    resp.json({
                        "code": 123,
                        "msg": "put测试成功"
                    })
                })

                /**
                 * testDelete
                 */
                app.delete("/api/test/delete",(req,resp)=>{
                    console.log(req.body);

                    resp.json({
                        "code":666,
                        "msg":"delete测试成功"
                    })
                })
            }
        }
    }
}
```
通过上述配置操作即可完成本地mock数据接口编写,接下来是axios发送http请求测试示例
### restful风格接口axios发送请求示例 [参考axios中文文档](https://www.kancloud.cn/yunye/axios/234845)
```js
  methods: {
    sendGet: function() {
      this.$http
        .get("/test/get", {
          params: {
            param1: "get字符串",
            param2: 13131
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    sendPost: function() {
      this.$http
        .post("/test/post", {
          param1: "post字符串",
          param2: 13131
        })
        .then(res => {
          console.log(res);
        });
    },
    sendPut: function() {
      this.$http
        .put("/test/put", {
          param1: "put字符串",
          param2: 13131
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendDelete: function() {
      this.$http
        .delete("/test/delete", {
          data: {
            param1: "delete字符串",
            param2: 13131
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
```
### 完整测试demo(Test.vue)
```vue
<template>
  <div>
    <h2>HTTP-Request</h2>
    <button @click="sendGet()">GET</button>
    <span>&emsp;&emsp;</span>
    <button @click="sendPost()">POST</button>
    <span>&emsp;&emsp;</span>
    <button @click="sendPut()">PUT</button>
    <span>&emsp;&emsp;</span>
    <button @click="sendDelete()">DELETE</button>
    <hr />
  </div>
</template>

<script>
export default {
  name: "testPage",
  data() {
    return {};
  },
  methods: {
    sendGet: function() {
      this.$http
        .get("/test/get", {
          params: {
            param1: "get字符串",
            param2: 13131
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    sendPost: function() {
      this.$http
        .post("/test/post", {
          param1: "post字符串",
          param2: 13131
        })
        .then(res => {
          console.log(res);
        });
    },
    sendPut: function() {
      this.$http
        .put("/test/put", {
          param1: "put字符串",
          param2: 13131
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendDelete: function() {
      this.$http
        .delete("/test/delete", {
          data: {
            param1: "delete字符串",
            param2: 13131
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
```
## 示例效果图
![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190722204753261-2065295029.png)
![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190722204906039-320342058.png)


### 参考文档
>[webpack中文文档](https://webpack.docschina.org/configuration/dev-server/#devserver-before)

>[Axios中文文档](https://www.kancloud.cn/yunye/axios/234845)

如有不妥,不解之处,请[滴滴我](https://msg.cnblogs.com/send/%E7%B2%A5%E9%87%8C%E6%9C%89%E5%8B%BA%E7%B3%96),或在评论区留言