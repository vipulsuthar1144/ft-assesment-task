import Home from "@pages/Home";
import { RouteObject } from "react-router-dom";

const PublicRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home/>,
  },
];

export default PublicRoutes;
