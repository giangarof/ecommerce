import { PRODUCTS_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
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
        })
    }),
});

export const {
    useGetProductsQuery, 
    useGetProductByIdQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    
}= productApiSlice

