'use strict';

const path = require('path');


module.exports = {
    devServer: {
        contentBase: './dist',//项目基本访问目录
        host: 'localhost',//服务器ip地址
        port: 8080,//端口
        open: true //自动打开页面
    },
    // entry: ['./src/index.js','./src/index2.js'],
    // context: path.resolve(__dirname),
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),//输出目录
        filename: '[name].js',//打包后的文件名
        // publicPath: 'pathOrUrlWhenProductionBuild'
    },
    module: {
        rules: [
            {
                test:/\.css$/,//正则表达式,以.css结尾的文件
                use: ['style-loader','css-loader']//顺序不能颠倒
            },
            {
                test:/\.less$/,
                use: ['style-loader', 'css-loader','less-loader']
            }
        ]
    },
    resolve: {
    },
    devtool: 'source-map',
    plugins: [
    ]
};
