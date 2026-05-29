const STORAGE_KEY = "sunu_idees";

const formIdees = document.getElementById("form-idee");
const murDesIdees = document.getElementById("mur-idees");

const titreInput = document.getElementById("titre");
const categorieInput = document.getElementById("categorie");
const descriptionInput = document.getElementById("description");

const filtreCategorie = document.getElementById("filtre-categorie");

// ETAT GLOBAL
let listeDesIdees = chargerLesIdees();
let modeEdition = false;
let idEnCoursEdition = null;
let categorieActive = "toutes";

// LOCAL STORAGE
function chargerLesIdees() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function sauvegarderLesIdees(idees) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(idees));
}

// COULEURS CATEGORIES
function couleurCategorie(categorie) {
  const couleurs = {
    pedagogie: "bg-blue-100 text-blue-700",
    campus: "bg-green-100 text-green-700",
    technique: "bg-purple-100 text-purple-700",
    evenement: "bg-pink-100 text-pink-700",
  };

  return couleurs[categorie] || "bg-slate-100 text-slate-700";
}

// DATE CREATION
function formaterDate(date) {
    const maintenant = new Date();
    const dateIdee = new Date(date);

    const difference = maintenant - dateIdee;

    const secondes = Math.floor(difference / 1000);
    const minutes = Math.floor(secondes / 60);
    const heures = Math.floor(minutes / 60);
    const jours = Math.floor(heures / 24);

    if (secondes < 60) {
        return "À l'instant";
    }

    if (minutes < 60) {
        return `${minutes} min`;
    }

    if (heures < 24) {
        return `${heures} h`;
    }

    if (jours < 7) {
        return `${jours} j`;
    }

    return dateIdee.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
    });
}

// AFFICHAGE D'ERREUR
function afficherErreur(message) {
    const erreur = document.getElementById("message-erreur");
    erreur.textContent = message;
    erreur.classList.remove("hidden");
}

// CACHER L'ERREUR
function cacherErreur() {
    const erreur = document.getElementById("message-erreur");
    erreur.textContent = "";
    erreur.classList.add("hidden");
}

// SECURISATION TEXTE
function sanitizer(texte) {
    return texte
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// AFFICHAGE DU MUR
function afficherLeMur() {
    murDesIdees.innerHTML = "";

    const ideesFiltrees =
        categorieActive === "toutes"
            ? listeDesIdees
            : listeDesIdees.filter(
                (idee) => idee.categorie === categorieActive
        );

    // ETAT VIDE
    if (ideesFiltrees.length === 0) {
        murDesIdees.innerHTML = `
                <div class="col-span-full bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center">
                    <p class="text-slate-400 text-sm">
                        Aucune idée publiée pour le moment.
                    </p>
                </div>
            `;

        return;
  }

  // AFFICHAGE DES CARTES
  ideesFiltrees.forEach((idee) => {
    const carteHTML = `
            <div 
                class="card-animation bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between min-h-[200px]"
                data-id="${idee.id}">
                <div>
                    <div class="flex justify-between items-center mb-3">

                        <span class="${couleurCategorie(idee.categorie)} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            ${idee.categorie}
                        </span>
                        <span class="text-[10px] text-slate-400">
                            ${formaterDate(idee.date)}
                        </span>
                    </div>
                    <h3 class="font-bold text-slate-900 text-base mb-2">
                        ${sanitizer(idee.titre)}
                    </h3>
                    <p class="text-slate-500 text-xs leading-relaxed">
                        ${sanitizer(idee.description)}
                    </p>
                </div>
                <div class="flex justify-between items-center mt-6 pt-3 border-t border-slate-50 text-[11px] text-slate-400">
                    <div class="flex gap-3">
                        <button class="btn-editer text-yellow-600 hover:text-yellow-700 transition flex items-center gap-1 cursor-pointer">
                            <i class="fa-solid fa-pencil"></i>
                            Éditer
                        </button>
                        <button class="btn-supprimer text-red-600 hover:text-red-700 transition flex items-center gap-1 cursor-pointer">
                            <i class="fa-solid fa-trash-can"></i>
                            Supprimer
                        </button>
                    </div>
                    <button class="btn-like flex items-center gap-1 font-medium transition cursor-pointer
                        ${idee.liked ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}">
                        <i class="fa-solid fa-thumbs-up"></i>${idee.likes}
                    </button>
                </div>
            </div>
        `;

    murDesIdees.insertAdjacentHTML("beforeend", carteHTML);
  });
}

// FLITRAGE PAR CATEGORIE
filtreCategorie.addEventListener("change", () => {
    categorieActive = filtreCategorie.value;
    afficherLeMur();
});

// CREATE + UPDATE
formIdees.addEventListener("submit", (e) => {
    e.preventDefault();

    const titre = titreInput.value.trim();
    const categorie = categorieInput.value;
    const description = descriptionInput.value.trim();
    if (!titre || !description) {
        afficherErreur("Le titre et la description sont obligatoires.");
        return;
    }
    
    cacherErreur();

    // CREATE
    if (!modeEdition) {
        const nouvelleIdee = {
        id: Date.now(),
        titre,
        categorie,
        description,
        likes: 0,
        liked: false,
        date: new Date().toISOString(),
        };

    listeDesIdees.unshift(nouvelleIdee);
    }

  // UPDATE
    else {
        const idee = listeDesIdees.find((i) => i.id === idEnCoursEdition);

        if (!idee) return;

        idee.titre = titre;
        idee.categorie = categorie;
        idee.description = description;

        // RESET MODE EDITION
        modeEdition = false;
        idEnCoursEdition = null;

        formIdees.querySelector("button[type='submit']").innerText =
        "Soumettre l'idée";
    }
    // SAUVEGARDE
    sauvegarderLesIdees(listeDesIdees);
    afficherLeMur();
    formIdees.reset();
});

// EVENT DELEGATION, EDIT + DELETE
murDesIdees.addEventListener("click", (e) => {
    // LIKE
    const btnLike = e.target.closest(".btn-like");
    if (btnLike) {
        const carte = btnLike.closest("[data-id]");
        if (!carte) return;
        const id = Number(carte.dataset.id);
        likerIdee(id);
        return;
    }
    // DELETE
    const btnSupprimer = e.target.closest(".btn-supprimer");

    if (btnSupprimer) {
        const carte = btnSupprimer.closest("[data-id]");
        if (!carte) return;

        const id = Number(carte.dataset.id);
        supprimerIdee(id);
        return;
    }

    // EDIT
    const btnEditer = e.target.closest(".btn-editer");
    if (btnEditer) {
        const carte = btnEditer.closest("[data-id]");
        if (!carte) return;

        const id = Number(carte.dataset.id);
        chargerFormulaireEdition(id);
        return;
    }
});

// CHARGER DANS FORMULAIRE
function chargerFormulaireEdition(id) {
  const idee = listeDesIdees.find((i) => i.id === id);

  if (!idee) return;

  modeEdition = true;
  idEnCoursEdition = id;

  titreInput.value = idee.titre;
  categorieInput.value = idee.categorie;
  descriptionInput.value = idee.description;

  formIdees.querySelector("button[type='submit']").innerText =
    "Mettre à jour";
}

// LIKER IDEE
function likerIdee(id) {
    const idee = listeDesIdees.find((i) => i.id === id);

    if (!idee) return;
    if (!idee.liked) {
        idee.likes++;
        idee.liked = true;
    } else {
        idee.likes--;
        idee.liked = false;
    }

    sauvegarderLesIdees(listeDesIdees);
    afficherLeMur();
}

// DELETE
function supprimerIdee(id) {
  const confirmation = confirm("Voulez-vous vraiment supprimer cette idée ?");

  if (!confirmation) return;
  listeDesIdees = listeDesIdees.filter((idee) => idee.id !== id);

  sauvegarderLesIdees(listeDesIdees);
  afficherLeMur();
}

afficherLeMur();
