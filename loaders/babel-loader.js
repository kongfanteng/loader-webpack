// #3. 引入babel loaderUtils
let babel = require("@babel/core");
let loaderUtils = require('loader-utils');
function loader(source) { // this loaderContext #1. loader函数
  // console.log(Object.keys(this)); // #4. 查看上下文
  // #5. 获取options { presets: [ '@babel/preset-env' ] }
  let options = loaderUtils.getOptions(this); 
  // console.log(options);
  let cb = this.async(); // #7. api实现异步回调
  // #6. babel转化
  babel.transform(source, { 
    ...options,
    sourceMap: true,
    filename: this.resourcePath.split('/').pop() // 文件名
  }, function (err, result) {
    cb(err, result.code, result.map); // #8. 异步回调
  })
}
module.exports = loader; // #2. 导出loader