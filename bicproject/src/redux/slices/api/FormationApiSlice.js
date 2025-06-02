// Importation de `apiSlice` qui contient la configuration de base de l'API
import { apiSlice } from "../apiSlice";

// Définition de l'URL de base pour l'authentification
const AUTH_URL = "/formation";

export const formationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation pour ajouter une nouvelle formation
    addNewFormation: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Formation"],
    }),

    // Mutation pour mettre à jour une formation existante
    updateFormation: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `${AUTH_URL}/update/${id}`,
        method: "PUT",
        body: updatedData,
        credentials: "include",
      }),
      invalidatesTags: ["Formation"],
    }),

    // Requête pour obtenir la liste des formations de l'utilisateur connecté par id 
    getFormationList: builder.query({
      query: (id) => ({
        url: `${AUTH_URL}/list/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Formation"],
    }),
    
    // Mutation pour supprimer une formation
    deleteFormation: builder.mutation({
      query: (id) => ({
        url: `${AUTH_URL}/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Formation"],
    }),
    // Requête pour obtenir les détails d'une formation spécifique
    getFormationDetails: builder.query({
      query: (id) => ({
        url: `${AUTH_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Formation"],
    }),
  }),
});

// Exportation des hooks générés automatiquement pour les mutations et les requêtes
export const {
    useAddNewFormationMutation,
    useUpdateFormationMutation,
    useGetFormationListQuery,
    useDeleteFormationMutation,
    useGetFormationDetailsQuery,
    
} = formationApiSlice;