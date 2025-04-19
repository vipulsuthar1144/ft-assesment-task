import { bgLogin } from "@assets/index";
import useLocalStorage from "@hooks/useLocalStorage";
import { LocalStorageKeys, NavigationRoutes } from "@utils/constant";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const [accessToken, _] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN, "");
  if (accessToken) {
    return <Navigate to={NavigationRoutes.BASE} replace={true} />;
  }
  return (
    <div
      className="w-full h-full overflow-hidden max-h-[100dvh]"
      style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: "stretch",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
