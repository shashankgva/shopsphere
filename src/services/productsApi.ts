import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  Product,
  ProductCategory,
  ProductsResponse,
} from '../types/product';
import { build } from 'vite';
import type { SaveCartRequest, ServerCart } from '../types/serverCart';

export type SortOrder = 'asc' | 'desc';

export interface GetProductsParams {
  limit?: number;
  skip?: number;
  sortBy?: keyof Product;
  order?: SortOrder;
  query?: string;
  category?: string;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams | void>({
      query: (params) => ({
        url: '/products',
        params: {
          limit: params?.limit ?? 12,
          skip: params?.skip ?? 0,
          sortBy: params?.sortBy,
          order: params?.order,
          query: params?.query,
          category: params?.category,
        },
      }),
    }),
    getProductById: builder.query<Product, number>({
      query: (productId) => `/products/${productId}`,
    }),
    getCategories: builder.query<ProductCategory[], void>({
      query: () => '/products/categories',
    }),
    searchProducts: builder.query<
      ProductsResponse,
      { query: string; limit?: number; skip?: number }
    >({
      query: ({ query, limit = 12, skip = 0 }) => ({
        url: '/products/search',
        params: {
          q: query,
          limit,
          skip,
        },
      }),
    }),
    getProductsByCategory: builder.query<
      ProductsResponse,
      {
        category: string;
        skip?: number;
        limit?: number;
      }
    >({
      query: ({ category, limit = 12, skip = 0 }) => ({
        url: `/products/category/${category}`,
        params: {
          limit,
          skip,
        },
      }),
    }),
    saveCart: builder.mutation<ServerCart, SaveCartRequest>({
      query: (cart) => ({ url: '/carts/add', method: 'POST', body: cart }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
  useSaveCartMutation,
} = productsApi;
