// Importation de `apiSlice` qui contient la configuration de base de l'API

import { apiSlice } from "../apiSlice";

// Définition de l'URL de base pour l'authentification
const AUTH_URL = "/user";

// Injection des endpoints dans `apiSlice` pour gérer l'authentification
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Définition de l'endpoint pour la connexion (login)
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,  // Endpoint API pour l'authentification
                method: "POST",            // Méthode HTTP utilisée
                body: data,                // Données envoyées dans la requête (email, mot de passe, etc.)
                credentials: "include",         // Permet d'envoyer les cookies (ex: JWT ou sessions)
            }),
        }),

        //def de l'endpoint pour la registration()

        register: builder.mutation({
            query: (data) => ({
              url: `${AUTH_URL}/register`,
              method: "POST",
              body: data,
              credentials: "include",
            }),
            invalidatesTags: ["Team"], // Pour forcer la mise à jour après l'inscription
          }),

        //def for logout 
        logout: builder.mutation({
            query: (data) => ({
              url: `${AUTH_URL}/logout`,  // Endpoint API pour l'authentification
              method: "POST",// Méthode HTTP utilisée
              body: data,// Données envoyées dans la requête (email, mot de passe, etc.)
              credentials: "include",// Permet d'envoyer les cookies (ex: JWT ou sessions)
            }),
            invalidatesTags: ["Team"], // Idem si la déconnexion modifie la team affichée
          }),


    }),
});

// Export du hook `useLoginMutation` généré automatiquement par Redux Toolkit Query
// Ce hook sera utilisé dans les composants React pour appeler la mutation `login`
export const { useLoginMutation,useRegisterMutation,useLogoutMutation } = authApiSlice;
