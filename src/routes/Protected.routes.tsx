import { Navigate, RouteObject } from "react-router-dom";

const ProtectedRoutes: RouteObject[] = [
  {
    index: true,
    element: <>Protected Routes</>,
  },
  {
    path: "home",
    element: <Navigate to={"/"} replace={true} />,
  },
];

export default ProtectedRoutes;
