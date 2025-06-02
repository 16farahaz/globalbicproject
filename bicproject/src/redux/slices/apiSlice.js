// Importation des modules nécessaires depuis Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Définition de l'URL de base de l'API backend
// Ancienne version en dur : const API_URL = 'http://localhost:8800/api';
// Nouvelle version avec variable d'environnement pour plus de flexibilité
const API_URL = import.meta.env.VITE_APP_BASE_URL;


// Création de la requête de base (baseQuery) qui sera utilisée pour récupérer les données depuis le backend
// Elle définit l'URL de base pour toutes les requêtes de l'API
// const API_URL = 'http://localhost:8800/api';
const baseQuery = fetchBaseQuery({ baseUrl: API_URL + "/api" });

// Définition du slice de l'API (`apiSlice`)
// Ce slice est utilisé pour définir les endpoints qui permettront de communiquer avec le backend
export const apiSlice = createApi({
    baseQuery,   // Utilisation de la requête de base définie ci-dessus
    tagTypes: [], // Tableau utilisé pour la gestion du cache et des données mises à jour (actuellement vide)
    endpoints: (builder) => ({}) // Les endpoints seront ajoutés plus tard via `injectEndpoints`
});
