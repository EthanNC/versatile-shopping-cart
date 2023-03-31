// import faker
import { faker } from "@faker-js/faker";
import { Card, Col, Grid, Title } from "@tremor/react";
import { Outlet } from "react-router-dom";
import CartCard from "./CartCard";

export default function Layout() {
  const image = faker.image.cats();
  return (
    <main className="px-4">
      <Title>Versatile Shoping cart</Title>

      <Grid numColsLg={6} className="gap-6 mt-6">
        {/* Main section */}
        <Col numColSpanLg={4}>
          <Outlet />
        </Col>

        {/* KPI sidebar */}
        <Col numColSpanLg={2}>
          <CartCard />
        </Col>
      </Grid>
    </main>
  );
}
