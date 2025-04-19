import { bgGredient } from "@assets/index";
import AppHeader from "@components/AppHeader";
import AppSidebar from "@components/AppSidebar";
import useLocalStorage from "@hooks/useLocalStorage";
import { LocalStorageKeys, NavigationRoutes } from "@utils/constant";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const [accessToken, _] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN, "");
  if (!accessToken) {
    return <Navigate to={`/${NavigationRoutes.LOGIN}`} replace={true} />;
  }
  return (
    <div className="w-full h-[100dvh] flex">
      <div className="fixed -top-36 left-0 w-full -z-1 overflow-hidden">
        <img src={bgGredient} className="w-full h-full object-fill" />
      </div>
      <div className="fixed top-0 left-0 min-h-screen">
        <AppSidebar />
      </div>

      <div className="flex-1 pl-60">
        <AppHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
