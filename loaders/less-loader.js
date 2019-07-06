let less = require('less');
function loader(source) {
  let css;
  less.render(source, (err, r) => {
    if (err) return console.log(err);
    css = r.css;
  });
  return css;
}
module.exports = loader;