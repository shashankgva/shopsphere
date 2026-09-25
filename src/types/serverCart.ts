export interface ServerCartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal?: number;
  thumbnail: string;
}

export interface ServerCart {
  id: number;
  products: ServerCartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface SaveCartRequest {
  userId: number;
  products: {
    id: number;
    quantity: number;
  }[];
}
