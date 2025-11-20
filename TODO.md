# Liste des Tâches pour Créer un Site E-commerce avec SQLite et Prisma

## Raisonnement Général et Pistes de Réflexion
Avant de commencer, adoptez un raisonnement modulaire et itératif : commencez par les fondations (base de données et authentification), puis les fonctionnalités core (produits, panier), et enfin les intégrations avancées (paiements). Réfléchissez à la scalabilité : utilisez Prisma pour une abstraction propre de la DB, Next.js pour le SSR/SSG, et Tailwind pour un design rapide. Pensez à la sécurité (hashage mots de passe avec bcryptjs, JWT avec jsonwebtoken). Testez chaque étape (API, composants) pour éviter les bugs cumulés. Pistes : priorisez l'UX (loading states, erreurs), la performance (lazy loading images), et la maintenabilité (composants réutilisables).

## 1. Installation des Dépendances Manquantes
   - **Dossier/Fichier** : package.json (mettre à jour), puis exécuter npm install.
   - **Raisonnement** : Prisma est essentiel pour ORM avec SQLite (léger pour dev). @prisma/client pour interagir avec la DB. Piste : Vérifiez les compatibilités (Prisma supporte SQLite nativement).
   - **Fonctions/Exports/Imports/Méthodes à Coder** : Aucune (juste installation). Après, importez PrismaClient dans lib/prisma.js.
   - **Commande** : npm install prisma @prisma/client sqlite3

## 2. Configuration de Prisma
   - **Dossier/Fichier** : prisma/schema.prisma (nouveau fichier).
   - **Raisonnement** : Définissez le schéma DB (modèles User, Product, Order). Piste : Réfléchissez aux relations (User hasMany Orders, Product belongsTo Category).
   - **Fonctions/Exports/Imports/Méthodes** : Exportez le schéma avec generator client et datasource db (SQLite). Méthodes : Définir modèles avec champs (id, name, etc.), relations.

## 3. Initialisation de la Base de Données
   - **Dossier/Fichier** : prisma/migrations/ (généré), lib/prisma.js (nouveau).
   - **Raisonnement** : Créez une instance PrismaClient globale pour éviter les reconnexions. Piste : Utilisez un singleton pour performance.
   - **Fonctions/Exports/Imports/Méthodes** : Dans lib/prisma.js, importez { PrismaClient } from '@prisma/client', exportez une fonction getPrismaClient() qui retourne une instance unique. Méthode : prisma.user.findMany(), etc.

## 4. Authentification avec NextAuth
   - **Dossier/Fichier** : app/api/auth/[...nextauth]/route.js (nouveau), lib/auth.js (nouveau).
   - **Raisonnement** : Intégrez NextAuth pour login/signup sécurisé. Piste : Utilisez providers (credentials), et liez à Prisma pour stockage users.
   - **Fonctions/Exports/Imports/Méthodes** : Dans route.js, importez NextAuth, exportez handler avec options (providers, callbacks). Dans lib/auth.js, importez getServerSession, exportez une fonction getSession(). Méthodes : authorize() pour vérifier credentials, signIn() pour login.

## 5. Modèles de Données et API Produits
   - **Dossier/Fichier** : app/api/products/route.js (nouveau), lib/models/product.js (nouveau).
   - **Raisonnement** : Créez CRUD pour produits. Piste : Validez inputs côté serveur, gérez erreurs (try/catch).
   - **Fonctions/Exports/Imports/Méthodes** : Dans route.js, importez prisma, exportez GET/POST handlers. Méthodes : prisma.product.create(), findMany(). Dans product.js, exportez fonctions comme createProduct(data), getProducts().

## 6. API Utilisateurs
   - **Dossier/Fichier** : app/api/users/route.js, lib/models/user.js.
   - **Raisonnement** : Gestion users (signup, profile). Piste : Hash passwords avec bcryptjs.
   - **Fonctions/Exports/Imports/Méthodes** : Similaire à produits. Méthodes : hashPassword(), verifyPassword(). Exports : createUser(), getUserByEmail().

## 7. API Commandes et Panier
   - **Dossier/Fichier** : app/api/orders/route.js, lib/models/order.js, lib/cart.js.
   - **Raisonnement** : Gérez sessions panier (localStorage côté client). Piste : Calculez totaux côté serveur.
   - **Fonctions/Exports/Imports/Méthodes** : Dans cart.js, exportez addToCart(), removeFromCart(). Méthodes : prisma.order.create() avec items.

## 8. Intégration Stripe pour Paiements
   - **Dossier/Fichier** : app/api/checkout/route.js, lib/stripe.js.
   - **Raisonnement** : Créez sessions Stripe pour checkout. Piste : Gérez webhooks pour confirmer paiements.
   - **Fonctions/Exports/Imports/Méthodes** : Dans stripe.js, importez stripe, exportez createCheckoutSession(). Méthodes : stripe.checkout.sessions.create().

## 9. Composants Frontend (Produits, Panier, Checkout)
   - **Dossier/Fichier** : app/components/ProductList.js, Cart.js, Checkout.js.
   - **Raisonnement** : Utilisez React hooks pour state. Piste : Optimisez avec useMemo pour listes.
   - **Fonctions/Exports/Imports/Méthodes** : Exportez composants. Méthodes : useState pour cart, useEffect pour fetch data.

## 10. Pages et Layout
    - **Dossier/Fichier** : app/products/page.js, cart/page.js, etc.
    - **Raisonnement** : Structurez avec App Router. Piste : Utilisez metadata pour SEO.
    - **Fonctions/Exports/Imports/Méthodes** : Exportez default function Page(). Méthodes : fetch() pour API.

## 11. Tests et Déploiement
    - **Raisonnement** : Testez APIs avec Postman. Piste : Déployez sur Vercel.
    - **Fonctions/Exports/Imports/Méthodes** : Aucune spécifique, mais intégrez tests unitaires.

Suivez cet ordre pour éviter dépendances circulaires. Commencez par 1-3, puis 4-7, etc.
