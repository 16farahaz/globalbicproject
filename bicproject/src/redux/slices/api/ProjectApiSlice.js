import { apiSlice } from "../apiSlice";

const AUTH_URL = "/projet";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add a new project with FormData (supports files)
    addProject: builder.mutation({
      query: (formData) => ({
        url: `${AUTH_URL}/add`,
        method: "POST",
        body: formData,
        credentials: "include",
        // DO NOT set Content-Type headers here for multipart/form-data
      }),
      invalidatesTags: ["Projet"],
    }),

    // Update a project by id with FormData (id passed separately)
    updateProject: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${AUTH_URL}/${id}`,
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["Projet"],
    }),

    // Get all projects for a user
    getAllProjectByUserId: builder.query({
      query: (userId) => ({
        url: `${AUTH_URL}/user/${userId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Projet"],
    }),

    // Get one project by id
    getProjectById: builder.query({
      query: (id) => ({
        url: `${AUTH_URL}/one/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Projet"],
    }),

    // Delete a project by id
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${AUTH_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Projet"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetAllProjectByUserIdQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice;
