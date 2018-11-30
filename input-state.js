(async () => {
  const scriptURL = './sw.js';

  const syncStateWithSW = document.querySelector('#syncStateWithSW');

  await navigator.serviceWorker.register(scriptURL);

  const activeServiceWorker = navigator.serviceWorker.controller;

  navigator.serviceWorker.addEventListener('message', function(event) {
    syncStateWithSW.value = event.data;
  });

  syncStateWithSW.addEventListener('input', event => {
    navigator.serviceWorker.controller.postMessage(event.target.value);
  });
})();
