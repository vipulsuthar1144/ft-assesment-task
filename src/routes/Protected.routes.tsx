
import Articles from "@pages/articals/Articles";
import { NavigationRoutes } from "@utils/constant";
import { Navigate, RouteObject } from "react-router-dom";

const ProtectedRoutes: RouteObject[] = [
  {
    index: true,
    element: <Articles/>,
  },
  {
    path: NavigationRoutes.HOME,
    element: <Navigate to={NavigationRoutes.BASE} replace={true} />,
  },
];

export default ProtectedRoutes;
