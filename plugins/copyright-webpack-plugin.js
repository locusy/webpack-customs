class CopyrightWebpackPlugin {
    // options接收的参数
    constructor(options) {
        console.log(options)
    }

    // compiler：webpack实例 包含了所有打包信息
    apply(compiler) {
        // 同步钩子
        compiler.hooks.compilation.tap(
            "CopyrightWebpackPlugin",
            (compilation) => {
                console.log('同步 compilation')
            }
        )

        // 创建dist目录之前 异步钩子 往dist目录增加文件
        compiler.hooks.emit.tapAsync(
            "CopyrightWebpackPlugin", 
            // compilation  本次打包的信息
            (compilation, callback) => {
                compilation.assets["copyright.txt"] = {
                    source: function() {
                        return "copy right"
                    },
                    size: function() {
                        return 1024
                    }
                }
                callback()
            }
        ) 
    }
}

module.exports = CopyrightWebpackPlugin