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
        const card = document.createElement("div");
        card.className = "exercice-card";

        const title = document.createElement("h2");
        title.textContent = exo.title;

        const list = document.createElement("ul");
        exo.consigne.split("\n").forEach((line) => {
            if (line.trim()) {
                const item = document.createElement("li");
                item.textContent = line.replace(/^- /, "").trim();
                list.appendChild(item);
            }
        });

        card.appendChild(title);
        card.appendChild(list);

        if (exo.correctionDisponible && exo.correction) {
            const btn = document.createElement("button");
            btn.textContent = "Voir la correction";

            const codeBlock = document.createElement("code");
            codeBlock.style.display = "none";
            codeBlock.textContent = exo.correction;

            btn.addEventListener("click", () => {
                codeBlock.style.display = codeBlock.style.display === "none" ? "block" : "none";
                btn.textContent = codeBlock.style.display === "block" ? "Masquer la correction" : "Voir la correction";
            });

            card.appendChild(btn);
            card.appendChild(codeBlock);
        }

        container.appendChild(card);
    });
}

// Gestion des filtres
const filterButtons = document.querySelectorAll("#filters button");

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        // Activer bouton cliqué, désactiver les autres
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const tag = btn.getAttribute("data-tag");
        const filtered = allExercices.filter((exo) => exo.tags.includes(tag));
        displayExercices(filtered);
    });
});
