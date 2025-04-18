import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoutes from "@routes/Public.routes";
import ProtectedRoutes from "@routes/Protected.routes";
import PublicLayout from "@layouts/Public.layout";
import ProtectedLayout from "@layouts/Protected.layout";
import FallbackPageNotFound from "@fallback/FallbackPageNotFound";
import FallbackErrorBoundary from "@fallback/FallbackErrorBoundary";
import { NavigationRoutes } from "@utils/constant";

const AppRoutes = () => {
  const rootRoutes = createBrowserRouter(
    [
      {
        path: `${NavigationRoutes.BASE}${NavigationRoutes.LOGIN}`,
        element: <PublicLayout />,
        children: PublicRoutes,
        errorElement: <FallbackErrorBoundary />,
      },
      {
        path: NavigationRoutes.BASE,
        element: <ProtectedLayout />,
        children: ProtectedRoutes,
        errorElement: <FallbackErrorBoundary />,
      },
      {
        path: "*",
        element: <FallbackPageNotFound />,
      },
    ],
    {
      basename: NavigationRoutes.BASE,
    }
  );

  return <RouterProvider router={rootRoutes} />;
};

export default AppRoutes;
