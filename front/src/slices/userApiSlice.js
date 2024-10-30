import { USERS_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login` ,
                method:'POST',
                body:data
            }),
        }),
        logout: builder.mutation({
            query:() => ({
                url: `${USERS_URL}/logout` ,
                method:'POST',
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signup` ,
                method:'POST',
                body:data
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/profile/${data._id}`,
                method:'PUT',
                body:data
            })
        }),
        getUsers: builder.query ({
            query: () => ({
                url: USERS_URL ,
            }),
            providesTags:['Users'],
            keepUnusedDataFor: 5
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method:'DELETE',
            })
        }),
        userById: builder.query({
            query:(id) => ({
                url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query:(data) => ({
                url: `${USERS_URL}/${data.id}`,
                method:'PUT',
                body:data
            }),
            providesTags:['Users'],
        })
    }),
});

export const {
    useLoginMutation, 
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useUserByIdQuery,
    useUpdateUserMutation
    
}= userApiSlice

