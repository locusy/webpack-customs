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
    // 一、使用直接路径
    module: {
        rules: [
            {
                test: /\.js$/,
                // 一、直接写法（只有一个loader）
                // loader: path.resolve(__dirname, './loaders/replaceLoader.js')
                // 二、传递参数写法 （多个loader执行顺序：自下而上 自右向左）
                use: [
                    path.resolve(__dirname, './loaders/replaceLoader.js'),
                    {
                        loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
                        options: {
                            name: '一个参数'
                        }
                    }
                ]
            }
        ]
    },

    // 二、使用处理loader的路径写法
    // 按顺序查找loader 先去node_module查找，再去loaders查找
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    "replaceLoader",
                    {
                        loader: "replaceLoaderAsync",
                        options: {
                            name: '一个参数'
                        }
                    }
                ]
            }
        ]
    },
}
