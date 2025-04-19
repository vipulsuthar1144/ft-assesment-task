import SignIn from "@pages/auth/SignIn";
import { RouteObject } from "react-router-dom";

const PublicRoutes: RouteObject[] = [
  {
    index: true,
    element: <SignIn />,
  },
];

export default PublicRoutes;
