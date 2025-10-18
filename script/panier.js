document.addEventListener('DOMContentLoaded', () => {

    const soustotalElement = document.querySelector('soustotal');
    const livraisonElement = document.querySelector('livraison');
    const totalElement = document.querySelector('total');
    const livraisonMethodSelect = document.querySelector('#livraisonmethod');
    const messagePanierVide = document.querySelector('#panier-vide-message');

    // prix de livraison
    const fraisDeLivraison = {
        colissimo: 7.50,
        mondial_relay: 4.50,
        chronopost: 12.00
    };

    //fonction de calcul du total
    function mettreAJourLeTotal() {
        let sousTotal = 0;
        //message panier vide
        const tousLesProduits = document.querySelectorAll('produit');
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
        const coutLivraison = fraisDeLivraison[methodeChoisie];
        const fraisReels = sousTotal > 0 ? coutLivraison : 0;
        const totalFinal = sousTotal + fraisReels;

        soustotalElement.textContent = `Sous-total: ${sousTotal.toFixed(2)}€`;
        livraisonElement.textContent = `Livraison: ${fraisReels.toFixed(2)}€`;
        totalElement.textContent = `Total: ${totalFinal.toFixed(2)} €`;
    }

//les compteurs
    document.querySelectorAll('produit .quantity').forEach(compteur => {
        const increaseButton = compteur.querySelector('.increase');
        const decreaseButton = compteur.querySelector('.decrease');
        const quantitySpan = compteur.querySelector('.qty');
//boutton plus
        increaseButton.addEventListener('click', () => {
            let quantite = parseInt(quantitySpan.textContent);
            quantite++;
            quantitySpan.textContent = quantite;
            mettreAJourLeTotal();
        });
// boutton moins
        decreaseButton.addEventListener('click', () => {
            let quantite = parseInt(quantitySpan.textContent);
            if (quantite > 1) {
                quantite--;
                quantitySpan.textContent = quantite;
                mettreAJourLeTotal();
            }
        });
    });

    //bouton supprimer
    document.querySelectorAll('.removebtn').forEach(bouton => {
        bouton.addEventListener('click', (event) => {
            event.target.closest('produit').remove();
            mettreAJourLeTotal();
        });
    });
    livraisonMethodSelect.addEventListener('change', () => {
        mettreAJourLeTotal();
    });
    mettreAJourLeTotal();
  
});