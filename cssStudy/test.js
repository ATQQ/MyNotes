const fileUtil = require('./fileUtil')
const path = require('path')
let chunksDir = ['./src/js', './src/pages']

// jschunks = jschunks.reduce((a, b) => {
//     return a.concat(fileUtil.getDirFileByType(b, '.js'))
// }, [])



let getAllChunks = dirs => {
    return dirs.reduce((prev, current) => {
        return {
            ...prev,
            ...fileUtil.getDirFileByType(current, 'js').reduce((a, b) => {
                a[path.basename(b, '.js')] = b;
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

// console.log(getAllChunks(chunksDir));
console.log(getAllPagesBaseConfig('./src/pages'));