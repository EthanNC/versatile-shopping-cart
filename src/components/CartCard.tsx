import { Button, Card, Divider, Title } from "@tremor/react";
import { useAtom, useSetAtom } from "jotai";
import {
  calcTotalPriceAtom,
  cartAtom,
  Item,
  removeFromCartAtom,
} from "../lib/cart";
import { RESET } from "jotai/utils";
import { useState } from "react";

export default function CartCard() {
  const [cart, setCart] = useAtom(cartAtom);
  const setRemoveFromCart = useSetAtom(removeFromCartAtom);
  const setCalcTotalPrice = useSetAtom(calcTotalPriceAtom);
  const [error, setError] = useState<Error | null>(null);

  const { items, totalPrice } = cart;

  const removeFromCart = (product: Item) => {
    try {
      setRemoveFromCart(product);
      setCalcTotalPrice();
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <Card>
      <div className="flex justify-between">
        <Title className="text-2xl">Cart</Title>
        <Button onClick={() => setCart(RESET)}>Remove All</Button>
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
      <Divider />
      <div className="flex flex-col space-y-4">
        {items.length ? (
          items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <Title className="flex-1 text-2xl">{item.name}</Title>
              <div>
                <span className="">Quantity</span>
                <p className="text-2xl">{item.quantity}</p>
              </div>
              <div className="flex flex-col items-end">
                <Title className="text-2xl">${item.price}</Title>
                <Button onClick={() => removeFromCart(item)}>Remove</Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No items in cart</p>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <Title className="text-2xl">Total</Title>
        <Title className="text-2xl">${totalPrice}</Title>
      </div>
    </Card>
  );
}
