// Importation de `apiSlice` qui contient la configuration de base de l'API
import { apiSlice } from "../apiSlice";

// Définition de l'URL de base pour l'authentification
const AUTH_URL = "/evaluationac";

export const evaluationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation pour ajouter une nouvelle évaluation
    addNewEvaluation: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Evaluation"],
    }),

    // Requête pour obtenir la liste des évaluations de l'utilisateur connecté par id 
    getEvaluationList: builder.query({
      query: (id) => ({
        url: `${AUTH_URL}/list/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Evaluation"],
    }),

     // Fonction pour récupérer le score d'une formation
    getScoreEvaluation: builder.query({
      query: (id) => ({
        url: `${AUTH_URL}/evaluation/${id}`, // Assure-toi que ce endpoint retourne bien les stats
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Evaluation"],
    })


  })


});

export const{
    useAddNewEvaluationMutation,
    useGetEvaluationListQuery,
    useGetScoreEvaluationQuery,

}= evaluationApiSlice;