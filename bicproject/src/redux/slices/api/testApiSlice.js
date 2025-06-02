import { apiSlice } from "../apiSlice";

const AUTH_URL = "/test";

export const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add a new test technique
    addTestTechnique: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["TestTechnique"],
    }),

    // Update a test technique by ID
    updateTestTechnique: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `${AUTH_URL}/update/${id}`,
        method: "PUT",
        body: updatedData,
        credentials: "include",
      }),
      invalidatesTags: ["TestTechnique"],
    }),

    // Get all test techniques by user ID
    getAlltestByUserId: builder.query({
      query: (userId) => ({
        url: `${AUTH_URL}/user/${userId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["TestTechnique"],
    }),

    // Get test technique by ID
    getTestTechniqueById: builder.query({
      query: (id) => ({
        url: `${AUTH_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["TestTechnique"],
    }),

    // Get all test techniques
    getAllTestsTechnique: builder.query({
      query: () => ({
        url: `${AUTH_URL}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["TestTechnique"],
    }),

    //delete
    // Delete test technique by ID
    deleteTestTechnique: builder.mutation({
      query: (id) => ({
        url: `${AUTH_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["TestTechnique"],
    }),
  }),
});

export const {
  useAddTestTechniqueMutation,
  useUpdateTestTechniqueMutation,
  useGetAlltestByUserIdQuery,
  useGetTestTechniqueByIdQuery,
  useGetAllTestsTechniqueQuery,
  useDeleteTestTechniqueMutation,
} = testApiSlice;
