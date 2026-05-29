## Sunu-idée

Sunu-idée est une application web de type tableau blanc collaboratif permettant aux utilisateurs de partager des idées de manière anonyme.  
Le projet est conçu dans un contexte pédagogique afin de simuler une mini plateforme de gestion d’idées en temps réel.

L’application fonctionne sans authentification et repose entièrement sur la manipulation du DOM et le stockage local via le LocalStorage.

---

## Objectif du projet

L’objectif est de développer une application Single Page Application (SPA) permettant de :

- Créer des idées
- Afficher les idées sous forme de cartes
- Modifier les idées existantes
- Supprimer des idées
- Filtrer les idées par catégorie
- Ajouter des interactions utilisateur (likes)
- Afficher la date de création de manière dynamique

---

## Fonctionnalités principales

### Création d’une idée

Un formulaire permet d’ajouter une nouvelle idée avec :

- Un titre
- Une catégorie (Pédagogie, Vie de campus, Amélioration technique, Événement)
- Une description

Chaque idée est enregistrée dans le LocalStorage.

---

### Affichage des idées

Les idées sont affichées dynamiquement sous forme de cartes.

Chaque carte contient :

- Le titre
- La catégorie
- La description
- Le nombre de likes
- La date de publication

---

### Modification d’une idée

Chaque idée peut être modifiée via un bouton d’édition.

Les champs du formulaire sont pré-remplis afin de faciliter la modification.

---

### Suppression d’une idée

Une idée peut être supprimée définitivement du tableau et du LocalStorage après confirmation de l’utilisateur.

---

### Système de likes

Chaque idée peut être likée ou unlikée.

Le nombre de likes est sauvegardé dans le LocalStorage et mis à jour dynamiquement sans rechargement de la page.

---

### Filtrage par catégorie

Un filtre permet d’afficher uniquement les idées correspondant à une catégorie sélectionnée.

Par défaut, toutes les idées sont affichées.

---

### Affichage des dates

La date de création des idées est affichée sous forme relative :

- À l’instant
- Il y a quelques minutes
- Il y a quelques heures
- Hier
- Jours précédents

---

## Technologies utilisées

- HTML5
- CSS3 / Tailwind CSS
- JavaScript (ES6+)
- LocalStorage
- Manipulation du DOM

---

## Fonctionnement technique

L’application repose sur :

- Un tableau JavaScript central contenant toutes les idées
- Le LocalStorage pour la persistance des données
- Le rendu dynamique du DOM après chaque action (CRUD)
- L’utilisation de la délégation d’événements pour les actions sur les cartes

---

## Installation et utilisation

1. Cloner le projet ou télécharger les fichiers
2. Ouvrir le fichier index.html dans un navigateur
3. Utiliser l’application directement sans configuration supplémentaire

---

## Auteurs

Projet réalisé dans un cadre pédagogique individuel.