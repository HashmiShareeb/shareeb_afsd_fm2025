# pwa - Nexus FM

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# How to Run this Project

clone project

make firebase project and apply the config

# AFSD - Frontend

```bash
VITE_FIREBASE_apiKey=your_api_key
VITE_FIREBASE_authDomain=your_auth_domain
VITE_FIREBASE_projectId=your_project_id
VITE_FIREBASE_storageBucket=your_storage_bucket
VITE_FIREBASE_messagingSenderId=your_messaging_sender_id
VITE_FIREBASE_appId=your_app_id
VITE_BACKEND_URL=your_backend_url
```

# API - Backend

```bash
GOOGLE_APPLICATION_CREDENTIALS= path to the firebase service account key
URL_FRONTEND=localhost:5173
DB_HOST=localhost
DB_PORT=external port
DB_NAME=api


```

# Seeding

```bash
cd packages/api

#etc
npx nestjs-command seed:database:travelers
npx nestjs-command seed:database:trips
npx nestjs-command seed:database:bookings


```

Or reset all the data at the same time

```bash

npx nestjs-command seed:reset

```

## Side note

Seeding may not work (or be completed yet), if not consult the Graphql Playground docs of this project.

Also you can see the queries and mutations of this project in the `PWA` in `/graphql` folder.
