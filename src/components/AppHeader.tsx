"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { appLogo } from "@assets/index";
import useLocalStorage from "@hooks/useLocalStorage";
import { IUserSchema } from "@schemas/signin.schema";
import Image from "@ui/Image";
import { LocalStorageKeys, NavigationRoutes } from "@utils/constant";
import _ from "lodash";
import {
  Bell,
  ChevronDownCircle,
  Key,
  LogOut,
  Menu,
  SearchIcon,
  Settings,
  UserCircle2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppHeader({ onMenuClick }: { onMenuClick: VoidFunction }) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [ADMIN_DATA] = useLocalStorage<IUserSchema>(
    LocalStorageKeys.USER_DATA,
    {}
  );
  const navigate = useNavigate();

  return (
    <header className="w-full top-0 sticky flex items-center justify-between px-5 py-5 bg-white  z-50">
      <div className="px-5 text-center">
        <Image highResSrc={appLogo} alt="Logo" className="h-12 aspect-square" />
      </div>
     
      {/* Search Bar */}
      <div className="flex-1 hidden md:flex items-center justify-center">
        <div className="relative max-w-sm w-full">
          <Input placeholder="Search" className="pl-10 bg-gray-100" />
          <span className="absolute left-3 top-2 text-gray-400">
            <SearchIcon size={20} />
          </span>
        </div>
      </div>

      {/* Notification + Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icon with Badge */}
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <Badge className="absolute -top-3 -right-3 text-xs bg-pink-500 text-white rounded-full">
            6
          </Badge>
        </div>

        {/* Profile Popover with Overlay */}
        {popoverOpen && (
          <div
            className="fixed inset-0 bg-black/10 z-40"
            onClick={() => setPopoverOpen(false)}
          />
        )}

        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <div className=" hidden md:flex items-center gap-2 cursor-pointer relative z-50 px-5">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://randomuser.me/api/portraits/men/75.jpg" />
                <AvatarFallback>
                  {ADMIN_DATA.firstName?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm leading-tight hidden sm:block">
                <div className="font-medium text-black">
                  {ADMIN_DATA.fullName}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {_.capitalize(ADMIN_DATA.userType)}
                </div>
              </div>
            
              <ChevronDownCircle className="w-4 h-4 text-muted-foreground/50 self-end" />
            </div>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-64 p-2 bg-white rounded-xl shadow-xl z-50"
            sideOffset={10}
          >
            <div className="flex flex-col">
              <PopoverItem
                icon={<UserCircle2 className="text-blue-500 w-4 h-4" />}
                text="Manage Account"
              />
              <PopoverItem
                icon={<Key className="text-pink-500 w-4 h-4" />}
                text="Change Password"
              />
              <PopoverItem
                icon={<Settings className="text-purple-500 w-4 h-4" />}
                text="Activity Log"
              />
              <PopoverItem
                icon={<LogOut className="text-red-500 w-4 h-4" />}
                text="Log out"
                onClick={() => {
                  localStorage.clear();
                  navigate(`/${NavigationRoutes.LOGIN}`);
                }}
              />
            </div>
          </PopoverContent>
        </Popover>

         <button
          onClick={onMenuClick}
          className="p-2 rounded hover:bg-gray-100 block md:hidden dark:hover:bg-gray-800"
          aria-label="Toggle Dark Mode"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}

function PopoverItem({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: VoidFunction;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-xs text-t-202224 font-medium text-left"
    >
      {icon}
      {text}
    </button>
  );
}
