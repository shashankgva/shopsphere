import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  Product,
  ProductCategory,
  ProductsResponse,
} from '../types/product';
import type { SaveCartRequest, ServerCart } from '../types/serverCart';
import type { CreateOrderRequest, Order } from '../types/order';
import { createFakeOrder } from './fakeOrderApi';

export type SortOrder = 'asc' | 'desc';

export interface GetProductsParams {
  limit?: number;
  skip?: number;
  sortBy?: keyof Product;
  order?: SortOrder;
  query?: string;
  category?: string;
}

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  tagTypes: ['Product', 'Order'],
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
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      async queryFn(request) {
        try {
          const order = await createFakeOrder(request);
          return { data: order };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: 'Unable to create order.',
            },
          };
        }
      },
      invalidatesTags: ['Order'],
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
  useCreateOrderMutation,
} = shopApi;
