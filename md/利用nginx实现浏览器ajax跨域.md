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
5. 配置完成后,保存一下
> 最终我们ajax请求的url路径就可以使用:<br>
> http://localhost:8088/api 完美代替实现跨域访问=> http://localhost:9000 上的资源
6. 常用nginx命令
>(在解压目录中打开cmd控制台窗口(可直接站资源管理器路径的url输入框中输入cmd即可直接在解压目录打开))<br>
```js
start nginx.exe //启动nginx
nginx.exe -s reload //重载配置并重新启动
nginx.exe -s stop //快速停止
nginx.exe -s quit //完整有序停止
```
> 
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
* 正常情况下(没有跨域问题),将会在浏览器控制台中输出**res**中的内容,而实际情况是↓
  ![](https://img2018.cnblogs.com/blog/1504886/201906/1504886-20190613033103780-86400623.png)
* 解决方案
> 按照前面的步骤完成配置后只需改变代码中 baseUrl的值,即可进行舒服的跨域请求操作
```js
//改变后的baseUrl
const baseUrl="http://localhost:8088/api/testDemo/"
```
### 教程到此结束,如有任何疑问,请再评论区留言,或者私信/发邮件
