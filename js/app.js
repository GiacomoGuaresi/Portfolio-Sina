// js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  // Funzione per caricare i frammenti HTML
  async function loadPage(page, pushHash = true) {
    content.style.opacity = 0;
    try {
      const res = await fetch(`./pages/${page}`);
      if (!res.ok) throw new Error("Errore nel caricamento della pagina.");
      const html = await res.text();

      setTimeout(() => {
        content.innerHTML = html;
        content.style.opacity = 1;
      }, 200);

      // aggiorna hash nell'URL (solo se richiesto)
      if (pushHash) {
        const hashName = page.replace(".html", "");
        window.location.hash = hashName;
      }

    } catch (err) {
      content.innerHTML = `<p class="text-red-500">Errore: impossibile caricare ${page}</p>`;
      console.error(err);
      content.style.opacity = 1;
    }
  }

  // Gestisci click sui bottoni
  document.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.getAttribute("data-page");
      loadPage(page);
    });
  });

  // Funzione per determinare quale pagina caricare all'avvio
  function initPage() {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      loadPage(`${hash}.html`, false);
    } else {
      // pagina di default
      loadPage("projects.html", false);
    }
  }

  // Gestisce il cambio hash (es: click back/forward nel browser)
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "");
    if (hash) loadPage(`${hash}.html`, false);
  });

  // Carica la pagina iniziale
  initPage();
});
