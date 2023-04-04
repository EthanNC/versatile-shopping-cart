import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Layout from "../components/Layout";
import Products from "../routes/products";
import CartCard from "../components/CartCard";

describe("Layout", () => {
  it("should render project title visible", () => {
    render(<Layout />);
    expect(screen.getByText("Versatile Shopping Cart"));
  });
});

describe("Products", () => {
  it("should render product title", () => {
    render(<Products />);
    expect(screen.getByText("Products"));
  });
});

describe("Product to Cart", () => {
  it("should handle adding a product to the cart and render the item in the cart", () => {
    const { getAllByRole } = render(<Products />);
    const buttons = getAllByRole("button", { name: "Add to cart" });
    const button = buttons[0];

    fireEvent.click(button);

    const { queryByText } = render(<CartCard />);
    expect(queryByText("No items in cart")).toBeNull();
  });
});
