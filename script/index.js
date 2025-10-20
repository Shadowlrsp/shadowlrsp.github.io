const doorContainer = document.getElementById("doorContainer");
const door = document.getElementById("door");
const mainContent = document.getElementById("mainContent");

let isAnimating = false;

doorContainer.addEventListener("click", () => {
  if (isAnimating) {
    return;
  }
  isAnimating = true;

  door.classList.add("open"); // anim d'ouverture

  setTimeout(() => {
    doorContainer.classList.add("zooming"); // zoom après 1.5s

    setTimeout(() => {
      doorContainer.style.display = 'none';
      mainContent.classList.add("visible");
      document.body.style.overflow = 'auto';
      
    }, 1200);

  }, 1000);
});