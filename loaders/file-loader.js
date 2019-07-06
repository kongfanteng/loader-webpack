
let loaderUtils = require('loader-utils');
function loader(source) {
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source }) // 根据当前图片格式生成路径
  this.emitFile(filename, source); // 发射文件
  return `module.exports="${filename}"`;
}
loader.raw = true;
module.exports = loader;