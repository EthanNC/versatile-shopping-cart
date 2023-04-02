import { Button, Card, Title } from "@tremor/react";
import { useAtom } from "jotai";
import { cartAtom } from "../lib/cart";

export default function CartCard() {
  const [cart, setCart] = useAtom(cartAtom);
  const { items } = cart;

  const removeFromCart = (id: string) => {
    setCart((cart) => ({
      ...cart,
      items: cart.items.filter((item) => item.id !== id),
    }));
  };

  console.log(items);
  return (
    <>
      <Title className="text-2xl flex justify-center mb-4">Cart</Title>
      <Card>
        <div className="flex flex-col space-y-4">
          {items.length ? (
            items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <Title className="flex-1 text-2xl">{item.name}</Title>

                <div className="flex flex-col items-end">
                  <Title className="text-2xl">${item.price}</Title>
                  <Button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No items in cart</p>
          )}
        </div>
      </Card>
    </>
  );
}
