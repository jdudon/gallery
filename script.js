// fetch("exercices.json")
//   .then((response) => response.json())
//   .then((data) => {
//     allExercices = data;
//     displayExercices(data);
//   });

// function displayExercices(data) {
//   const container = document.getElementById("exercices-container");
//   container.innerHTML = "";

//   data.forEach((exo) => {
//     const card = document.createElement("details");
//     card.className = "exercice-card";

//     const title = document.createElement("summary");
//     title.textContent = exo.title;

//     const list = document.createElement("ul");
//     exo.consigne.split("\n").forEach((line) => {
//       if (line.trim()) {
//         const item = document.createElement("li");
//         item.textContent = line.replace(/^- /, "").trim();
//         list.appendChild(item);
//       }
//     });

//     card.appendChild(title);
//     card.appendChild(list);

//     if (exo.correctionDisponible && exo.correction) {
//       const btn = document.createElement("button");
//       btn.textContent = "Voir la correction";

//       const codeBlock = document.createElement("div");
//       codeBlock.style.display = "none";
//       codeBlock.innerHTML = afficherCorrectionStructurée(exo.correction);

//       btn.addEventListener("click", () => {
//         const isHidden = codeBlock.style.display === "none";
//         codeBlock.style.display = isHidden ? "block" : "none";
//         btn.textContent = isHidden ? "Masquer la correction" : "Voir la correction";
//       });

//       card.appendChild(btn);
//       card.appendChild(codeBlock);
//     }

//     container.appendChild(card);
//   });
// }

// // Fonction d'échappement pour sécuriser le code affiché
// function escapeHTML(str) {
//   return str
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;");
// }

// // Fonction pour structurer la correction par langage
// function afficherCorrectionStructurée(correction) {
//   const blocs = [];

//   // HTML
//   const htmlMatch = correction.match(/<html[\s\S]*?<\/html>/i);
//   if (htmlMatch) {
//     blocs.push({
//       label: "index.html",
//       icon: "📄",
//       code: htmlMatch[0]
//     });
//   }

//   // CSS
//   const cssMatch = correction.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
//   if (cssMatch) {
//     blocs.push({
//       label: "style.css",
//       icon: "🎨",
//       code: cssMatch[1].trim()
//     });
//   }

//   // JS
//   const jsMatches = correction.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
//   if (jsMatches) {
//     const fullJS = jsMatches
//       .map(m => m.replace(/<script[^>]*>|<\/script>/gi, "").trim())
//       .join("\n\n");
//     blocs.push({
//       label: "script.js",
//       icon: "💻",
//       code: fullJS
//     });
//   }

//   // Si aucun match (fallback)
//   if (blocs.length === 0) {
//     return `<pre><code>${escapeHTML(correction)}</code></pre>`;
//   }

//   // Génération des blocs avec titres
//   return blocs
//     .map(({ label, icon, code }) => {
//       return `
//         <div style="margin-bottom: 1.5rem;">
//           <h4 style="margin-bottom: 0.5rem;">${icon} ${label}</h4>
//           <pre><code>${escapeHTML(code)}</code></pre>
//         </div>
//       `;
//     })
//     .join("");
// }

// // Filtres par tag
// const filterButtons = document.querySelectorAll("#filters button");

// filterButtons.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     filterButtons.forEach((b) => b.classList.remove("active"));
//     btn.classList.add("active");

//     const tag = btn.getAttribute("data-tag");
//     const filtered = allExercices.filter((exo) => exo.tags.includes(tag));
//     displayExercices(filtered);
//   });
// });
fetch("exercices.json")
  .then((response) => response.json())
  .then((data) => {
    allExercices = data;
    displayExercices(data);
  });

function displayExercices(data) {
  const container = document.getElementById("exercices-container");
  container.innerHTML = "";

  data.forEach((exo) => {
    const card = document.createElement("details");
    card.className = "exercice-card";

    const summary = document.createElement("summary");

    // ➕ Icône dynamique
    const icon = document.createElement("span");
    icon.className = "toggle-icon";

    // Texte du titre
    const titleText = document.createTextNode(exo.title);

    summary.appendChild(icon);
    summary.appendChild(titleText);
    card.appendChild(summary);

    // Liste des consignes
    const list = document.createElement("ul");
    exo.consigne.split("\n").forEach((line) => {
      if (line.trim()) {
        const item = document.createElement("li");
        item.textContent = line.replace(/^- /, "").trim();
        list.appendChild(item);
      }
    });
    card.appendChild(list);

    // Correction
    if (exo.correctionDisponible && exo.correction) {
      const btn = document.createElement("button");
      btn.textContent = "Voir la correction";

      const codeBlock = document.createElement("div");
      codeBlock.style.display = "none";
      codeBlock.innerHTML = afficherCorrectionStructurée(exo.correction);

      btn.addEventListener("click", () => {
        const isHidden = codeBlock.style.display === "none";
        codeBlock.style.display = isHidden ? "block" : "none";
        btn.textContent = isHidden ? "Masquer la correction" : "Voir la correction";
      });

      card.appendChild(btn);
      card.appendChild(codeBlock);
    }

    container.appendChild(card);
  });
}

// Fonction d'échappement pour sécuriser le code affiché
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Fonction pour structurer la correction par langage
function afficherCorrectionStructurée(correction) {
  const blocs = [];

  const htmlMatch = correction.match(/<html[\s\S]*?<\/html>/i);
  if (htmlMatch) {
    blocs.push({
      label: "index.html",
      icon: "📄",
      code: htmlMatch[0]
    });
  }

  const cssMatch = correction.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (cssMatch) {
    blocs.push({
      label: "style.css",
      icon: "🎨",
      code: cssMatch[1].trim()
    });
  }

  const jsMatches = correction.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
  if (jsMatches) {
    const fullJS = jsMatches
      .map(m => m.replace(/<script[^>]*>|<\/script>/gi, "").trim())
      .join("\n\n");
    blocs.push({
      label: "script.js",
      icon: "💻",
      code: fullJS
    });
  }

  if (blocs.length === 0) {
    return `<pre><code>${escapeHTML(correction)}</code></pre>`;
  }

  return blocs
    .map(({ label, icon, code }) => {
      return `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="margin-bottom: 0.5rem;">${icon} ${label}</h4>
          <pre><code>${escapeHTML(code)}</code></pre>
        </div>
      `;
    })
    .join("");
}

// Filtres par tag
const filterButtons = document.querySelectorAll("#filters button");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const tag = btn.getAttribute("data-tag");
    const filtered = allExercices.filter((exo) => exo.tags.includes(tag));
    displayExercices(filtered);
  });
});
