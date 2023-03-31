import { Card, Title } from "@tremor/react";

export default function CartCard() {
  return (
    <Card>
      <Title className="text-2xl flex justify-center mb-4">Cart</Title>
      <div className="flex items-center space-x-4">
        <div className="h-24 w-24 animate-pulse bg-gray-200" />
        <div className="flex-1 space-y-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      </div>
    </Card>
  );
}
