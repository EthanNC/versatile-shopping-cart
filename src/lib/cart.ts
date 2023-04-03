import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import * as z from "zod";

const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  quantity: z.number().int().default(1),
});

export type Item = z.infer<typeof itemSchema>;

export const cartAtom = atom({
  items: [] as Item[],
  totalPrice: 0,
  mainItem: null as Item | null, //have not used this yet
  coupon: "",
});

export const addToCartAtom = atom(null, (get, set, product: Item) => {
  const cart = get(cartAtom);
  const existingCartItem = cart.items.find((item) => item.id === product.id);
  if (existingCartItem) {
    const updatedCart = cart.items.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    set(cartAtom, (prev) => ({ ...prev, items: updatedCart }));
  } else {
    const newCartItem = { ...product, quantity: 1 };
    const updatedCart = [...cart.items, newCartItem];
    set(cartAtom, (prev) => ({ ...prev, items: updatedCart }));
  }
});

export const removeFromCartAtom = atom(null, (get, set, product: Item) => {
  const cart = get(cartAtom);
  ///if quantity is 1, remove the item from cart
  const duplicateCartItem = cart.items.find(
    (item) => item.id === product.id && item.quantity > 1
  );
  if (duplicateCartItem) {
    const updatedCart = cart.items.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    set(cartAtom, (prev) => ({ ...prev, items: updatedCart }));
  } else {
    const updatedCart = cart.items.filter((item) => item.id !== product.id);
    set(cartAtom, (prev) => ({ ...prev, items: updatedCart }));
  }
});

//set total price on cartAtom. This will become a heavy computation
//https://jotai.org/docs/guides/performance#heavy-computation
export const calcTotalPriceAtom = atom(null, (get, set) => {
  const { items } = get(cartAtom);
  const { discount } = get(couponAtom);
  const totalPrice = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
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
