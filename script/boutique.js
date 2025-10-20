/*
Script utilise pour populer la boutique avec des produits dynamiquement.
*/

var cart = [];

document.addEventListener('DOMContentLoaded', function() {
    // 'base de donnees' des poignées de porte
    loadCart();
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
                    <img src="${handle.img}" alt="${handle.alt}" id="handle-img">
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

        handlesContainer.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart');
            if (!addToCartBtn) return;

            const card = addToCartBtn.closest('.product-card');
            if (!card) return;

            const productInfo = {
                title: card.querySelector('h2')?.textContent,
                price: card.querySelector('.price')?.textContent,
                image: card.querySelector('img')?.src,
                description: handles[card.querySelector('.learn-more')?.dataset?.index]?.description
            };
            cart.push(productInfo);
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Product added to cart:', productInfo);
        });


        if (window.attachModalListeners) window.attachModalListeners();
    }
});

function GetElementInsideContainer(containerID, childID) {
    var elm = document.getElementById(childID);
    var parent = elm ? elm.parentNode : {};
    return (parent.id && parent.id === containerID) ? elm : {};
}

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

function clearCart() {
    localStorage.removeItem('cart');
    cart = [];
    console.log('Cart cleared');
}