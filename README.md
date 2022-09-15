# zbo_front_test

- [zbo\_front\_test](#zbo_front_test)
	- [Énoncé](#énoncé)
		- [Les utilisateurs](#les-utilisateurs)
		- [Les briefs](#les-briefs)
		- [Exercice](#exercice)
	- [Informations pratiques pour l'exercice](#informations-pratiques-pour-lexercice)


## Énoncé

Afin de mieux organiser le flux des projets, l'IT ZBO propose aux traders et account managers un outil de gestion de projets sous la forme d'un "board" de briefs (semblable à Trello).

### Les utilisateurs

Les utilisateurs seront ici simplifiés aux champs suivants :

- `id` : généré automatiquement
- `email` : email de l'utilsateur, limité à 25 caractères
- `firstname` : prénom de l 'utilisateur, limité à 255 caractères
- `lastname` : nom de l 'utilisateur, limité à 255 caractères
- `role`: une valeur parmi `'sale','account-manager','trader','client','contact'`

### Les briefs

Le board contient 5 colonnes, chaque colonne regroupe des cartes (briefs) suivant leur statut (valeur API) :

- à attribuer (`to_assign`)
- à paramétrer (`to_setup`)
- live (`production`)
- ending (`ending`)
- bilan à envoyer(`report_to_send`)

Les briefs seront ici simplifiés aux champs suivants :

- `id` : généré automatiquement
- `name` : nom du brief, limité à 255 caractères
- `startDate` et `endDate` : date de début et de fin du brief, au format `2022-05-30T12:16:04.861Z`
- `budget` : le budget du brief, toujours positif
- `amId` et `traderId` : référencent respectivement l'account manager et le trader associés au brief
- `status` : le statut du brief, il doit reprendre une des valeurs API ci-dessus

Le board doit permettre de créer de nouvelles cartes.

Chaque carte contient :

- le titre en gras
- date de début et date de fin avec une barre de progression
- le nom de l'account manager
- le nom du trader média
- un lien d'édition

### Exercice

L'objectif de l'exercice est de créer une application en React / Redux / TypeScript (qui communiquera avec notre API) qui permette à l'équipe de :

- consulter la listes des briefs
- créer, éditer un brief

L'application doit au moins contenir, pour les briefs, les "pages" listées ci-dessous.

Pages obligatoires :

- board
- formulaire de création
- formulaire d'édition

Stack obligatoire :

- React
- Redux
- TypeScript
- Tests unitaires et/ou d'intégration (Jest + React Testing Library)

## Informations pratiques pour l'exercice

Afin de simplifier le code front, une API est fournie avec ce projet.

Pour la lancer il suffit de se placer dans le dossier server.

Les commandes disponibles se trouvent dans le fichier `package.json`. Le serveur pourra notamment être mis en route avec les commandes `npm run build` puis `npm run start`.

Par défaut le port `8081` est utilisé.

Des données sont fournies :

- dossier `data` : les données utilisées par le serveur. Les opérations d'écritures (`POST` et `PUT` écrivent sur disque dans les fichiers de ce dossier). Il est autorisé que ces fichiers soient modifiés par commit.
- dossier `initial_data`: les données initiales. Il est autorisé de reprendre ces fichiers pour le dossier `data`. Il est demandé de ne pas modifier ces fichiers. Ils pourront également être utilisé pour réinitialisé le dossier `data` lors du code review.

URL de l'API : http://localhost:8081. Dans la définition des routes ci-dessous, `{API_URL}` représentera cette valeur.

Des contraintes de validation sont présentes sur les entités, en cas de non respect de celles-ci l'API retourne une erreur.

Par ailleurs, chaque appel peut retourner aléatoirement (1 fois sur 10) une erreur.Le comportement peut être change en modifiant le fichier `server/src/utils/utils.ts`. L'erreur est de la forme :

```json
{
    "timestamp": "1655916571811",
    "status": 500,
    "code": "500-unexpected_error",
    "detail": "unexpected_error",
    "path": "/users",
    "method": "GET"
}
```

<details>
  <summary>Briefs (dump)</summary>

```curl
curl -X GET \
  {API_URL}/entity/briefs \
  -H 'Content-Type: application/json' \
```

```json
[
	{
		"id": 1,
		"name": "NUTRAPIE - vague 3",
		"startDate": "2022-05-30T12:16:04.861354+02:00",
		"endDate": "2022-06-13T12:16:04.861354+02:00",
		"budget": 894.36,
		"amId": null,
		"traderId": null,
		"status": "ending"
	},
	{
		"id": 2,
		"name": "Anti-Slip Treatment - vague 3",
		"startDate": "2022-05-26T12:16:04.861358+02:00",
		"endDate": "2022-06-30T12:16:04.861358+02:00",
		"budget": 311.52,
		"amId": 1,
		"traderId": 10,
		"status": "ending"
	},
	...
]
```

</details>

<details>
  <summary>Briefs (get by id)</summary>

```curl
curl -X GET \
  {API_URL}/entity/briefs/4 \
  -H 'Content-Type: application/json' \
```

```json
{
	"id": 4,
	"name": "IMPERA - vague 3",
	"startDate": "2022-05-25T12:06:19.308635+02:00",
	"endDate": "2022-06-18T12:06:19.308635+02:00",
	"budget": 954.95,
	"amId": null,
	"traderId": 19,
	"status": "ending"
}
```

</details>

<details>
  <summary>Briefs (post)</summary>

```curl
curl -X POST \
  {API_URL}/entity/briefs \
  -H 'Content-Type: application/json' \
  --data-binary @- << EOF
{
	"name": "IMPERA - vague 4",
	"startDate": "2022-05-25T12:06:19.308635+02:00",
	"endDate": "2022-06-18T12:06:19.308635+02:00",
	"budget": 954.95,
	"amId": null,
	"traderId": 19,
	"status": "ending"
}
EOF
```

```json
{
	"id": 51,
	"name": "IMPERA - vague 4",
	"startDate": "2022-05-25T12:06:19.308635+02:00",
	"endDate": "2022-06-18T12:06:19.308635+02:00",
	"budget": 954.95,
	"amId": null,
	"traderId": 19,
	"status": "ending"
}
```

</details>

<details>
  <summary>Briefs (put)</summary>

```curl
curl -X PUT \
  {API_URL}/entity/briefs/51 \
  -H 'Content-Type: application/json' \
  --data-binary @- << EOF
{
	"id": 51,
	"name": "IMPERA - vague 5",
	"startDate": "2022-05-25T12:06:19.308635+02:00",
	"endDate": "2022-06-18T12:06:19.308635+02:00",
	"budget": 954.95,
	"amId": null,
	"traderId": 19,
	"status": "to_setup"
}
EOF
```

```json
{
	"id": 51,
	"name": "IMPERA - vague 5",
	"startDate": "2022-05-25T12:06:19.308635+02:00",
	"endDate": "2022-06-18T12:06:19.308635+02:00",
	"budget": 954.95,
	"amId": null,
	"traderId": 19,
	"status": "to_setup"
}
```

</details>

<details>
  <summary>Users (dump)</summary>

```curl
curl -X GET \
  {API_URL}/entity/users \
  -H 'Content-Type: application/json' \
```

```json
[
	{
		"id": 1,
		"email": "sophie_ramos@mail.com",
		"role": "trader",
		"firstname": "Sophie",
		"lastname": "Ramos"
	},
	{
		"id": 2,
		"email": "remy_dijoux@mail.com",
		"role": "contact",
		"firstname": "Rémy",
		"lastname": "Dijoux"
	},
	...
]
```

</details>

<details>
  <summary>Users (get by id)</summary>

```curl
curl -X GET \
  {API_URL}/entity/users/1 \
  -H 'Content-Type: application/json' \
```

```json
{
  "id": 1,
  "email": "sophie_ramos@mail.com",
  "role": "trader",
  "firstname": "Sophie",
  "lastname": "Ramos"
}
```

</details>

<details>
  <summary>Users (post)</summary>

```curl
curl -X POST \
  {API_URL}/entity/users \
  -H 'Content-Type: application/json' \
  --data-binary @- << EOF
{
	"email": "marc_ramos@mail.com",
	"role": "trader",
	"firstname": "Marc",
	"lastname": "Ramos"
}
EOF
```

```json
{
	"id": 21,
	"email": "marc_ramos@mail.com",
	"role": "trader",
	"firstname": "Marc",
	"lastname": "Ramos"
}
```

</details>

<details>
  <summary>Users (put)</summary>

```curl
curl -X PUT \
  {API_URL}/entity/users/21 \
  -H 'Content-Type: application/json' \
  --data-binary @- << EOF
{
	"id": 21,
	"email": "marc_ramos@mail.com",
	"role": "trader",
	"firstname": "Marco",
	"lastname": "Ramos"
}
EOF
```

```json
{
	"id": 21,
	"email": "marc_ramos@mail.com",
	"role": "trader",
	"firstname": "Marco",
	"lastname": "Ramos"
}
```

</details>
