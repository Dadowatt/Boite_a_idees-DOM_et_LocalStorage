const STORAGE_KEY = 'sunu_idees';

const formIdees = document.getElementById("form-idee");
const murDesIdees = document.getElementById("mur-idees");

const titreInput = document.getElementById('titre');
const categorieInput = document.getElementById('categorie');
const descriptionInput = document.getElementById('description');

function chargerLesIdees(){
    try{
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }catch{
        return [];
    }
}

function sauvegarderLesIdees(idees){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(idees));
}

let listeDesIdees = chargerLesIdees();

function ajouterIdee(idee){
    listeDesIdees.unshift(idee);
    sauvegarderLesIdees(listeDesIdees);
}

formIdees.addEventListener('submit', (e) => {
    e.preventDefault();
    const titre = titreInput.value.trim();
    const categorie = categorieInput.value;
    const description = descriptionInput.value.trim();

    if (!titre || !description) {
        return;
    }

    const nouvelleIdee = {
        id: Date.now(),
        titre: titre,
        categorie: categorie,
        description: description
    }
    ajouterIdee(nouvelleIdee);
    formIdees.reset();
});