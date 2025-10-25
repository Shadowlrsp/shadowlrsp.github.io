/*
Script utilise pour populer la boutique avec des produits dynamiquement.
*/

const doorhandles = [
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

const doorframes = [
    {
        "title": "Cadre de porte en bois blanc",
        "price": "79,99 €",
        "img": "assets/boutique/cadres/frame1.jpg",
        "alt": "Cadre de porte en bois blanc",
        "description": "Un cadre robuste en bois massif avec une touche de modernité."
    },
    {
        "title": "Cadre en bois avec fenetre assorti",
        "price": "79,99 €",
        "img": "assets/boutique/cadres/frame2.jpg",
        "alt": "Cadre de porte en bois blanc",
        "description": "Un cadre robuste en bois massif avec une touche de modernité."
    },
    {
        "title": "Cadre de porte en bois blanc",
        "price": "79,99 €",
        "img": "assets/boutique/cadres/frame3.jpg",
        "alt": "Cadre de porte en bois blanc",
        "description": "Un cadre robuste en bois massif avec une touche de modernité."
    },
    {
        "title": "Cadre de porte en bois blanc",
        "price": "79,99 €",
        "img": "assets/boutique/cadres/frame4.jpg",
        "alt": "Cadre de porte en bois blanc",
        "description": "Un cadre robuste en bois massif avec une touche de modernité."
    },
    {
        "title": "Cadre de porte en bois blanc",
        "price": "79,99 €",
        "img": "assets/boutique/cadres/frame5.jpg",
        "alt": "Cadre de porte en bois blanc",
        "description": "Un cadre robuste en bois massif avec une touche de modernité."
    },
    {
        "title": "Cadre de porte en bois blanc",
        "price": "79,99 €",
        "img": "assets/boutique/cadres/frame6.jpg",
        "alt": "Cadre de porte en bois blanc",
        "description": "Un cadre robuste en bois massif avec une touche de modernité."
    }
]

var cart = [];

document.addEventListener('DOMContentLoaded', function() {
    // 'base de donnees' des poignées de porte
    loadCart();

    // Sélectionne le conteneur des poignées
    const handlesContainer = document.querySelector('.door-handles');
    if (handlesContainer) {
        handlesContainer.innerHTML = '';
        doorhandles.forEach(function(handle, idx) {
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
            
            handlesContainer.appendChild(card);
        });

        handlesContainer.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart');
            if (!addToCartBtn) return;

            const card = addToCartBtn.closest('.product-card');
            if (!card) return;

            const popup = document.querySelector('.popup');
            if (popup) {
                popup.style.opacity = 1.0;
                setTimeout(() => {
                    popup.style.opacity = 0.0;
                }, 2000);
            }

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

    //fonction ajouter au panier
    function ajouterAuPanier(product) {
        let panier = JSON.parse(localStorage.getItem('monPanier')) || [];
        const existingProductIndex = panier.findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {
            
            panier[existingProductIndex].quantity += 1;
        } else {

            panier.push(product);
        }

        localStorage.setItem('monPanier', JSON.stringify(panier));
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

// while(true) {
//     const popup = document.querySelector('.popup');
//     if(popup) {
//         if(popup.style.opacity <= 0.01) {
//             popup.style.display = 'none';
//         }
//     }
// }