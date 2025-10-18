/* ======================================
   PorteShop - Script d’animations globales
   ====================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* === 1. PARALLAXE SUR LES TITRES === */
  const titles = document.querySelectorAll("h1, h2");
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    titles.forEach((title, i) => {
      const depth = (i + 1) / titles.length;
      title.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

  /* === 2. FADE-IN AU SCROLL === */
  const fadeElements = document.querySelectorAll(
    ".apropos-intro, .intro, .valeurs, .histoire, .contact-form"
  );

  // Ajouter la classe fade-in à chaque élément
  fadeElements.forEach((el) => el.classList.add("fade-in"));

  // Utilisation de l’API IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => observer.observe(el));
});
