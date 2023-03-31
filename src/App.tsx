import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Products from "./routes/products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // loader: rootLoader,
    children: [
      {
        path: "products",
        element: <Products />,
        // loader: ,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
