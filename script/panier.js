document.addEventListener('DOMContentLoaded', () => {
const toutLesConteur = document.querySelectorAll('.quantity');
    toutLesConteur.forEach(counter => {
        const increaseButton = counter.querySelector('.increase');
        const decreaseButton = counter.querySelector('.decrease');
        const quantitySpan = counter.querySelector('.qty');
        
        
        increaseButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantitySpan.textContent);
            currentQuantity++;
            quantitySpan.textContent = currentQuantity;
        });

        decreaseButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantitySpan.textContent);
            if (currentQuantity > 1) {
                currentQuantity--;
                quantitySpan.textContent = currentQuantity;
            }
        });
    });



});