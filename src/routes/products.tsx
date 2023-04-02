import { faker } from "@faker-js/faker";
import { Button, Card, Title } from "@tremor/react";
import { useAtom } from "jotai";
import { cartAtom, Item } from "../lib/cart";

//using faker js create an array of 3 items
const products = Array.from({ length: 3 }, () => ({
  id: faker.random.alphaNumeric(10),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
}));

const fallBack = () => (
  <Card className="flex items-center space-x-4">
    <div className="h-24 w-24 animate-pulse bg-gray-200" />
    <div className="flex-1 space-y-1">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
    </div>
  </Card>
);

export default function Products() {
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = (product: Item) => {
    setCart((cart) => ({
      ...cart,
      items: [...cart.items, product],
    }));
  };

  const isDisabled = (product: Item) => {
    const { items } = cart;
    const item = items.find((item) => item.id === product.id);
    return !!item;
  };

  return (
    <section>
      <Title className="text-2xl flex justify-center mb-4">Products</Title>

      <div className="space-y-24">
        {products.map((product) => (
          <Card key={product.id} className="flex items-center space-x-4">
            <div className="flex-1 space-y-1">
              <Title className="text-2xl">{product.name}</Title>
              <p className="text-gray-500">{product.description}</p>
            </div>
            <div className="flex flex-col items-end">
              <Title className="text-2xl">${product.price}</Title>
              <Button
                disabled={isDisabled(product)}
                onClick={() => addToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
