const socket = io();

socket.on('server-message', ({ replacer, insertionMethod }) => {
  const suspender = document.querySelector('[data-suspense]');
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

socket.on('room-created', ({ room }) => {
  console.log(room);
});