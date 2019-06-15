# 利用Nginx轻松实现浏览器中Ajax的跨域请求(前后端分离开发调试必备神技)
### 前言
1. 为什么会出现跨域?
> 造成跨域问题的原因是因为浏览器受到[同源策略](#tycl)的限制,也就是说js只能访问和操作自己域下的资源，不能访问和操作其他域下的资源。跨域问题主要是针对js和Ajax的，
### <h4 id="tycl">同源策略</h4>
>为保障浏览器安全。不同的域名, 不同端口, 不同的协议是不允许共享资源的， 
2. 解决跨域问题的常见方式
* JSONP
* iframe
* ...(此处省略N种)
* **使用代理**(文章主要讲到的方法)
---
## 进入今天的主题(^-^)
#### 使用Nginx反向代理实现ajax进行跨域访问
1. 首先得把Nginx下载到我们的电脑上来
>戳=>[ngin官网下载](http://nginx.org/en/download.html),选择Stable version(稳定版)中的	nginx/Window版进行下载(文件很小只有不到2M的大小的压缩包)
<br><br>
2. 解压到自己喜欢的路径中(不包含中文)
![](https://img2018.cnblogs.com/blog/1504886/201906/1504886-20190613030106930-271236641.png)
<br><br>
3. 打开conf文件夹->右键选择nginx.conf文件使用你喜欢的文本编辑工具打开
![](https://img2018.cnblogs.com/blog/1504886/201906/1504886-20190613030328740-1138165436.png)
4. 找到文件中的 server部分
![](https://img2018.cnblogs.com/blog/1504886/201906/1504886-20190613030710701-1503007676.png)
编辑server内容为↓
```js
 server {
        listen       8088;#监听端口
        server_name  localhost;#代理服务地址

        add_header Access-Control-Allow-Origin *;

        location / {
            root D:\documents\Competition\labManage\equipmentWeb;#根目录!!,把这里路径设置为项目的根路径
            autoindex on;       #开启nginx目录浏览功能
            autoindex_exact_size off;   #文件大小从KB开始显示
            charset utf-8;          #显示中文
            add_header 'Access-Control-Allow-Origin' '*'; #允许来自所有的访问地址
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, PUT, POST, DELETE, OPTIONS'; #支持请求方式
            add_header 'Access-Control-Allow-Headers' 'Content-Type,*';
        }

        #开始配置我们的反向代理
        location /api{    #"/api"中的api可以替换为自定义的任何内容
	    rewrite ^/api/(.*)$ /$1 break;
	    include uwsgi_params;
	    proxy_pass http://localhost:9000; #我们要反向代理的地址,这里以本地的tomcat服务器为例
	    charset utf-8;   #显示中文
            add_header 'Access-Control-Allow-Origin' '*'; #允许来自所有的访问地址
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, PUT, POST, DELETE, OPTIONS'; #支持请求方式
            add_header 'Access-Control-Allow-Headers' 'Content-Type,*';
	}

}
```

5. 常用nginx命令
>(在解压目录中打开cmd控制台窗口(可直接站资源管理器路径的url输入框中输入cmd即可直接在解压目录打开))<br>
![](https://img2018.cnblogs.com/blog/1504886/201906/1504886-20190615095805337-160547788.png)
```js
start nginx.exe //启动nginx
nginx.exe -s reload //重载配置
nginx.exe -s stop //快速停止
nginx.exe -s quit //完整有序停止
```
6. 配置完成后,保存一下
   
**如果已经打开Nginx,请使用命令重载配置,①停止->②重载配置->③启动**
* <strong style="color:red;">重要!</strong>在浏览器中输入 http://localhost:8088/ 即可访问配置文件中设置的根目录项目的资源,如果出现404(网页无法显示)说明配置不正确,或者修改的配置文件还没有生效,按上述重载步骤操作一下
  ![](https://img2018.cnblogs.com/blog/1504886/201906/1504886-20190615100722167-419814526.png)

  <br/>
* <strong style="color:red;">注意!</strong>此时如果使用file:///D:/xxxx.html 本地文件路径虽然能访问xxx.html资源文,但仍然不能进行跨域访问资源的访问
![](https://img2018.cnblogs.com/blog/1504886/201906/1504886-20190615100605944-582875383.png)
  只有通过 http://localhost:8088/ 打开对应的xxx.html文件才能进行跨域操作,不会被浏览器拦截
![](https://img2018.cnblogs.com/blog/1504886/201906/1504886-20190615100722167-419814526.png)
 因为通过这个地址预览到的HTML文件和请求路径都在  http://localhost:8088/ 这个域中,
* 最终我们js代码里的ajax请求的baseUrl路径就可以使用:<br>
 http://localhost:8088/api 完美代替实现跨域访问=> http://localhost:9000 上的资源


1. 解决跨域问题demo
* 举个栗子
```js
//一种出现跨域问题的场景
//HTML文件直接通过本地路径加载 如url:file:///D:/demo/page/index.html
//其中关联的js代码为
const baseUrl="http://localhost:9000/testDemo/";
$.ajax({
    url:baseUrl+"test/hello",
    type:"GET",
    success:(res)=>{
        console.log(res);
    }
})
```
* 想象中情况下(如果没有跨域问题),将会在浏览器控制台中输出**res**中的内容,而实际情况是↓
  ![](https://img2018.cnblogs.com/blog/1504886/201906/1504886-20190613033103780-86400623.png) 
  
  **不用看我这里的的请求url,我只是举个 跨域警告的栗子**
* 解决方案
> 按照前面的步骤完成配置后只需改变代码中 baseUrl的值,然后通过  http://localhost:8088/xxxx.html 访问静态资源,即可进行舒服的跨域请求操作
```js
//改变后的baseUrl
const baseUrl="http://localhost:8088/api/testDemo/"
```
### 教程到此结束,如有任何疑问,或者不明白的地方,请在评论区留言,或者私信/发邮件
