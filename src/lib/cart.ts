import { atom } from "jotai";
import * as z from "zod";

const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
});

export type Item = z.infer<typeof itemSchema>;

export const cartAtom = atom({
  items: [] as Item[],
  totalPrice: 0,
  mainItem: null as Item | null,
  coupon: "" as Coupon | null,
});

export const couponSchema = z
  .string()
  .regex(/^[A-Z0-9]+$/)
  .default("");

export type Coupon = z.infer<typeof couponSchema>;

export const couponAtom = atom({
  code: "" as Coupon,
});

export const couponCodeAtom = atom((get) => get(couponAtom).code.toUpperCase());
