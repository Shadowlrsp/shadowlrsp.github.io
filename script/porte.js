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
  /* === 3. BOUTON "RETOURNER EN HAUT DE LA PAGE" === */
  const topBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  /* === MODE SOMBRE / CLAIR === */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  
  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});
  /* === 4. DIAGRAMME CIRCULAIRE : COMPOSITION D’UNE PORTE === */
  const canvas = document.getElementById("compositionChart");
  if (canvas) {
    // Charger Chart.js dynamiquement (si le script n'est pas déjà dans le HTML)
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = () => {
      const ctx = canvas.getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Bois recyclé", "Acier renforcé", "Verre trempé", "Isolant naturel"],
          datasets: [{
            data: [40, 25, 20, 15],
            backgroundColor: [
              "#8B5A2B",  // Bois
              "#708090",  // Acier
              "#3A7CA5",  // Verre
              "#7CB342"   // Isolant
            ],
            borderColor: "#D9DCD6",
            borderWidth: 2
          }]
        },
        options: {
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: "#D9DCD6",
                font: { size: 14 }
              }
            },
            tooltip: {
              backgroundColor: "rgba(22,66,91,0.9)",
              titleFont: { size: 14 },
              bodyFont: { size: 13 },
              cornerRadius: 8
            }
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    };
    document.head.appendChild(script);
  }

