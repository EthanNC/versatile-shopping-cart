import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CartCard from "../components/CartCard";

describe("CartCard", () => {
  it("should render an empty cart", () => {
    render(<CartCard />);
    expect(screen.getByText("No items in cart"));
  });
});
