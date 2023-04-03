import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
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
  mainItem: null as Item | null, //have not used this yet
  coupon: "",
});

//set total price on cartAtom. This will become a heavy computation
//https://jotai.org/docs/guides/performance#heavy-computation
export const calcTotalPriceAtom = atom(null, (get, set) => {
  const { items } = get(cartAtom);
  const { discount } = get(couponAtom);
  const totalPrice = items.reduce((acc, item) => acc + Number(item.price), 0);
  const totalDiscount = totalPrice * (discount / 100);
  const totalPriceWithDiscount = totalPrice - totalDiscount;
  set(cartAtom, (prev) => ({ ...prev, totalPrice: totalPriceWithDiscount }));
});

export const couponSchema = z.object({
  id: z.string(),
  code: z.string(),
  discount: z.number(),
});

export type Coupon = z.infer<typeof couponSchema>;

export const couponAtom = atomWithReset({
  id: "",
  code: "",
  discount: 0,
});

export const couponCodeAtom = atom((get) => get(couponAtom).code.toUpperCase());
