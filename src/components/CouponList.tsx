import { faker } from "@faker-js/faker";
import { Button, Card, Title } from "@tremor/react";
import { RESET } from "jotai/utils";
import {
  useCalcTotalPrice,
  useCart,
  useCoupons,
  useIsCouponInCart,
} from "../lib/cart";
import { useState } from "react";
import { Coupon } from "../lib/types";
import { useLoaderData } from "react-router-dom";

function fetchCoupons() {
  return new Promise<Coupon[]>((resolve) => {
    setTimeout(() => {
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
      resolve(coupons);
    }, 1000); // simulate a 2 second delay
  });
}

CouponList.loader = async () =>
  await fetchCoupons().then((coupons) => ({ coupons }));

export function CouponList() {
  const { coupons } = useLoaderData() as Awaited<{
    coupons: Coupon[];
  }>;

  const [cart, setCart] = useCart();
  // const [, setCoupon] = useCoupon();
  const [selectedCoupons, setSelectedCoupons] = useCoupons();
  const calcTotalPrice = useCalcTotalPrice();
  const [, isCouponInCart] = useIsCouponInCart();
  const [error, setError] = useState<Error | null>(null);

  const applyCoupon = (coupon: Coupon) => {
    try {
      setCart((cart) => ({
        ...cart,
        coupons: [...cart.coupons, coupon.code],
      }));

      setSelectedCoupons((coupons) => {
        return [...coupons, coupon];
      });
      calcTotalPrice();
    } catch (e: any) {
      setError(e);
    }
  };

  const removeCoupon = (coupon: Coupon) => {
    try {
      setCart((cart) => ({
        ...cart,
        coupons: cart.coupons.filter((code) => code !== coupon.code),
      }));
      setSelectedCoupons((coupons) => {
        return coupons.filter((c) => c.code !== coupon.code);
      });
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
        {coupons.map((coupon) => (
          <li key={coupon.id}>
            <Title className="text-2xl">{coupon.code}</Title>
            {coupon.discountType === "percent" ? (
              <p className="text-gray-500">{coupon.discount}% off</p>
            ) : (
              <p className="text-gray-500">${coupon.discount} off</p>
            )}
            <div className="flex space-x-2">
              <Button
                disabled={
                  isCouponInCart(coupon.code) || cart.items.length === 0
                }
                onClick={() => applyCoupon(coupon)}
              >
                Apply
              </Button>
              <Button
                disabled={!isCouponInCart(coupon.code)}
                onClick={() => removeCoupon(coupon)}
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
