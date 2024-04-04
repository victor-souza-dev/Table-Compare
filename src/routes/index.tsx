import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "../App";
import Index from "../pages";

const router = [
  {
    path: "/",
    element: <App />,
    children: [{ path: "", element: <Index /> }],
  },
];

const Router = () => (
  <RouterProvider
    router={createBrowserRouter(router, {
      basename: import.meta.env.PUBLIC_URL,
    })}
  />
);

export default Router;
