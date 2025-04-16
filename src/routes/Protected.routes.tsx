import { NavigationRoutes } from "@utils/constant";
import { Navigate, RouteObject } from "react-router-dom";

const ProtectedRoutes: RouteObject[] = [
  {
    index: true,
    element: <>Protected Routes</>,
  },
  {
    path: NavigationRoutes.HOME,
    element: <Navigate to={NavigationRoutes.BASE} replace={true} />,
  },
];

export default ProtectedRoutes;
