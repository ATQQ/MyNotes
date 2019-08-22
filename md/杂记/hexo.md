# 2019年7月31日11:41:25
## Hexo搭建个人博客记录
1. 安装node然后查看node版本
```
node -v
```
2. 全局安装hexo
```
npm i hexi-cli -g
```
3. 初始化博客目录
```
hexo init sugar (这里的sugar可以换成你自己的自定义的英文名)
```
4. 进入自己创建的目录
```
cd sugar
```
5. 安装项目的依赖文件
```
npm install
```
6. clean一下，然后生成静态页面(g===generate)
```
hexo clean
hexo g
```
7. 运行(s===server)
```
hexo s
```
8. 浏览器中输入生成的本地服务器地址
[localhost:4000](http://localhost:4000/)

## 修改网站个人信息
修改网站目录中的 _config.yml文件
```yml
 title: wistbean
        subtitle: 肯定会
        description: wistbean的个人博客，主要涉及到编程（Java，Python，Linux等），个人提升学习，视频教程，《肯定会软件技术》电台节目
        keywords: wistbean，肯定会，java，python，电台，教程
        author: wistbean
        language: zh

```