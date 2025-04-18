import useLocalStorage from "@hooks/useLocalStorage";
import { LocalStorageKeys, NavigationRoutes } from "@utils/constant";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const [accessToken, _] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN, "");
  if (!accessToken) {
    return <Navigate to={`/${NavigationRoutes.LOGIN}`} replace={true} />;
  }
  return (
    <div
      style={{
        width: "100%",
        flex: 1,
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
