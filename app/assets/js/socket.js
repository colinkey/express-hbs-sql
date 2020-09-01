var socket = socket ? socket : io();

socket.on('suspense-message', ({ id, replacer, insertionMethod }) => {
  const suspender = document.querySelector(`[data-suspense='${id}']`);
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
