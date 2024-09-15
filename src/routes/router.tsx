import { createBrowserRouter } from "react-router-dom";

import Error404 from "../view/Error404";
import Admin from "../view/Admin"
import Product from "../view/Product"
import Categories from "../view/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
    children: [
      { path: "/", element: <Product /> },
      { path: "/categorias", element: <Categories /> },
    ]
  },

  { path: "*", element: <Error404 /> },
]);

export default router;



