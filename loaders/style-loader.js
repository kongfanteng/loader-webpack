let loaderUtils = require('loader-utils');
function loader(source) {
  let str = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `
  return str;
}
// style-loader less-loader!css-loader/ ./index.less
loader.pitch = function (remainingRequest) {
  // remainingRequest剩余请求
  // console.log(remainingRequest) // "/Users/Desktop/loader-webpack/loaders/css-loader.js!/Users/Desktop/loader-webpack/loaders/less-loader.js!/Users/Desktop/loader-webpack/src/index.less" 转换成相对路径 "!!../loaders/css-loader.js!../loaders/less-loader.js!./index.less"
  // loaderUtils.stringifyRequest方法：绝对路径转为相对路径
  let str = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
    document.head.appendChild(style);
  `
  return str; 
}
module.exports = loader;