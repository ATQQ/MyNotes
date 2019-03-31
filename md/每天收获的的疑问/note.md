# 日积月累收获的疑问

## 数据持久化? 
* 时间 2019年3月2日 星期六 17:35:59
* 简介

     &emsp;&emsp; 持久数据其实就是将数据保存到数据库。 数据持久化就是将内存中的数据模型转换为存储模型,以及将存储模型转换为内存中的数据模型的统称;数据模型可以是任何数据结构或对象模型,存储模型可以是关系模型、ＸＭＬ、二进制流等;cmp和Hibernate只是对象模型到关系模型之间转换的不同实现。只不过对象模型和关系模型应用广泛，所以就会误认为数据持久化就是对象模型到关系型数据库的转换罢了。 “持久化”这个概念是和“暂时”等概念相对的，数据在计算机中有一般有两个存储地，内存为暂存，因为电源关机就会数据丢失，如果需要反复使用，就要持久保存，实现持久化了。 为什么要持久化？ 持久化技术封装了数据访问细节，为大部分业务逻辑提供面向对象的API。 1. 通过持久化技术可以减少访问数据库数据次数，增加应用程序执行速度； 2. 代码重用性高，能够完成大部分数据库操作； 3. 松散耦合，使持久化不依赖于底层数据库和上层业务逻辑实现，更换数据库时只需修改配置文件而不用修改代码。
    
    \---------------------  
    作者：DanieXLee 
    来源：CSDN 
    原文：https://blog.csdn.net/woyaokaoyan/article/details/4895857 
  
## Token?
* 简介
    >[CSDN博文](https://blog.csdn.net/ruanhao1203/article/details/79139496)
### 基于 Token 的身份验证方法
#### 使用基于 Token 的身份验证方法，在服务端不需要存储用户的登录记录。大概的流程是这样的：
1. 客户端使用用户名跟密码请求登录
2. 服务端收到请求，去验证用户名与密码
3. 验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
4. 客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
6. 服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据

### 实施方式
## JWT
**实施 Token 验证的方法挺多的，还有一些标准方法，比如 JWT，读作：jot ，表示：JSON Web Tokens 。JWT 标准的 Token 有三个部分：**
* header
* payload
* signature

**中间用点分隔开，并且都会使用 Base64 编码，所以真正的 Token 看起来像这样：**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc

```

## 前端如何存储数据
### 三种常见方式
* Cookie 
  * 简介  
    &emsp;&emsp;COOKIE优点很多，使用起来很方便 
    但它的缺点也很多： 
    比如跨域访问问题；无法保存太大的数据（最大仅为4KB）；本地保存的数据会发送给服务器，浪费带宽 等等；
  
  * 使用方法
  ```js
  function SetCookie(name, value) {
        var key = '';
        var Days = 2;
        var exp = new Date();
        var domain = "";
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        if (key == null || key == "") {
            document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=" + domain + ";";
        }
        else {
            var nameValue = GetCookie(name);
            if (nameValue == "") {
                document.cookie = name + "=" + key + "=" + encodeURI(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=" + domain + ";";
            }
            else {
                var keyValue = getCookie(name, key);
                if (keyValue != "") {
                    nameValue = nameValue.replace(key + "=" + keyValue, key + "=" + encodeURI(value));
                    document.cookie = name + "=" + nameValue + ";expires=" + exp.toGMTString() + ";path=/;domain=" + domain + ";";
                }
                else {
                    document.cookie = name + "=" + nameValue + "&" + key + "=" + encodeURI(value) + ";expires=" + exp.toGMTString() + ";path=/;" + domain + ";";
                }
            }
        }
    }

    function GetCookie(name) {
        var nameValue = "";
        var key = "";
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            nameValue = decodeURI(arr[2]);
        }
        if (key != null && key != "") {
            reg = new RegExp("(^| |&)" + key + "=([^(;|&|=)]*)(&|$)");
            if (arr = nameValue.match(reg)) {
                return decodeURI(arr[2]);
            }
            else return "";
        }
        else {
            return nameValue;
        }
    }

    //jQuery 快捷API
    $.cookie('the_cookie', 'the_value');
    $.cookie('the_cookie','the_value',{
    expires:7,  
    path:'/',
    domain:'jquery.com',
    secure:true
    })　
    expires：（Number|Date）有效期；设置一个整数时，单位是天；也可以设置一个日期对象作为Cookie的过期日期；
    path：（String）创建该Cookie的页面路径；
    domain：（String）创建该Cookie的页面域名；
    secure：（Bool）如果设为true，那么此Cookie的传输会要求一个安全协议，例如：HTTPS；
  ```
* sessionStorage
  * 简介
  
  用于本地存储一个会话（session）中的数据，一旦会话关闭，那么数据会消失，比如关闭当前页面。 
    有时候，我们需要将数据存储到sessionStorage和localStorage中，这样做的好处有： 
    1 缓存数据 
    2 减少对内存的占用 
    但是，storage只能存储字符串的数据，对于JS中常用的数组或对象却不能直接   存储。 
    它能保存更大的数据（IE8上是10MB，Chrome是5MB），同时保存的数据不会再    发送给服务器，避免带宽浪

  * 使用方法
    ```js
    sessionStorage.setItem(key,value);
    sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    ```
* localStorage
  * 简介
  
    &emsp;&emsp;是一种你不主动清除它，它会一直将存储数据存储在客户端的存储方式，即使你关闭了客户端（浏览器)，属于本地持久层储存 
  * 使用方法
    ```js
    localStorage.setItem(key,value);
    localStorage.getItem(key);
    localStorage.removeItem(key);
    ```

    * demo

    ```js
    localStorage存储方法（sessionStorage类似） 
    localStorage.name =’vanida； 
    localStorage[“name”]=’vanida’； 
    localStorage.setItem(“name”,”vanida”); 
    //这三种设置值方式是一样的； 
    localStorage获取值方法 
    var name = localStorage[“name”] 
    var name= localStorage.name 
    var name＝ localStorage.getItem(“name”); 
    //这三种获取值方式是一样的； 
    localStorage清除特定值方法 
    //清除name的值 
    localStorage.removeItem(“name”); 
    localStorage.name＝”; 
    localStorage清除所有值方法 
    localStorage.clear() 
    localStorage只能存储字符串，如果需要存储对象，首先要转化为字符串。利用  JSON.stringify()； 
    var person = {name:”vanida”,”sex”:”girl”,”age”:25}; 
    localStorage.setItem(“person”,JSON.stringify(person)); 
    // localStorage.person=”{“name”:”vanida”,”sex”:”girl”,”age”:25}” 
    注意：JSON.stringify()中不要忘了“i”,stringify而不是stringfy！ 
    然后取出person的对象你可以用JSON.parse(); 
    person = JSON.parse(localStorage.getItem(“person”));

    ```

# 解决微信小程序用 SpringMVC 处理http post时请求返回415错误

## **写微信小程序时遇到的问题,这个坑硬是让我整了半天**
[wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/wx.request.html)请求跟ajax类似处理方法一致

* 小程序端请求代码
```javascript
wx.request({
      url:baseUrl+'user/login',
      header: {
        'content-type': 'application/json;charset=utf-8' // 默认值
      },
      method:'POST',
      data:JSON.stringify({
      "username": this.data.username,
      "password": this.data.password
      }),
      success:function (res) {
        console.log(res.data);
      },
      fail:function (res) {
        wx.showToast({
          title: '登录失败,检查网络',
          icon: 'none',
          duration: 2000        //  2秒后自动关闭
        })
      }
    })
```
  因为小程序的默认请求content-type 为 application/json 所以SpringMVC需要使用接收json格式内容的方式

  * SpringMVC 代码
  ```java
    @RequestMapping(value = "login",method =RequestMethod.POST)
    @ResponseBody
    public String login(@RequestBody User user){
        System.out.println(user);
        return SUCCESS;
  ```
在对应的对象参数前面加上 @RequestBody即可

**如果以上还不能解决 415错误**

1. 请检查一下jar 包是否导入了[jackson](http://repo1.maven.org/maven2/com/fasterxml/jackson/core/)相关的包,我用的是2.96版本,其余版本戳蓝色标签可自行下载
   * jackson-annotations
   * jackson-databind
   * jackson-core

2. 检查Spring配置是否添加了注解驱动
 ```xml
 <!--开启注解驱动-->
    <mvc:annotation-driven/>
 ```

 **finally**
 
 参照以上方法,我相信大家都能解决这个问题了,如果还不能解决 请私信我.


 ## js中定时执行函数
 * setTimeout()

# jQueryBase64加密
[demo](../demo/jquery.base64.js/index.html)

```js
//返回加密结果
$.base64.btoa(value);
//返回解密结果
$.base64.atob(value, true);
```

## js中日期格式化函数

>[CSDN](https://blog.csdn.net/vbangle/article/details/5643091/)
```js
// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}
```

