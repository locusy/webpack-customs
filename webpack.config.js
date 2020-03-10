// https://webpack.js.org/contribute/writing-a-loader/ 
// https://webpack.js.org/api/loaders/
    
const path = require('path')

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // 一、直接写法
                // loader: path.resolve(__dirname, './loaders/replaceLoader.js')
                // 二、传递参数写法
                use: {
                    loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
                    options: {
                        name: '一个参数'
                    }
                }
            }
        ]
    }
}
