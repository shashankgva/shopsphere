export interface Coupon {
  code: string;
  discountPercentage: number;
}

export interface CouponState {
  coupon: Coupon | null;
  message: string;
}
