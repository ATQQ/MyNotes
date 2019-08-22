# 前端学习路线/经验总结
## 基础
* HTML/CSS/JS 
  * description:&emsp;&emsp;**了解基础用法及相关语法规则** 
  * time:&emsp;&emsp;**一周左右的时间**
  * tips:&emsp;&emsp;**CSS这里不包括CSS动画与选择器**

* 综合实战 
  * description:&emsp;&emsp;**一套使用JS/HTML/CSS的实战教程**
  * time:&emsp;&emsp;**一周左右的时间**
  * tips:&emsp;&emsp;**通过这套实战去熟练基础的内容**

## CSS预处理语言
* [SASS](https://www.sass.hk/)/[LESS](http://lesscss.cn/)
  * tips:&emsp;&emsp;**这两个学其一个就可以,语法规则上大同小异**.
  * time:&emsp;&emsp;**1天**
  * 简介用法
    ```SCSS
    .test1{
    font-size: 90px;
    p{
        color: #fff;
        &:active{
            color: aqua;
        }
    }
    }
    .test2{
        font-size: 100px;
        p{
            color:#000;
            &:hover{
                color: red;
            }
        }
    }
    ```
    **编译过后**
    ```CSS
    .test1 {
    font-size: 90px;
    }
    .test1 p {
      color: #fff;
    }
    .test1 p:active {
      color: aqua;
    }
    .test2 {
      font-size: 100px;
    }
    .test2 p {
      color: #000;
    }
    .test2 p:hover {
      color: red;
    }

    ```
    **当然还有很多原生CSS所不具备的特性，这里就不一一赘述了**

## JQuery学习
  * 一款js的入门框架
  * write Less,Do More
  * time:&emsp;&emsp; **1天**
  * 学习方法 **实战入手(#^.^#),又看了一套使用JQuery的实战,顺带熟悉CSS/Scss与HTML的知识,查漏补缺.**

## UI框架(响应式布局)
  * 简而言之，就是一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本。  
  * [AmazeUI(妹子UI)](http://amazeui.org/) 
    * Tips: 跟[BootStrap](http://www.bootcss.com/)相比仍有许多不足之处,但文档对新手来说较为友好,所以当时就选择了这个UI框架入门响应式.
  * [Bootstrap](http://www.bootcss.com/)
    * Tips:目前最受欢迎的前端框架
  * UI框架的学习同样离不开实战,通过实战教程能避免少踩一些坑

## Flex弹性布局
* 常用于移动端,通过简短的代码,能够轻松实现各种布局效果

## 主流JS框架学习
* [Vue.js](https://cn.vuejs.org/index.html)
  
## 构建工具
* [WebPack](https://webpack.js.org/)
  * Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源
* [NPM](https://www.npmjs.com.cn/)
  * NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题.
