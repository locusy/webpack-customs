//官方推荐处理理loader, query的工具
const loaderUtils = require("loader-utils");

//不能用箭头函数 需要⽤用声明式函数，因为要上到上下文的this的数据，该函数接受一个参数，是源码
module.exports = function(source) {
    // source 源码内容
    // console.log('源码', source)

    // this.query 接收的参数
    // console.log('参数', this.query.name)
    
    // 使用loaderUtils
    const options = loaderUtils.getOptions(this)
    console.log('loaderUtils', options.name)

    // 直接return结果
    // return source.replace('tiantian', options.name)

    // this.callBack处理结果
    // const result = source.replace("tiantian", options.name);
    // this.callBack(null, result)

    // 直接使用setTimeout会报错
    // setTimeout(() => {
    //     const result = source.replace("tiantian", options.name);
    //     return result
    // }, 1000)

    // 使用this.async处理异步 callback 就是 this.callback 注意参数的使⽤用
    const callback = this.async()
    setTimeout(() => {
        const result = source.replace("tiantian", options.name);
        callback(null, result)
    }, 3000)
}