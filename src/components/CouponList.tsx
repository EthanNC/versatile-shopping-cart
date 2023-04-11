import { faker } from "@faker-js/faker";
import { Button, Card, Title } from "@tremor/react";
import { RESET } from "jotai/utils";
import { useCalcTotalPrice, useCart, useCoupon } from "../lib/cart";
import { useState } from "react";
import { Coupon } from "../lib/types";

const coupons: Array<Coupon> = [
  {
    id: faker.random.alphaNumeric(10),
    code: "10OFF",
    discount: 10,
    discountType: "percent",
  },
  {
    id: faker.random.alphaNumeric(10),
    code: "20OFF",
    discount: 20,
    discountType: "flat",
  },
];

export function CouponList() {
  const [cart, setCart] = useCart();
  const [, setCoupon] = useCoupon();
  const calcTotalPrice = useCalcTotalPrice();
  const [error, setError] = useState<Error | null>(null);

  const applyCoupon = (coupon: Coupon | typeof RESET) => {
    try {
      setCart((cart) => ({
        ...cart,
        coupon: coupon === RESET ? "" : coupon.code,
      }));
      setCoupon(coupon);
      calcTotalPrice();
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <Card>
      <Title className="text-2xl">Coupons</Title>
      {error && <p className="text-red-500">{error.message}</p>}
      <ul className="flex justify-evenly items-center space-y-4">
        <li className="flex flex-col">
          <Title className="text-2xl">No Coupon</Title>
          <Button
            disabled={cart.coupon === ""}
            onClick={() => applyCoupon(RESET)}
          >
            Apply
          </Button>
        </li>
        {coupons.map((coupon) => (
          <li key={coupon.id}>
            <Title className="text-2xl">{coupon.code}</Title>
            {coupon.discountType === "percent" ? (
              <p className="text-gray-500">{coupon.discount}% off</p>
            ) : (
              <p className="text-gray-500">${coupon.discount} off</p>
            )}
            <Button
              disabled={coupon.code === cart.coupon || cart.items.length === 0}
              onClick={() => applyCoupon(coupon)}
            >
              Apply
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
