let inputValue = '';

self.addEventListener('message', function(event) {
  inputValue = event.data;

  sendMessageToAllClient(inputValue);
});

function sendMessageToAllClient(message) {
  clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage(message));
  });
}
