function includeCSS(fileName) {
  return `<link rel="stylesheet" href="/css/${fileName}.css">`;
}

function includeJS(fileName) {
  return `<script src="/js/${fileName}.js"></script>`;
}

function registerSuspense(id) {
  return `<script>
  var socket = io();
  document.addEventListener('DOMContentLoaded', () => {
    socket.emit('ready-state', {id: '${id}'}); 
    socket.on('suspense-message', ({ id, replacer, insertionMethod }) => {
      const suspender = document.querySelector("[data-suspense='${id}']");
      if (suspender) {
        const suspendee = document.createElement('div');
        suspendee.innerHTML = replacer;
        if (insertionMethod === 'replace') {
          suspender.parentNode.replaceChild(suspendee, suspender);
        } else if (insertionMethod === 'append') {
          suspender.appendChild(suspendee);
        } else if (insertionMethod === 'prepend') {
          suspender.prepend(suspendee); 
        }
      }
    });
  });
  </script>`;
}

module.exports = {
  includeCSS,
  includeJS,
  registerSuspense,
};