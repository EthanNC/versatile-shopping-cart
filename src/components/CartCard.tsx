import { Button, Card, Title } from "@tremor/react";
import { useAtom, useSetAtom } from "jotai";
import {
  calcTotalPriceAtom,
  cartAtom,
  Item,
  removeFromCartAtom,
} from "../lib/cart";

export default function CartCard() {
  const [cart] = useAtom(cartAtom);
  const setRemoveFromCart = useSetAtom(removeFromCartAtom);
  const setCalcTotalPrice = useSetAtom(calcTotalPriceAtom);

  const { items, totalPrice } = cart;

  const removeFromCart = (product: Item) => {
    setRemoveFromCart(product);
    setCalcTotalPrice();
  };

  return (
    <Card>
      <Title className="text-2xl flex justify-center mb-4">Cart</Title>
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
