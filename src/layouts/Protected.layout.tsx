import { bgGredient } from "@assets/index";
import AppHeader from "@components/AppHeader";
import AppMobileSideBar from "@components/AppMobileSideBar";
import AppSidebar from "@components/AppSidebar";
import useLocalStorage from "@hooks/useLocalStorage";
import { LocalStorageKeys, NavigationRoutes } from "@utils/constant";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const [accessToken, _] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN, "");
    const [openSidebar, setOpenSidebar] = useState(false);
  if (!accessToken) {
    return <Navigate to={`/${NavigationRoutes.LOGIN}`} replace={true} />;
  }
  return (
    <>
      <div className={`min-h-[100dvh] w-full flex text-black`}>
            <div className="fixed -top-36 left-0 w-full -z-1 overflow-hidden">
       <img src={bgGredient} className="w-full h-full object-fill" />
      </div>
        <div className="fixed z-50 top-0 left-0 w-full">
          <AppHeader onMenuClick={() => setOpenSidebar(!openSidebar)}  />
        </div>
        <div className="sticky z-49 top-0 left-0 pt-[4.5rem] h-screen overflow-hidden hidden md:block">
          <AppSidebar />
        </div>
        <div className="sticky z-50 top-0 left-0 pt-[4.5rem] h-screen overflow-hidden block md:hidden">
          <AppMobileSideBar isOpen={openSidebar} onClose={() => setOpenSidebar(!openSidebar)} />
        </div>
        <main className="w-full  min-h-screen pt-28 p-5 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </>
    
  );
};

export default ProtectedLayout;
