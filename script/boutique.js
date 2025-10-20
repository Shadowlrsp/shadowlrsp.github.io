/*
Script utilise pour populer la boutique avec des produits dynamiquement.
*/

/* Ancien code html exemple


        <div class="products">
            <h1> Des poignées à portée de main</h1>
            <div class="door-handles">
                <!-- Ajout dynamique des produits par javascript -->
                <!-- Classe pour une card : doorhandle-card -->
                 <div class="product-card">
                    <div class="top-card">
                        <img src="assets/boutique/poignees/poignee1.jpg" alt="Poignée de porte classique">
                        <p class="description" style="display: none;">La poignee de vos reves</p>
                        <button class="learn-more" id="learn-more">
                            <span class="material-icons-outlined">
                                info
                            </span>
                        </button>
                    </div>
                    <div class="bottom-card">
                        <h2>Poignée Classique</h2>
                        <!-- <p>Une poignée élégante et intemporelle pour toutes les portes.</p> -->
                        <p class="price">29,99 €</p>
                        <button class="add-to-cart">Ajouter au panier</button>
                    </div>
                 </div>
            </div>

            <h1> Des encadrements pour tous les goûts </h1>
            <div class="door-frames">
                <!-- Ajout dynamique des produits par javascript -->
                <!-- Classe pour une card : doorframe-card -->
            </div>

            <h1> Des serrures pour votre sécurité </h1>
            <div class="door-locks">
                <!-- Ajout dynamique des produits par javascript -->
                <!-- Classe pour une card : doorlock-card -->
            </div>
        </div>
    </div>
*/
document.addEventListener('DOMContentLoaded', function() {
    // 'base de donnees' des poignées de porte
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

    // Sélectionne le conteneur des poignées
    const handlesContainer = document.querySelector('.door-handles');
    if (handlesContainer) {
        handlesContainer.innerHTML = '';
        handles.forEach(function(handle, idx) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="top-card">
                    <img src="${handle.img}" alt="${handle.alt}">
                    <button class="learn-more" data-index="${idx}">
                        <span class="material-icons-outlined">info</span>
                    </button>
                </div>
                <div class="bottom-card">
                    <h2>${handle.title}</h2>
                    <p class="price">${handle.price}</p>
                    <button class="add-to-cart">Ajouter au panier</button>
                </div>
            `;
            handlesContainer.appendChild(card);
        });
        if (window.attachModalListeners) window.attachModalListeners();
    }
});