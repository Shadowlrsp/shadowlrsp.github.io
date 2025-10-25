/*
Script utilisé pour peupler la boutique avec des produits dynamiquement,
avec gestion des catégories par article.
*/

const doorhandles = [
    {
        category: 'poignees',
        title: 'Poignée Classique',
        price: '29,99 €',
        img: 'assets/boutique/poignees/poignee1.jpg',
        alt: 'Poignée de porte classique',
        description: 'Une poignée élégante et intemporelle pour toutes les portes.'
    },
    {
        category: 'poignees',
        title: 'Poignée Moderne',
        price: '34,99 €',
        img: 'assets/boutique/poignees/poignee2.jpg',
        alt: 'Poignée de porte moderne',
        description: 'Design épuré pour un intérieur contemporain.'
    },
    {
        category: 'poignees',
        title: 'Poignée Vintage',
        price: '27,99 €',
        img: 'assets/boutique/poignees/poignee3.jpg',
        alt: 'Poignée de porte vintage',
        description: 'Un charme rétro pour vos portes anciennes.'
    },
    {
        category: 'poignees',
        title: 'Poignée Inox',
        price: '31,99 €',
        img: 'assets/boutique/poignees/poignee4.jpg',
        alt: 'Poignée de porte inox',
        description: 'Robuste et résistante à la corrosion.'
    },
    {
        category: 'poignees',
        title: 'Poignée Noire',
        price: '32,99 €',
        img: 'assets/boutique/poignees/poignee5.jpg',
        alt: 'Poignée de porte noire',
        description: 'Pour une touche moderne et élégante.'
    },
    {
        category: 'poignees',
        title: 'Poignée Dorée',
        price: '39,99 €',
        img: 'assets/boutique/poignees/poignee6.jpg',
        alt: 'Poignée de porte dorée',
        description: 'Finition dorée pour un effet luxueux.'
    },
    {
        category: 'poignees',
        title: 'Poignée Carrée',
        price: '28,99 €',
        img: 'assets/boutique/poignees/poignee7.jpg',
        alt: 'Poignée de porte carrée',
        description: 'Forme géométrique pour un style unique.'
    },
    {
        category: 'poignees',
        title: 'Poignée Ronde',
        price: '26,99 €',
        img: 'assets/boutique/poignees/poignee8.jpg',
        alt: 'Poignée de porte ronde',
        description: 'Simplicité et efficacité au quotidien.'
    }
];

const doorframes = [
    {
        category: 'cadres',
        title: "Cadre de porte en bois blanc",
        price: "79,99 €",
        img: "assets/boutique/cadres/frame1.jpg",
        alt: "Cadre de porte en bois blanc",
        description: "Un cadre robuste en bois massif avec une touche de modernité."
    },
    {
        category: 'cadres',
        title: "Cadre en bois avec fenêtre",
        price: "79,99 €",
        img: "assets/boutique/cadres/frame2.jpg",
        alt: "Cadre de porte en bois avec fenêtre",
        description: "Un cadre robuste en bois massif avec une touche de modernité."
    },
    {
        category: 'cadres',
        title: "Cadre de porte moderne",
        price: "79,99 €",
        img: "assets/boutique/cadres/frame3.jpg",
        alt: "Cadre de porte moderne",
        description: "Un cadre robuste en bois massif avec une touche de modernité."
    },
    {
        category: 'cadres',
        title: "Cadre en bois naturel",
        price: "79,99 €",
        img: "assets/boutique/cadres/frame4.jpg",
        alt: "Cadre de porte bois naturel",
        description: "Un cadre robuste en bois massif avec une touche de modernité."
    },
    {
        category: 'cadres',
        title: "Cadre minimaliste",
        price: "79,99 €",
        img: "assets/boutique/cadres/frame5.jpg",
        alt: "Cadre de porte minimaliste",
        description: "Un cadre robuste en bois massif avec une touche de modernité."
    },
    {
        category: 'cadres',
        title: "Cadre rustique",
        price: "79,99 €",
        img: "assets/boutique/cadres/frame6.jpg",
        alt: "Cadre de porte rustique",
        description: "Un cadre robuste en bois massif avec une touche de modernité."
    }
];

var cart = [];

document.addEventListener('DOMContentLoaded', function() {
    loadCart();

    // Génération des poignées
    const handlesContainer = document.querySelector('.door-handles');
    if (handlesContainer) {
        handlesContainer.innerHTML = '';
        doorhandles.forEach(function(handle, idx) {
            const card = document.createElement('div');
            card.className = `product-card category-${handle.category}`;
            card.dataset.category = handle.category;
            card.innerHTML = genererHtml(handle.img, handle.alt, handle.title, handle.price, idx);
            attachAddToCart(card, handle);
            handlesContainer.appendChild(card);
        });
    }

    // Génération des cadres
    const framesContainer = document.querySelector('.door-frames');
    if (framesContainer) {
        framesContainer.innerHTML = '';
        doorframes.forEach(function(frame, idx) {
            const card = document.createElement('div');
            card.className = `product-card category-${frame.category}`;
            card.dataset.category = frame.category;
            card.innerHTML = genererHtml(frame.img, frame.alt, frame.title, frame.price, idx);
            attachAddToCart(card, frame);
            framesContainer.appendChild(card);
        });
    }

    if (window.attachModalListeners) window.attachModalListeners();
});

function genererHtml(img, alt, title, price, idx) {
    return `
                <div class="top-card">
                    <img src="${img}" alt="${alt}" id="frame-img">
                    <button class="learn-more" data-index="${idx}">
                        <span class="material-icons-outlined">info</span>
                    </button>
                </div>
                <div class="bottom-card">
                    <h2>${title}</h2>
                    ${title.length < 18 ? '<br>' : ''}
                    <p class="price">${price}</p>
                    <button class="add-to-cart">Ajouter au panier</button>
                </div>
            `
}

function attachAddToCart(card, product) {
    const addToCartButton = card.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
        const productToAdd = {
            id: product.title.replace(/\s+/g, '-').toLowerCase(),
            title: product.title,
            price: parseFloat(product.price.replace(',', '.').replace(' €', '')),
            img: product.img,
            description: product.description,
            category: product.category,
            quantity: 1
        };
        ajouterAuPanier(productToAdd);
        showPopup();
    });
}

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

function showPopup() {
    const popup = document.querySelector('.popup');
    if (!popup) return;
    popup.style.opacity = 1;
    setTimeout(() => popup.style.opacity = 0, 2000);
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
