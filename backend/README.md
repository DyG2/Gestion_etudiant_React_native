# Etu-tsika — API backend

API REST Node.js / Express / PostgreSQL pour l'application mobile de gestion des étudiants.

## Installation

```bash
npm install
```

## Configuration

Copier `.env.example` en `.env` puis adapter les valeurs :

| Variable         | Description                          | Exemple                                                             |
| ---------------- | ------------------------------------ | ------------------------------------------------------------------- |
| `DATABASE_URL`   | Chaîne de connexion PostgreSQL       | `postgresql://etu_tsika:etu_tsika@localhost:5432/gestion_etudiants` |
| `JWT_SECRET`     | Clé de signature des tokens JWT      | `etu_tsika_secret`                                                  |
| `JWT_EXPIRES_IN` | Durée de validité des tokens         | `1d`                                                                |
| `PORT`           | Port d'écoute (3000 par défaut)      | `3000`                                                              |

## Base de données

```bash
npm run migrate   # applique les migrations de db/migrations non encore exécutées
npm run seed      # insère les données de test (db/seeds)
```

Compte de test : `admin@etu.mg` / `admin123`.

## Lancement

```bash
npm run dev       # développement (nodemon)
npm start         # production
```

## Endpoints

Les routes marquées 🔒 exigent le header `Authorization: Bearer <token>`.

| Méthode | Route               | Description                         | Succès |
| ------- | ------------------- | ----------------------------------- | ------ |
| POST    | `/api/auth/login`   | Connexion → `{ token, user }`       | 200    |
| GET     | `/api/auth/me`      | 🔒 Utilisateur connecté             | 200    |
| GET     | `/api/students`     | 🔒 Liste des étudiants              | 200    |
| GET     | `/api/students/:id` | 🔒 Détail d'un étudiant             | 200    |
| POST    | `/api/students`     | 🔒 Création (`nom`, `prenom`, `email`, `filiere`) | 201    |
| DELETE  | `/api/students/:id` | 🔒 Suppression                      | 204    |

Les erreurs sont renvoyées sous la forme `{ "message": "..." }` (400, 401, 404, 409, 500).
