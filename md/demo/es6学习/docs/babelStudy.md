## Babel工具搭建ES6环境
### 项目环境搭建
* 创建目录然后新建一个项目(使用默认配置)
```
cnpm init -y
```
* 安装所需插件
```
cnpm i --save-dev babel-cli babel-preset-es2015
```
* 新建目录
```
src
    test.js
dist
```
* 使用命令检测是否安装是否正常(如果dist中生成了test.js则正常)
```
.\node_modules\.bin\babel src\test.js --out-file dist\test.js
```
### babel配置
* 新建.babelrc文件
  ```json
    {
    "presets": ["es2015"]
    }
  ```
* 运行命令后查看生成的文件
  ```
  .\node_modules\.bin\babel src\test.js --out-file dist\test.js
  ```
* 同时转换多个文件
```npm
.\node_modules\.bin\babel src --out-dir dist
```
### 开启自动监听文件修改
* package.json
  中编辑scripts
1. 监听单个文件
```json
"scripts":{
    "dev":"babel src/test.js -w -o dist/test.js"
}
```
2. 监听指定目录
```json
"scripts":{
    "dev":"babel src -w -d dist"
}
```