function includeCSS(fileName) {
  return `<link rel="stylesheet" href="/css/${fileName}.css">`;
}

function includeJS(fileName) {
  return `<script src="/js/${fileName}.js"></script>`;
}

function registerSuspense(id) {
  return `<script>
  document.addEventListener('DOMContentLoaded', () => {
    console.log('registering...');
  });
  const socket = io();
  const suspender = document.querySelector('[data-suspense="${id}"]');
  socket.on('connection', ())
  console.log(suspender)
  </script>`;
}

module.exports = {
  includeCSS,
  includeJS,
  registerSuspense,
};