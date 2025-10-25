document.addEventListener('DOMContentLoaded', () => {





    // calcule des prix et peuplement du panier
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






    const handles = [
        {
            title: 'Poignée Classique',
            price: '29,99 €',
            img: 'assets/boutique/poignees/poignee1.jpg',
            alt: 'Poignée de porte classique',
            description: 'Une poignée élégante et intemporelle pour toutes les portes.'
        },
        {
            title: 'Poignée Moderne',
            price: '34,99 €',
            img: 'assets/boutique/poignees/poignee2.jpg',
            alt: 'Poignée de porte moderne',
            description: 'Design épuré pour un intérieur contemporain.'
        },
        {
            title: 'Poignée Vintage',
            price: '27,99 €',
            img: 'assets/boutique/poignees/poignee3.jpg',
            alt: 'Poignée de porte vintage',
            description: 'Un charme rétro pour vos portes anciennes.'
        },
        {
            title: 'Poignée Inox',
            price: '31,99 €',
            img: 'assets/boutique/poignees/poignee4.jpg',
            alt: 'Poignée de porte inox',
            description: 'Robuste et résistante à la corrosion.'
        },
        {
            title: 'Poignée Noire',
            price: '32,99 €',
            img: 'assets/boutique/poignees/poignee5.jpg',
            alt: 'Poignée de porte noire',
            description: 'Pour une touche moderne et élégante.'
        },
        {
            title: 'Poignée Dorée',
            price: '39,99 €',
            img: 'assets/boutique/poignees/poignee6.jpg',
            alt: 'Poignée de porte dorée',
            description: 'Finition dorée pour un effet luxueux.'
        },
        {
            title: 'Poignée Carrée',
            price: '28,99 €',
            img: 'assets/boutique/poignees/poignee7.jpg',
            alt: 'Poignée de porte carrée',
            description: 'Forme géométrique pour un style unique.'
        },
        {
            title: 'Poignée Ronde',
            price: '26,99 €',
            img: 'assets/boutique/poignees/poignee8.jpg',
            alt: 'Poignée de porte ronde',
            description: 'Simplicité et efficacité au quotidien.'
        }
    ];


    function ajouterAuPanier(product) {
        let panier = JSON.parse(localStorage.getItem('monPanier')) || [];
        const existingProductIndex = panier.findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {

            panier[existingProductIndex].quantity += 1;
        } else {

            panier.push(product);
        }

        localStorage.setItem('monPanier', JSON.stringify(panier));
        genererPanierHTML();
    mettreAJourLeTotal();
    }

    // carrouselle qui commence au millieu avec la deuxième ligne en décalage
    const allCarousels = document.querySelectorAll('.carrousel');

    allCarousels.forEach(carousel => {

        carousel.innerHTML = '';


        handles.forEach(function (handle, idx) {
            const card = document.createElement('div');
            card.className = 'cartecarrousel';
            card.innerHTML = `
                
                    <img src="${handle.img}" alt="${handle.alt}" class="imgcarrousel">
                
                <div class="bottom-card">
                    <h2>${handle.title}</h2>
                    <p class="price">${handle.price}</p>
                    <button class="add-to-cart">Ajouter au panier</button>
                </div>
            `;

            const addToCartButton = card.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', () => {

                const productToAdd = {
                    id: handle.title.replace(/\s+/g, '-').toLowerCase(),
                    title: handle.title,
                    price: parseFloat(handle.price.replace(',', '.').replace(' €', '')),
                    img: handle.img,
                    description: handle.description,
                    quantity: 1
                };

                ajouterAuPanier(productToAdd);
            });

            carousel.appendChild(card);
        });

        if (window.attachModalListeners) window.attachModalListeners();

        const items = carousel.querySelectorAll('.cartecarrousel');

        if (items.length === 0) {
            carousel.style.visibility = 'visible';
            return;
        }

      
        carousel.style.visibility = 'visible';
        const middleIndex = Math.floor(items.length / 2);
        
        if (items[middleIndex]) {
            let scrollPosition = items[middleIndex].offsetLeft; 

            if (carousel.id === 'carrousel_décalé') {
                scrollPosition += 100; 
            }else{
                scrollPosition=scrollPosition
            }
            carousel.scrollLeft = scrollPosition;
            
        }

        
    });
    genererPanierHTML();
    mettreAJourLeTotal();
});
