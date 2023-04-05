import { Button, Card, Divider, Title } from "@tremor/react";
import { useAtom, useSetAtom } from "jotai";
import {
  calcTotalPriceAtom,
  cartAtom,
  Item,
  removeFromCartAtom,
} from "../lib/cart";
import { RESET } from "jotai/utils";

export default function CartCard() {
  const [cart, setCart] = useAtom(cartAtom);
  const setRemoveFromCart = useSetAtom(removeFromCartAtom);
  const setCalcTotalPrice = useSetAtom(calcTotalPriceAtom);

  const { items, totalPrice } = cart;

  const removeFromCart = (product: Item) => {
    setRemoveFromCart(product);
    setCalcTotalPrice();
  };

  return (
    <Card>
      <div className="flex justify-between">
        <Title className="text-2xl">Cart</Title>
        <Button onClick={() => setCart(RESET)}>Remove All</Button>
      </div>
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
