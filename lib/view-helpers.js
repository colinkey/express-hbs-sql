function includeCSS(fileName) {
  return `<link rel="stylesheet" href="/css/${fileName}.css">`;
}

function includeJS(fileName) {
  return `<script src="/js/${fileName}.js"></script>`;
}

module.exports = {
  includeCSS,
  includeJS,
};