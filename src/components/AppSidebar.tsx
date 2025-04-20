import { NavigationRoutes } from "@utils/constant";
import {
  Briefcase,
  ChevronDown,
  Gift,
  HelpCircle,
  LayoutDashboard,
  LifeBuoy,
  Lock,
  LucideCircleDotDashed,
  MapPin,
  Megaphone,
  Newspaper,
  NotebookText,
  Package,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const sidebarItems = [
  { id: 1, path: "/", icon: LayoutDashboard, label: "Dashboard" },
  {
    id: 2,
    path: `/${NavigationRoutes.ARTICLES}`,
    icon: Newspaper,
    label: "Article",
  },
  {
    id: 7,
    path: `/${NavigationRoutes.FAQs}`,
    icon: HelpCircle,
    label: "FAQ’s",
  },
  {
    id: 3,
    path: "/auto",
    icon: LucideCircleDotDashed,
    label: "Auto dealership",
  },
  {
    id: 4,
    path: "/blog",
    icon: NotebookText,
    label: "Blog",
    hasDropdown: true,
    children: ["Post 1", "Post 2"],
  },
  {
    id: 5,
    path: "/career",
    icon: Briefcase,
    label: "Career",
    hasDropdown: true,
    children: ["Openings", "Internships"],
  },
  { id: 6, path: "/location", icon: MapPin, label: "Country, state, city" },

  {
    id: 8,
    path: "/news",
    icon: Megaphone,
    label: "Free shop news",
    hasDropdown: true,
    children: ["News 1", "News 2"],
  },
  {
    id: 9,
    path: "/help",
    icon: LifeBuoy,
    label: "Help Center",
    hasDropdown: true,
    children: ["Support", "Guides"],
  },
  {
    id: 10,
    path: "/how-it-works",
    icon: Settings,
    label: "How it works",
    hasDropdown: true,
    children: ["Flow", "Details"],
  },
  { id: 11, path: "/jobs", icon: Gift, label: "Jobs" },
  {
    id: 12,
    path: "/press",
    icon: Newspaper,
    label: "Press",
    hasDropdown: true,
    children: ["Press Kit", "News"],
  },
  {
    id: 13,
    path: "/product",
    icon: Package,
    label: "Product",
    hasDropdown: true,
    children: ["Overview", "Features"],
  },
  { id: 14, path: "/privacy", icon: Lock, label: "Privacy & Terms" },
  {
    id: 15,
    path: "/trust",
    icon: ShieldCheck,
    label: "Trust & safety",
    hasDropdown: true,
    children: ["Policies", "Reports"],
  },
  { id: 16, path: "/user", icon: Users, label: "User Management" },
  { id: 17, path: "/order", icon: Package, label: "Order" },
  { id: 18, path: "/settings", icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);

  const handleItemClick = (item: any) => {
    if (item.hasDropdown) {
      setOpenDropdown(openDropdown === item.id ? null : item.id);
    } else {
      setSelectedPath(item.path);
      navigate(item.path);
    }
  };

  return (
    <div className="h-full pb-10 w-72 bg-white text-black transition-all duration-300 overflow-y-auto overflow-x-hidden">
      <ul className="mt-4 space-y-2 items-start w-full flex flex-col">
        {sidebarItems.map(item => (
          <li key={item.id} className="w-full relative">
            <div
              className={`w-[70%] text-nowrap flex items-center justify-between gap-4 mx-4 px-4 py-2 cursor-pointer rounded-md ${
                item.path === selectedPath
                  ? "bg-[#199FB1] text-white hover:bg-[#199FB1]"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleItemClick(item)}
              title={item.label}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className="flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {item.hasDropdown && (
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    openDropdown === item.id ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
            {openDropdown === item.id && item.children && (
              <ul className="ml-5 mt- absolute top-10 bg-gray-50 border z-20 border-gray-200 rounded-md shadow-md w-[70%]">
                {item.children.map((child, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 cursor-pointer"
                  >
                    {child}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
