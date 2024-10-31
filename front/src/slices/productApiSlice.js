import { PRODUCTS_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProducts: builder.query({
            query: ({keyword}) => ({
                url: PRODUCTS_URL,
                params: {keyword}
            }),
            providesTags:['Products'],
            keepUnusedDataFor:5
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
            keepUnusedDataFor:5
        }),
        createProduct: builder.mutation({
            query:(data) => ({
                url: `${PRODUCTS_URL}/`,
                method:'POST',
                body: data
            })
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method:'DELETE',
            })
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.get('id')}`,
                method:'PUT',
                body:data
            })
        }),
        createReview: builder.mutation({
            query:(data) => ({
                url: `${PRODUCTS_URL}/${data.id}/addreview`,
                method:'POST',
                body: data
            }),
            invalidatesTags:['Products']
        }),
        deleteReview: builder.mutation({
            query:({id, idreview}) => ({
                url: `${PRODUCTS_URL}/${id}/deletereview/${idreview}`,
                method:'DELETE',
            })
        }),
        getTopProduct: builder.query({
            query:() => ({
                url: `${PRODUCTS_URL}/top`
            })
        })

    }),
});

export const {
    useGetProductsQuery, 
    useGetProductByIdQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useCreateReviewMutation,
    useDeleteReviewMutation,
    useGetTopProductQuery,
}= productApiSlice

