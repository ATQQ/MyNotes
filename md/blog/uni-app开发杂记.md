# 2019年7月17日10:28:05
## 使用uni-app(Vue.js)开发微信小程序项目步骤
### 1. 新建一个uni-app项目
![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190717103250964-1479214097.png)
&emsp;&emsp;创建完成后的目录结构

![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190717103438934-477167231.png)

### 2. 打开微信小程序开发工具端的端口调试功能
![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190717103849952-1039484449.png)

### 3. 运行创建的项目
![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190717104216135-207374648.png)

效果

![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190717105034314-1730314956.png)


# 2019年7月17日12:05:40
## uni-app开发微信小程序引入UI组件库(Vant-weapp)步骤
* 这里以[vant-weapp](https://youzan.github.io/vant-weapp/#/intro)为例
* [uni-app官方文档介绍引入组件的方法](https://uniapp.dcloud.io/frame?id=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6%E6%94%AF%E6%8C%81)

### 1. 新建相关目录
* 根目录下创建 wxcomponents
* wxcomponents下新建vant目录
* 创建完成后的目录结构

    ![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190717112313927-1129440985.png)

### 2. 项目中引入vant-weapp组件
* 在[vant-weapp](https://github.com/youzan/vant-weapp)的GitHub [Releases](https://github.com/youzan/vant-weapp/releases)版块下载最新的zip包
* 解压下载文件,将dist目录拷贝到刚才创建vant目录中
  ![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190717112943410-414236268.png)

### 3. 页面中使用引入的UI组件
1. 在App.Vue文件中style部分引入UI组件库的 样式文件
![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190717114006607-949170542.png)

```css
@import "/wxcomponents/vant/dist/common/index.wxss";
```

2. 在pages.json配置文件中,注册页面需要的组件
```json
{
	"path": "pages/index/index",
	"style": {
		"usingComponents":{
			"van-button": "/wxcomponents/vant/dist/button/index"
		},
		"navigationBarTitleText": "首页"
	}
}
```
![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190717114906931-1394318326.png)
![](https://img2018.cnblogs.com/blog/1504886/201907/1504886-20190717114746903-559812489.png)

