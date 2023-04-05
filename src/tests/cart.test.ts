//test cart atoms in src/lib/cart.ts
import { renderHook, act } from "@testing-library/react";
import { useAtom } from "jotai";
import { describe, it, expect } from "vitest";
import { addToCartAtom, calcTotalPriceAtom, cartAtom } from "../lib/cart";
describe("cart atoms", () => {
  it("should add item to cart and update the price", () => {
    const { result } = renderHook(() => useAtom(cartAtom));
    const { result: addToCart } = renderHook(() => useAtom(addToCartAtom));
    const { result: calcTotalPrice } = renderHook(() =>
      useAtom(calcTotalPriceAtom)
    );

    const [cart] = result.current;
    const [, setAddToCart] = addToCart.current;
    const [, setCalcTotalPrice] = calcTotalPrice.current;
    expect(cart.items.length).toBe(0);
    act(() => {
      setAddToCart({
        id: "1",
        name: "test",
        price: "10",
        description: "test",
        quantity: 1,
      });
      setAddToCart({
        id: "2",
        name: "test",
        price: "10",
        description: "test",
        quantity: 1,
      });
      setCalcTotalPrice();
    });
    const [updatedCart] = result.current;
    expect(updatedCart.items.length).toBe(2);
    expect(updatedCart.totalPrice).toBe(20);
  });
});
