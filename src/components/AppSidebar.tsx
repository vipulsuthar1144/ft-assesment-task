import { appLogo } from "@assets/index";
import * as Popover from "@radix-ui/react-popover";
import Image from "@ui/Image";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

const sidebarItems = [
  { label: "Dashboard", icon: "📊" },
  { label: "Article", icon: "📰" },
  { label: "Auto dealership", icon: "🚗" },
  {
    label: "Blog",
    icon: "📝",
    children: ["Post 1", "Post 2"],
  },
  {
    label: "Career",
    icon: "💼",
    children: ["Jobs", "Internship"],
  },
  { label: "FAQ’s", icon: "❓" },
];

export default function AppSidebar() {
  return (
    <div className="w-60 relative bg-white h-screen max-h-screen overflow-y-auto border-r shadow-sm">
      <div className="px-5 py-3 text-center border-b">
        <Image highResSrc={appLogo} alt="Logo" className="h-16" />
      </div>
      <ul className="px-2 py-4">
        {sidebarItems.map(item => {
          const hasChildren = item.children && item.children.length > 0;
          return (
            <li key={item.label} className="my-1">
              {hasChildren ? (
                <PopoverWithSameWidth
                  label={item.label}
                  icon={item.icon}
                  childrenItems={item.children}
                />
              ) : (
                <button className="flex items-center gap-3 w-full px-4 py-2 rounded hover:bg-gray-100">
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const PopoverWithSameWidth = ({
  label,
  icon,
  childrenItems,
}: {
  label: string;
  icon: string;
  childrenItems: string[];
}) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [triggerWidth, setTriggerWidth] = useState(0);

  return (
    <Popover.Root
      onOpenChange={() => setTriggerWidth(triggerRef.current?.offsetWidth || 0)}
    >
      <Popover.Trigger asChild>
        <button
          ref={triggerRef}
          className="flex justify-between items-center w-full px-4 py-2 rounded hover:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <span>{icon}</span>
            <span className="text-sm font-medium">{label}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={4}
          style={{ width: triggerWidth }}
          className="bg-white"
        >
          <ul className="space-y-1 py-2 px-4">
            {childrenItems.map(child => (
              <li
                key={child}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {child}
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
