import { z } from "zod";

export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().nonnegative().default(1),
});

export type Item = z.infer<typeof itemSchema>;

export const cartSchema = z.object({
  items: z.array(itemSchema),
  totalPrice: z.number().nonnegative(),
  mainItem: z.union([itemSchema, z.null()]),
  coupon: z.string(),
});

export type Cart = z.infer<typeof cartSchema>;

export const couponSchema = z.object({
  id: z.string(),
  code: z.string(),
  discount: z.number(),
  discountType: z.enum(["percent", "flat"]),
});

export type Coupon = z.infer<typeof couponSchema>;
