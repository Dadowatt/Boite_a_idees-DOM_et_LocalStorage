
const STORAGE_KEY = "sunu_idees";

const formIdees = document.getElementById("form-idee");
const murDesIdees = document.getElementById("mur-idees");

const titreInput = document.getElementById("titre");
const categorieInput = document.getElementById("categorie");
const descriptionInput = document.getElementById("description");


let listeDesIdees = chargerLesIdees();
let modeEdition = false;
let idEnCoursEdition = null;

// LOCALSTORAGE
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

// COULEURS CATEGORIE
function couleurCategorie(categorie) {

    const couleurs = {
        pedagogie: "bg-blue-100 text-blue-700",
        campus: "bg-green-100 text-green-700",
        technique: "bg-purple-100 text-purple-700",
        evenement: "bg-pink-100 text-pink-700"
    };

    return couleurs[categorie] || "bg-slate-100 text-slate-700";
}

// AFFICHAGE MUR
function afficherLeMur() {
    murDesIdees.innerHTML = "";
    if (listeDesIdees.length === 0) {

        murDesIdees.innerHTML = `
            <div class="col-span-full bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center">
                <p class="text-slate-400 text-sm">
                    Aucune idée publiée pour le moment.
                </p>
            </div>
        `;
        return;
    }

    listeDesIdees.forEach((idee) => {

        const carteHTML = `

            <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between min-h-[200px]" data-id="${idee.id}">

                <div>

                    <div class="flex justify-between items-center mb-3">

                        <span class="${couleurCategorie(idee.categorie)} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            ${idee.categorie}
                        </span>

                        <span class="text-[10px] text-slate-400">
                            Enregistré
                        </span>

                    </div>

                    <h3 class="font-bold text-slate-900 text-base mb-2">
                        ${idee.titre}
                    </h3>

                    <p class="text-slate-500 text-xs leading-relaxed">
                        ${idee.description}
                    </p>

                </div>

                <div class="flex justify-between items-center mt-6 pt-3 border-t border-slate-50 text-[11px] text-slate-400">

                    <div class="flex gap-3">

                        <button class="btn-editer hover:text-slate-700 flex items-center gap-1 cursor-pointer">
                            <i class="fa-solid fa-pencil"></i>
                            Éditer
                        </button>

                    </div>

                    <span class="flex items-center gap-1 font-medium text-slate-600">
                        <i class="fa-solid fa-thumbs-up"></i> 0
                    </span>

                </div>

            </div>

        `;

        murDesIdees.insertAdjacentHTML("beforeend", carteHTML);
    });
}

// CREATE + UPDATE
formIdees.addEventListener("submit", (e) => {
    e.preventDefault();

    const titre = titreInput.value.trim();
    const categorie = categorieInput.value;
    const description = descriptionInput.value.trim();

    if (!titre || !description) return;

    // CREATE
    if (!modeEdition) {

        const nouvelleIdee = {
            id: Date.now(),
            titre,
            categorie,
            description
        };

        listeDesIdees.unshift(nouvelleIdee);
    }

    // UPDATE
    else {

        const idee = listeDesIdees.find(i => i.id === idEnCoursEdition);

        if (!idee) return;

        idee.titre = titre;
        idee.categorie = categorie;
        idee.description = description;

        modeEdition = false;
        idEnCoursEdition = null;

        formIdees.querySelector("button[type='submit']").innerText =
            "Soumettre l'idée";
    }

    sauvegarderLesIdees(listeDesIdees);
    afficherLeMur();

    formIdees.reset();
});


// EDIT MODE
murDesIdees.addEventListener("click", (e) => {

    const btnEditer = e.target.closest(".btn-editer");

    if (!btnEditer) return;

    const carte = e.target.closest("[data-id]");
    const id = Number(carte.dataset.id);

    chargerFormulaireEdition(id);
});


function chargerFormulaireEdition(id) {

    const idee = listeDesIdees.find(i => i.id === id);

    if (!idee) return;

    modeEdition = true;
    idEnCoursEdition = id;

    titreInput.value = idee.titre;
    categorieInput.value = idee.categorie;
    descriptionInput.value = idee.description;

    formIdees.querySelector("button[type='submit']").innerText =
        "Mettre à jour ✏️";
}

afficherLeMur();