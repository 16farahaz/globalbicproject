import { apiSlice } from "../apiSlice"

const USER_URL = "/user"

export const userApiSlice = apiSlice.injectEndpoints({
     endpoints:(builder)=>({

        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/profile`,
                method:"PUT",
                body:data,
                credentials:"include",
            }),
            invalidatesTags: ['Team'],
        }),


        getTeamList: builder.query({
            query: () => ({
              url: `${USER_URL}/team`,
              method: "GET",
              credentials: "include",
            }),
            providesTags: ["Team"], // 💡 Important
          }),

          deleteUser: builder.mutation({
            query: (id) => ({
              url: `${USER_URL}/${id}`,
              method: "DELETE",
              credentials: "include",
            }),
            invalidatesTags: ['Team'],
          }),
          

        userAction: builder.mutation({
            query: (data) => ({
            url: `${USER_URL}/${data.id}`,
            method: "PUT",
            body: data,
            credentials: "include",
        }),
            invalidatesTags: ["Team"], // 💡 Triggers refetch of getTeamList
          }),
        
        

          changePassword: builder.mutation({
            query: (data) => ({
            url: `${USER_URL}/change-password`,
            method: "PUT",
            body: data,
            credentials: "include",
          }),
            invalidatesTags: ["Team"], // 💡 Triggers refetch of getTeamList
          }),

          
        


     }),
});

export const { 
     useUpdateUserMutation ,
     useGetTeamListQuery , 
     useDeleteUserMutation, 
     useUserActionMutation , 
     useChangePasswordMutation,
    } = userApiSlice;