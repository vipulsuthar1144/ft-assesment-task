import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoutes from "@routes/Public.routes";
import ProtectedRoutes from "@routes/Protected.routes";
import PublicLayout from "@layouts/Public.layout";
import ProtectedLayout from "@layouts/Protected.layout";

const AppRoutes = () => {
  const rootRoutes = createBrowserRouter(
    [
      {
        path: "/auth",
        element: <PublicLayout />,
        children: PublicRoutes,
        // errorElement: <FallbackError type="error_boundary" />,
      },
      {
        path: "/",
        element: <ProtectedLayout />,
        children: ProtectedRoutes,
        // errorElement: <FallbackError type="error_boundary" />,
      },
      // {
      // path: "*",
      // element: <FallbackError type="page_not_found" />,
      // },
    ],
    {
      basename: "/",
    }
  );

  return <RouterProvider router={rootRoutes} />;
};

export default AppRoutes;
