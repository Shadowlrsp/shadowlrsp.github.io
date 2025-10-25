document.addEventListener('DOMContentLoaded', () => {

    const soustotalElement = document.querySelector('.sous-total');
    const livraisonElement = document.querySelector('.détails_paiement .livraison');
    const totalElement = document.querySelector('.total');
    const livraisonMethodSelect = document.querySelector('#livraisonmethod');
    const messagePanierVide = document.querySelector('#panier-vide-message');

    const produitPanierContainer = document.querySelector('.produit-panier');


    // Prix de livraison
    const fraisDeLivraison = {
        colissimo: 7.50,
        mondial_relay: 4.50,
        chronopost: 12.00
    };


    function genererPanierHTML() {

        let panier = JSON.parse(localStorage.getItem('monPanier')) || [];


        produitPanierContainer.innerHTML = '';
        produitPanierContainer.appendChild(messagePanierVide);

        if (panier.length > 0) {
            panier.forEach(product => {

                const produitElement = document.createElement('article');
                produitElement.className = 'produit';
                produitElement.dataset.price = product.price;
                produitElement.dataset.id = product.id;



                // ancienne structure pour les produit:
                //      <article class="produit" data-price="25.50">
                //     <div class="centrage">
                //         <div class="produitimg">
                //             <img src="assets/panier/poignees/poignee1.jpg" alt="Poignée de porte dorée, base carrée"
                //                 class="imgproduit">
                //         </div>
                //         <div class="produitinfo">
                //             <h1>Poignée couleur dorée</h1>
                //             <p>Finition : couleur or, base carrée</p>
                //         </div>
                //     </div>
                //     <div class="produitprix">
                //         <p>Prix: 25.50 €</p>
                //         <div class="quantity">
                //             <button class="decrease">-</button>
                //             <span class="qty">1</span>
                //             <button class="increase">+</button>
                //         </div>
                //         <button class="removebtn"><img src="assets/panier/poubelle.svg" class="removebtnimg"
                //                 alt="Supprimer"></button>
                //     </div>
                // </article>
                //    nouvelle structure:
                produitElement.innerHTML = `
                 <div class="produitimg">
                            <img src="${product.img}" alt="${product.title}">
                        </div>
                    <div class="centrage">
                       
                        <div class="produitinfo">
                            <h2>${product.title}:</h2>
                            <p>${product.description}</p>
                        </div>
                    </div>
                    <div class="produitprix">
                        <p>Prix: ${product.price.toFixed(2)} €</p>
                        <div class="quantity">
                            <button class="decrease">-</button>
                            <span class="qty">${product.quantity}</span>
                            <button class="increase">+</button>
                        </div>
                        <button class="removebtn"><img src="assets/panier/poubelle.svg" class="removebtnimg"></button>
                    </div>
                `;

                produitPanierContainer.appendChild(produitElement);
            });
        }
    }

    // calcul du total:
    function mettreAJourLeTotal() {
        let sousTotal = 0;
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
        const coutLivraison = fraisDeLivraison[methodeChoisie];
        const fraisReels = sousTotal > 0 ? coutLivraison : 0;
        const totalFinal = sousTotal + fraisReels;


        soustotalElement.textContent = `Sous-total: ${sousTotal.toFixed(2)} €`;
        livraisonElement.textContent = `Livraison: ${fraisReels.toFixed(2)} €`;
        totalElement.textContent = `Total: ${totalFinal.toFixed(2)} €`;
    }


    function mettreAJourQuantiteStorage(productId, nouvelleQuantite) {
        let panier = JSON.parse(localStorage.getItem('monPanier')) || [];
        const productIndex = panier.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            panier[productIndex].quantity = nouvelleQuantite;
            localStorage.setItem('monPanier', JSON.stringify(panier));
        }
    }

    function supprimerDuStorage(productId) {
        let panier = JSON.parse(localStorage.getItem('monPanier')) || [];
        panier = panier.filter(item => item.id !== productId);
        localStorage.setItem('monPanier', JSON.stringify(panier));
    }


    // les boutons
    produitPanierContainer.addEventListener('click', (event) => {
        const target = event.target;


        const produitElement = target.closest('.produit');
        if (!produitElement) return;

        const productId = produitElement.dataset.id;
        let quantitySpan = produitElement.querySelector('.qty');
        let quantite = parseInt(quantitySpan.textContent);

        // bouton plus
        if (target.classList.contains('increase') || target.closest('.increase')) {
            quantite++;
            quantitySpan.textContent = quantite;
            mettreAJourQuantiteStorage(productId, quantite);
            mettreAJourLeTotal();
        }

        // bouton moins
        if (target.classList.contains('decrease') || target.closest('.decrease')) {
            if (quantite > 1) {
                quantite--;
                quantitySpan.textContent = quantite;
                mettreAJourQuantiteStorage(productId, quantite);
                mettreAJourLeTotal();
            }
        }

        // bouton de suppression
        if (target.classList.contains('removebtn') || target.closest('.removebtn')) {
            supprimerDuStorage(productId);
            produitElement.remove();
            mettreAJourLeTotal();
        }
    });


    livraisonMethodSelect.addEventListener('change', () => {
        mettreAJourLeTotal();
    });


    genererPanierHTML();
    mettreAJourLeTotal();
});
