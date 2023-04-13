import { atom, useAtom, useSetAtom } from "jotai";
import { atomWithStorage, atomWithReset } from "jotai/utils";
import {
  Cart,
  Coupon,
  Item,
  cartSchema,
  couponSchema,
  itemSchema,
} from "./types";

export const cartAtom = atomWithStorage<Cart>("versatile-shopping-cart", {
  items: [] as Item[],
  totalPrice: 0,
  totalDiscount: 0,
  coupons: [] as string[],
});

export const useCart = () => useAtom(cartAtom);

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
    const parsedItem = itemSchema.safeParse(product);
    if (!parsedItem.success) {
      throw new Error(parsedItem.error.message);
    }
    const newCartItem = { ...product, quantity: 1 };
    const updatedCart = [...cart.items, newCartItem];
    set(cartAtom, (prev) => ({ ...prev, items: updatedCart }));
  }
});

export const useAddToCart = () => useSetAtom(addToCartAtom);

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

export const useRemoveFromCart = () => useSetAtom(removeFromCartAtom);

//set total price on cartAtom. This will become a heavy computation
//https://jotai.org/docs/guides/performance#heavy-computation
export const calcTotalPriceAtom = atom(null, (get, set) => {
  const cart = get(cartAtom);
  const coupons = get(couponsAtom);

  const { totalPrice } = cart.items.reduce(
    (acc, item) => {
      const { totalPrice } = acc;
      const { price, quantity } = item;
      const itemTotalPrice = price * quantity;
      return {
        totalPrice: totalPrice + itemTotalPrice,
        // totalDiscount: totalDiscount + itemTotalDiscount,
      };
    },
    { totalPrice: 0 }
  );

  const totalDiscount = coupons.reduce((acc, coupon) => {
    const { discount, discountType } = coupon;
    if (discountType === "flat") {
      return acc + discount;
    } else if (discountType === "percent") {
      return acc + (totalPrice * discount) / 100;
    }
    return acc;
  }, 0);

  const totalPriceWithDiscount = totalPrice - totalDiscount;
  const parsedCart = cartSchema.safeParse({
    ...cart,
    totalPrice: totalPriceWithDiscount,
    totalDiscount: totalDiscount,
  });
  if (!parsedCart.success) {
    throw new Error(parsedCart.error.message);
  }
  set(cartAtom, (prev) => ({
    ...prev,
    totalPrice: totalPriceWithDiscount,
    totalDiscount: totalDiscount,
  }));
});

export const useCalcTotalPrice = () => useSetAtom(calcTotalPriceAtom);

export const couponsAtom = atomWithStorage<Coupon[]>(
  "versatile-shopping-coupons",
  []
);

export const useCoupons = () => useAtom(couponsAtom);

export const isCouponInCartAtom = atom(null, (get, set, code: string) => {
  const cart = get(cartAtom);
  return cart.coupons.some((coupon) => coupon === code);
});

export const useIsCouponInCart = () => useAtom(isCouponInCartAtom);
