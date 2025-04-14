import useLocalStorage from "@hooks/useLocalStorage";
import { LocalStorageKeys } from "@utils/constant";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const [accessToken, _] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN, "");
  if (accessToken) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        flex: 1,
        backgroundColor: "black",
        // display: "flex",
        // justifyContent: "center",
      }}
    >
      <Outlet />
    </div>
  );
};

export default PublicLayout;
