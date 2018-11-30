(() => {
  const colorHash = new ColorHash();

  const dragAndDropContainer = document.querySelector('#dragAndDropContainer');
  const dragAndDropKeyInput = document.querySelector('#dragAndDropKey');
  const dragAndDropKeepItems = document.querySelector('#dragAndDropKeepItems');

  function enhanceWithDragAndDrop(item, innerText) {
    // Since we only have access to the dataTransfer "keys", we check them!
    const isDraggingOnValidDropZone = dataTransfer => dataTransfer.types.includes(dragAndDropKeyInput.value);

    item.draggable = true;

    item.ondragend = event => {
      // Notice how we check if the drop effect is equal to the one set by us.
      // If the drag doesn't end in a drop zone, it's set to none.
      if (event.dataTransfer.dropEffect === 'move' && !dragAndDropKeepItems.checked) {
        event.target.remove();
      }
    };
    item.ondragenter = event => {
      if (isDraggingOnValidDropZone(event.dataTransfer)) {
        event.target.style.opacity = 0.5;
      }
    };
    item.ondragleave = event => {
      if (isDraggingOnValidDropZone(event.dataTransfer)) {
        event.target.style.opacity = 1;
      }
    };
    item.ondragover = event => {
      if (isDraggingOnValidDropZone(event.dataTransfer)) {
        event.preventDefault();
      }
    };
    item.ondragstart = event => {
      event.dataTransfer.dropEffect = 'move';

      event.dataTransfer.setData(dragAndDropKeyInput.value, dragAndDropKeyInput.value);
      event.dataTransfer.setData('innerText', innerText);
    };
    item.ondrop = event => {
      event.preventDefault();

      event.target.style.opacity = 1;
      event.target.insertAdjacentElement('afterend', dragAndDropItemFactory(event.dataTransfer.getData('innerText')));
    };

    return item;
  }

  function enhanceWithMisc(item, innerText) {
    item.classList.add('drag-and-drop-item');
    item.innerText = innerText;
    item.style.backgroundColor = colorHash.hex(innerText);

    return item;
  }

  function dragAndDropItemFactory(innerText) {
    let item = document.createElement('div');

    item = enhanceWithMisc(item, innerText);

    item = enhanceWithDragAndDrop(item, innerText);

    return item;
  }

  const mockData = [
    {
      name: 'Lizard, blue-tongued'
    },
    {
      name: 'Ring-tailed lemur'
    },
    {
      name: 'Long-billed cockatoo'
    },
    {
      name: 'Raven, cape'
    },
    {
      name: 'Golden brush-tailed possum'
    },
    {
      name: 'Meerkat'
    },
    {
      name: 'Columbian rainbow boa'
    },
    {
      name: 'Malabar squirrel'
    },
    {
      name: 'Starling, superb'
    },
    {
      name: 'Heron, boat-billed'
    }
  ];

  mockData.forEach(value => {
    dragAndDropContainer.append(dragAndDropItemFactory(value.name));
  });
})();
