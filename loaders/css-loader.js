function loader(source) {
  let reg = /url\((.+?)\)/g;
  let pos = 0;
  let current;
  let arr = ['let list= []'];
  while (current = reg.exec(source)) {
    let [matchUrl, g] = current;
    // console.log(matchUrl, g);
    let last = reg.lastIndex - matchUrl.length;
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
    pos = reg.lastIndex;
    // 把 g 替换成require的写法 => url(require('xxx'))
    arr.push(`list.push('url('+ require(${g}) +')')`)
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
  arr.push(`module.exports = list.join('')`);
  return arr.join('\r\n');
}
module.exports = loader;
// 'url(之前' + ...jpg + ')之后' -> 'url(之前' + url(require(...jpg)) + ')之后'
// let list= []
// list.push("body {\n  background: red;\n  background: ")
// list.push('url('+require(./logo.png)+')')
// list.push(";\n}\n")
// module.exports = list.join('')