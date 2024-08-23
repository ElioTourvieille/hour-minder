# HourMinder

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

HourMinder est une application web moderne construite avec [Next.js](https://nextjs.org/), [Convex](https://docs.convex.dev/), et [Tailwind](https://tailwindcss.com/). Elle permet aux utilisateurs de gérer et enregistrer leurs heures de travail et de rechercher leurs documents et notes personnels de manière efficace. L'application offre une interface utilisateur réactive et des fonctionnalités de gestion des documents et des notes.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Scripts Disponibles](#scripts-disponibles)

## Fonctionnalités

- **Gestion des heures de travail** : Ajout, édition, et calcul de la durée de travail.
- **Gestion des documents** : Ajout, édition, et suppression de documents personnels.
- **Gestion des notes** : Ajout, édition, et suppression de notes personnelles.
- **Recherche simple** : Recherche textuelle dans les documents et notes.
- **Authentification** : Connexion des utilisateurs via un système d'identité sécurisé.
- **Interface utilisateur réactive** : Adaptation de l'interface pour mobile et desktop.

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) v14 ou supérieur
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Convex CLI](https://docs.convex.dev/quickstart/)

### Étapes

1. Clonez ce dépôt :

    ```bash
    git clone https://github.com/ElioTourvieille/hour-minder.git
    cd HourMinder
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

    ou

    ```bash
    yarn install
    ```

3. Configurez Convex :

    - Installez le CLI Convex si ce n'est pas déjà fait :

      ```bash
      cd my-app && npm install convex
      ```

    - Initialisez le projet Convex :

      ```bash
      npx convex dev
      ```

4. Configurez les variables d'environnement en créant un fichier `.env.local` à la racine du projet et en y ajoutant vos variables d'environnement :

    ```bash
    NEXT_PUBLIC_CONVEX_URL=https://<your-convex-deployment>.convex.cloud
    CONVEX_DEPLOYMENT=dev:<your-convex-deployment>
    ```

5. Démarrez le serveur de développement :

    ```bash
    npm run dev
    ```

    ou

    ```bash
    yarn dev
    ```

6. Accédez à l'application dans votre navigateur à l'adresse `http://localhost:3000`.

## Configuration

### Variables d'environnement

- `NEXT_PUBLIC_CONVEX_URL`: L'URL de votre instance Convex.
- `CONVEX_DEPLOYMENT`: L'accès à votre dashboard Convex.


## Utilisation

Une fois le serveur démarré, vous pouvez :

- Ajouter et comptabiliser des heures de travail.
- Ajouter des documents et des notes via l'interface utilisateur.
- Rechercher des éléments via la barre de recherche.
- Accéder à vos documents et notes en vous connectant avec vos identifiants.

## Scripts Disponibles

Voici les principaux scripts disponibles dans ce projet :

- `npm run dev` : Démarre l'application en mode développement.
- `npm run build` : Compile l'application pour la production.
- `npm run start` : Démarre le serveur en mode production.
- `npm run lint` : Vérifie le code avec ESLint.
