const doorContainer = document.getElementById("doorContainer");
const door = document.getElementById("door");
const mainContent = document.getElementById("mainContent");

let isAnimating = false;

function triggerDoorAnimation() { 
  if (isAnimating) {
    return;
  }
  isAnimating = true;

  door.classList.add("open"); // anim d'ouverture

  setTimeout(() => {
    doorContainer.classList.add("zooming"); // zoom après 1s

    setTimeout(() => {
      doorContainer.style.display = 'none';
      mainContent.classList.add("visible");
      document.body.style.overflow = 'auto';
    }, 1200);

  }, 1000);
}

doorContainer.addEventListener("click", triggerDoorAnimation); //automatique

setTimeout(triggerDoorAnimation, 100); //delay
