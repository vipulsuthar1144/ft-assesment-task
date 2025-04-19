import { NavigationRoutes } from "@utils/constant";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sidebarItems } from "./AppSidebar";

const AppMobileSideBar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
}) => {
  const navigate = useNavigate();

  const handleItemClick = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(`/${NavigationRoutes.LOGIN}`, { replace: true });
  };

  return (
    <>
      <div
        className={`fixed h-screen w-52  bg-white dark:bg-gray-900 dark:text-white text-black transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="mt-4 space-y-2">
          {sidebarItems.map(({ id, label, icon: Icon, path }) => (
            <li
              key={id}
              className={`flex items-center text-nowrap gap-4 px-4 py-2 cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-800 rounded-tl-full rounded-bl-full `}
              onClick={() => handleItemClick(path)}
              title={label} // Tooltip for collapsed mode
            >
              <Icon size={20} className="flex-shrink-0 " />
              <span className={`transition-all duration-300 `}>{label}</span>
            </li>
          ))}

          <li>
            <button
              onClick={() => {
                onClose();
                handleLogout();
              }}
              className={`flex items-center text-nowrap gap-4 px-4 py-2 cursor-pointer text-red-500  hover:bg-gray-100 dark:hover:bg-gray-800 rounded-tl-full rounded-bl-full `}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AppMobileSideBar;
