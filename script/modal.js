// https://www.w3schools.com/howto/howto_css_modals.asp

// Modal logic as a function to be called after cards are generated
function attachModalListeners() {
  var modal = document.getElementById('myModal');
  if (!modal) return;
  var modalTitle = modal.querySelector('.modal-title');
  var modalDescription = modal.querySelector('.modal-description');
  var modalOther = modal.querySelector('.modal-other');
  var modalFooter = modal.querySelector('.modal-footer-text');
  var closeBtn = modal.querySelector('.close');

  // Utility to open modal with given data
  function openModal(data) {
    modalTitle.innerText = data.title || 'Produit';
    modalDescription.innerText = data.description || (data.price ? ('Prix : ' + data.price) : '');
    modalOther.innerText = data.other || 'Disponible en plusieurs coloris et tailles.';
    modalFooter.innerText = data.footer || 'Livraison gratuite pour toute commande supérieure à 50€.';
    modal.style.display = 'block';
  }

  // Remove previous listeners to avoid duplicates
  var oldButtons = modal._attachedButtons || [];
  oldButtons.forEach(function(btn) {
    btn.removeEventListener('click', btn._modalHandler);
  });

  // Attach click handlers to every learn-more button
  var infoButtons = document.querySelectorAll('.learn-more');
  infoButtons.forEach(function(btn) {
    // Remove previous handler if any
    if (btn._modalHandler) btn.removeEventListener('click', btn._modalHandler);
    var handler = function(e) {
      var card = btn.closest('.product-card');
      if (!card) return openModal({ title: 'Produit' });
      var title = (card.querySelector('h2') || {}).innerText || '';
      var price = (card.querySelector('.price') || {}).innerText || '';
      var descParagraph = Array.from(card.querySelectorAll('p')).find(function(p) {
        return !p.classList.contains('price');
      });
      var description = descParagraph ? descParagraph.innerText : '';
      var img = card.querySelector('img');
      var imgAlt = img ? img.alt : '';
      openModal({
        title: title,
        description: description || imgAlt || ('Prix : ' + price),
        other: 'Disponible en plusieurs coloris et tailles.',
        footer: 'Livraison gratuite pour toute commande supérieure à 50€.'
      });
    };
    btn.addEventListener('click', handler);
    btn._modalHandler = handler;
  });
  modal._attachedButtons = Array.from(infoButtons);

  // Close handlers
  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.style.display = 'none';
    };
  }
  // Click outside modal to close
  window.onclick = function(event) {
    if (event.target === modal) modal.style.display = 'none';
  };
  // Escape key closes modal
  window.onkeydown = function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  };
}

// Expose globally
window.attachModalListeners = attachModalListeners;