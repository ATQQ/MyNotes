# EasyPicker(轻取)简洁而又实用的文件收取Web应用
## EasyPicker简洁实用且方便的文件收取Web工具类应用
![](https://img2018.cnblogs.com/blog/1504886/201905/1504886-20190528021202292-901637899.png)
![](https://img2018.cnblogs.com/blog/1504886/201905/1504886-20190528005455244-1425165273.png)


&emsp;小弟我作为班上的学委,有一个伟大的职责,**收发各科作业**(尤其是专业课的上机课),上机==写报告,此时就产生了**实验报告**这个玩意儿,一个班少则40人出头,多则100+人的大班,老师通过自己的邮箱方式收取每个同学的报告,发现不方便统计,又不不方便整理(毕竟一个老师教多个班),老师就干脆把这个**ku差事**甩给学委(~~落后文件收取方法与庞大人数之间的矛盾~~),而学委们以班为单位收取,只是减少了需要收取的数量,收取方式仍然只有通过**邮件**或者**QQ**,治标不治本,尤其是通过QQ收取文件的方式不讨我这种不喜欢让列表变得乱乱的人的青睐(~~容易错过女票的消息,还占用手机电脑磁盘空间~~),为此我就寻找有不有什么软件能够解决这个问题,在网上搜索逛了大半天仅仅只找到了一个符合自己想法的产品[乐云收件夹](http://xzc.cn/),但用了一下,发现功能些少,且存储是通过**百度云盘**,因此除了注册之外还需要绑定百度云盘账号,步骤稍有繁琐...<br>
&emsp;为了实现我心中的那个想法,二话不说打开电脑开始构建心中的蓝图.**不得不说,程序员的双手是拥有魔法的,是能够让想法变现的...** 说到这里,这让我回忆起了一句大佬说的话:**"你的指尖拥有改变世界的力量"** ......废话说了这么多(下面开始介绍小弟的作品)

## 作品简介
**[轻取](http://sugarat.top/EasyPicker/home)**,为方便在线文件收取而生。

## 作品背景
学习生活中会出现以下几个场景:
* 每次碰到上机课的时候,都会遇到收取实验报告。
* 需要收取每个人填写的各种电子表格。
* 类似场景还有不少就不列举了。。。

通常的方式是,通过QQ/微信/邮箱等收取,弊端显而易见,太过于麻烦且不方便整理统计。还占用电脑/手机内存。为了解决这个问题,此项目应运而生。

## 相关链接
> [EasyPicker  项目源码地址](https://github.com/ATQQ/EasyPicker)

> [EasyPicker  体验地址(PC效果更佳)](https://sugarat.top/EasyPicker/home) 服务器有些弱小,哥哥姐姐们温柔对待

## 技术栈
* 前端
  * JQuery&emsp; (大伙儿都懂)
  * [amazeUI&emsp; (妹子UI框架)](http://amazeui.org/)
  * [SASS&emsp;(CSS预处理语言)](https://www.sass.hk/)
  * [webuploader &emsp;(文件上传)](http://fex.baidu.com/webuploader/)
  * [Datatables &emsp;(处理table数据)](https://datatables.net/)
  * [clipboard &emsp;(复制剪贴版)](https://www.sogou.com/link?url=hedJjaC291NcerUFJE3VlKh_vIYcJc5JreaVHN88tHY.)
* 后端
  * JAVA &emsp;(语言)
  * SSM &emsp;(框架)
    * Spring
    * Spring MVC
    * Mybatis
  * MySql &emsp;(数据库)
  
## 功能简介

* v2.2.0
  * fea
    * 管理员可限制提交人员名单
      * *发起人可以设置能够提交的名单,名单之外的人员无法进行提交.*
    * 查看名单提交概况

* v2.1.0
  * fea
    * 分享链接支持生成短链接
      * *通过第三方API生成短链接.*
    * 设置指定子类的收取截止时间
    * 设置指定子类的文件模板

* v2.0.0
  * fea
    * 开放登录/注册
    * 生成文件收取链接
    * 管理提交的所有文件信息
    * 批量下载子类所有文件夹
      * *把指定子类的所有提交的文件压缩为一个.zip的压缩包提供下载.* 
    * 单个下载/删除指定的文件
    * 搜索关键字查询指定文件
    * 分类查询文件

* v1.0.0
  * fea   
    * 统一文件收取入口
    * 增删子/父类文件夹
  
* 更多功能,持续更新中...

## 页面预览
### PC端
#### 登录/注册
![](https://img2018.cnblogs.com/blog/1504886/201905/1504886-20190528021202292-901637899.png)

#### 类目管理
![](https://img2018.cnblogs.com/blog/1504886/201905/1504886-20190528021357535-1518047922.png)

#### 文件模板/截止日期/人员限制面板
![](https://img2018.cnblogs.com/blog/1504886/201905/1504886-20190528021659414-931197767.png)

#### 人员提交概况面板
![](https://img2018.cnblogs.com/blog/1504886/201905/1504886-20190528021745141-118025354.png)

#### 文件收取页面
![](https://img2018.cnblogs.com/blog/1504886/201905/1504886-20190528022128871-425005450.png)

#### 文件分类管理页面
![](https://img2018.cnblogs.com/blog/1504886/201905/1504886-20190528005627042-969495827.png)

### 移动端

![](https://img2018.cnblogs.com/blog/1504886/201905/1504886-20190528024440255-715169717.png)

Tips:界面自我感觉还行,毕竟审美有限,如有更好的idea欢迎交流
## 后续
* improve
  * 优化页面细节交互
* feature
  * 完善基本信息修改功能
  * 增加鸡汤文(打气)滚播
  * 部分格式文件在线预览
  * 更多更多实用功能正在路上

## 其他
此项目个人会一直更新维护下去,如你有兴趣参与此项目,请私信我或者[fork](https://github.com/ATQQ/EasyPicker)<br>欢迎各位哥哥姐姐,父老乡亲,叔叔阿姨给我点 "[Star](https://github.com/ATQQ/EasyPicker)" <br>第一次发表个人作品文章,希望大家给点鼓励.

![心动](https://sugarat.top/WebHomeWork/WebUI/img/心动.gif)
> 项目源码地址:[EasyPicker](https://github.com/ATQQ/EasyPicker)<br>

> 体验地址: [EasyPicker](https://sugarat.top/EasyPicker/home)


>Bug反馈:[https://github.com/ATQQ/EasyPicker/issues/2](https://github.com/ATQQ/EasyPicker/issues/2)

>新功能建议:[https://github.com/ATQQ/EasyPicker/issues/1](https://github.com/ATQQ/EasyPicker/issues/1)

