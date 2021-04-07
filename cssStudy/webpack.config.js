const path = require('path')
const miniCssExtract = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin')
const fileUtil = require('./fileUtil')
let chunksDirs = ['src/js', 'src/pages']
let pagesDir = 'src/pages'

let getAllChunks = dirs => {
    return dirs.reduce((prev, current) => {
        return {
            ...prev,
            ...fileUtil.getDirFileByType(current, 'js').reduce((a, b) => {
                a[path.basename(b, '.js')] = path.resolve(b);
                return a
            }, {})
        }
    }, {})
}

let getAllPagesBaseConfig = dir => {
    let files = fileUtil.getDirFileByType(dir, '.html')
    return files.map(file => {
        return {
            template: file,
            filename: path.basename(file),
            chunks: [path.basename(file, '.html')]
        }
    })
}

let entry = getAllChunks(chunksDirs)
let htmlPlugins = getAllPagesBaseConfig(pagesDir).map(cfg => {
    return new htmlWebpackPlugin({
        ...cfg,
        minify: {
            minimize: true, //是否打包为最小值
            removeAttrbuteQuotes: true, //去除引号
            removeComments: true, //去掉注释
            collapseWhitespace: true, //去掉空格
            minifyCss: true, //压缩css
            removeEmptyElements: false, //清理内容为空的元素
        },
        hash: true //引入产出的资源时加上哈希避免缓存
    })
})


module.exports = {
    devServer: {
        contentBase: './dist', //项目基本访问目录
        host: '127.0.0.1', //服务器ip地址
        port: 8088, //端口
        open: true
    },
    mode: 'development',
    entry: entry,
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: miniCssExtract.loader,
                options: {
                    publicPath: '../'
                }
            }, 'css-loader']
        }, {
            test: /\.less$/,
            use: [{
                loader: miniCssExtract.loader,
                options: {
                    publicPath: '../'
                }
            }, 'css-loader', 'less-loader']
        }]
    },
    plugins: [
        new miniCssExtract({
            filename: './css/[name].css'
        }),
        new CleanWebpackPlugin(),
        ...htmlPlugins
        // new htmlWebpackPlugin({
        //     template: "./src/index.html",
        //     filename: "index.html", //生成的文件名
        //     minify: {
        //         minimize: true, //是否打包为最小值
        //         removeAttrbuteQuotes: true, //去除引号
        //         removeComments: true, //去掉注释
        //         collapseWhitespace: true, //去掉空格
        //         minifyCss: true, //压缩css
        //         removeEmptyElements: false, //清理内容为空的元素
        //     },
        //     chunks: ['index'], //引入对应的js(对应(entry)中的入口文件)
        //     hash: true //引入产出的资源时加上哈希避免缓存
        // }),

    ]
}