
// #3. 引入 loader-utils schema-utils(校验) fs
let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils');
let fs = require('fs');
function loader(source) { // #1. 创建loader函数
  this.cacheable && this.cacheable(false); // #9. 每次打包时是否缓存,默认缓存
  // #4. 获取上下文中的options
  let options = loaderUtils.getOptions(this); 
  // console.log(options); // { text: 'kft', filename: '/Desktop/loader-webpack/banner.js' }
  let cb = this.async();
  // #5. 定义校验参数 
  let schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string'
      },
      filename: {
        type: 'string'
      }
    }
  }
  // #6. 进行校验
  validateOptions(schema, options, 'banner-loader');
  // #7. 读取注释内容，合并source
  if (options.filename) {
    this.addDependency(options.filename); // #8. 监控时，自动添加文件依赖
    fs.readFile(options.filename, 'utf8', function (err, data) {
      cb(err, `/**${data}**/${source}`);
    })
  } else {
    cb(null, `/**${options.text}**/${source}`);
  }
}
module.exports = loader; // #2. 导出