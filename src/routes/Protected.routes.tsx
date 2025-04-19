import Articles from "@pages/articles/Articles";
import Dashboard from "@pages/dashboard/Dashboard";
import Faqs from "@pages/faqs/Faqs";
import { NavigationRoutes } from "@utils/constant";
import { Navigate, RouteObject } from "react-router-dom";

const ProtectedRoutes: RouteObject[] = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: NavigationRoutes.HOME,
    element: <Navigate to={NavigationRoutes.BASE} replace={true} />,
  },
  {
    path: NavigationRoutes.ARTICLES,
    element: <Articles />,
  },
  {
    path: NavigationRoutes.FAQs,
    element: <Faqs />,
  },
];

export default ProtectedRoutes;
