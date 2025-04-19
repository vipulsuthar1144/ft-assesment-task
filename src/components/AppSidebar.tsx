
import { NavigationRoutes } from "@utils/constant";
import { LayoutDashboard, NotebookText, Package, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarItems = [
  { id: 1, path: `${NavigationRoutes.BASE}`, icon: LayoutDashboard, label: "Dashboard" },
  { id: 2, path: `/${NavigationRoutes.ARTICLES}`, icon: Users, label: "Articles" },
  { id: 3, path: `/${NavigationRoutes.FAQs}`, icon: Package, label: "FAQs" },
  { id: 4, path: `/${NavigationRoutes.PRIVACY_POLICY}`, icon: NotebookText, label: "Privacy & Policy" },
];

const Sidebar = () => {
  const [selectedPath, setSelectedPath] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);

 

  const handleItemClick = (path: string) => {
    setSelectedPath(path);
    navigate(path);
  };

  return (
    <div
      className={`relative h-screen w-64 bg-white text-black transition-all duration-300`}
    >
      {/* Sidebar Content */}
      <ul className="mt-4 space-y-2 items-start w-ful flex flex-col">
        {sidebarItems.map(({ id, label, icon: Icon, path }) => (
          <li
            key={id}
            className={`w-[70%] text-nowrap flex items-center  gap-4 mx-4 px-4 py-2 cursor-pointer rounded-md ${
              path === selectedPath ? "bg-[#199FB1] text-white hover:bg-[#199FB1] hover:text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => handleItemClick(path)}
            title={label}
          >
            <Icon size={18} className="flex-shrink-0" />
            <span className={`font-medium text-sm ttransition-all duration-300`}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
