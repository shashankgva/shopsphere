import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreateOrderRequest, Order } from '../types/orderApi';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api',
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    getOrderById: builder.query<Order, string>({
      query: (orderId) => `orders/${orderId}`,
      providesTags: (_result, _error, orderId) => [
        { type: 'Order', id: orderId },
      ],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery } = ordersApi;
