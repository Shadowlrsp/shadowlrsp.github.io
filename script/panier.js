var cart = [];

document.addEventListener('DOMContentLoaded', () => {

    
    const soustotalElement = document.querySelector('.sous-total');
    const livraisonElement = document.querySelector('.livraison');
    const totalElement = document.querySelector('.total');
    const livraisonMethodSelect = document.querySelector('#livraisonmethod');
    const messagePanierVide = document.querySelector('#panier-vide-message');
    const panierContainer = document.querySelector('.produit-panier'); 

    // Prix de livraison
    const fraisDeLivraison = {
        colissimo: 7.50,
        mondial_relay: 4.50,
        chronopost: 12.00
    };

   
    function mettreAJourLeTotal() {
        let sousTotal = 0;
        // Message panier vide
        const tousLesProduits = document.querySelectorAll('.produit');
        
        if (tousLesProduits.length === 0) {
            messagePanierVide.style.display = 'block';
        } else {
            messagePanierVide.style.display = 'none';
        }

        tousLesProduits.forEach(produit => {
            const prix = parseFloat(produit.dataset.price);
            const quantite = parseInt(produit.querySelector('.qty').textContent);

            if (!isNaN(prix) && !isNaN(quantite)) {
                sousTotal += prix * quantite;
            }
        });

        const methodeChoisie = livraisonMethodSelect.value;
        const coûtLivraison = fraisDeLivraison[methodeChoisie];
        const fraisRéels = sousTotal > 0 ? coûtLivraison : 0; 
        const totalFinal = sousTotal + fraisRéels;

        soustotalElement.textContent = `Sous-total: ${sousTotal.toFixed(2)} €`;
        livraisonElement.textContent = `Livraison: ${fraisRéels.toFixed(2)} €`;
        totalElement.textContent = `Total: ${totalFinal.toFixed(2)} €`;
    }

    panierContainer.addEventListener('click', (event) => {
        const target = event.target;

        //bouton supprimer
        const removeButton = target.closest('.removebtn');
        if (removeButton) {
            removeButton.closest('.produit').remove(); 
            mettreAJourLeTotal();
            return; 
        }

        // bouton plus
        if (target.classList.contains('increase')) {
            const quantitySpan = target.previousElementSibling;
            let quantite = parseInt(quantitySpan.textContent);
            quantite++;
            quantitySpan.textContent = quantite;
            mettreAJourLeTotal();
            return;
        }

        //bouton moins
        if (target.classList.contains('decrease')) {
            const quantitySpan = target.nextElementSibling;
            let quantite = parseInt(quantitySpan.textContent);
            if (quantite > 1) {
                quantite--;
                quantitySpan.textContent = quantite;
                mettreAJourLeTotal();
            }
            return;
        }
    });

    
    livraisonMethodSelect.addEventListener('change', () => {
        mettreAJourLeTotal();
    });

    
    mettreAJourLeTotal();

});

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return;
    
    try {
        cart = JSON.parse(savedCart);
        console.log('Cart loaded:', cart);
    } catch (e) {
        console.error('Error loading cart:', e);
        cart = [];
    }
}