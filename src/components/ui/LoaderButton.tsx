import { Loader } from "lucide-react";
import { ElementType } from "react";

export interface IButtonProps {
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "danger";
  type?: "button" | "submit" | "reset";
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
  isDisabled?: boolean;
  StartIcon?: ElementType;
}

export const LoaderButton = ({
  variant = "contained",
  color = "primary",
  type = "button",
  label,
  onClick,
  isLoading = false,
  className,
  isDisabled = false,
  StartIcon,
}: IButtonProps) => {
  let classname =
    " py-2 px-4 text-sm md:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition duration-300 ease-in-out";
  // Styles based on variant
  if (variant === "contained") {
    classname += ` ${
      {
        primary: "bg-[#199FB1] text-white",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        error: "bg-red-500 text-white hover:bg-red-600",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600",
        danger: "bg-purple-500 text-white hover:bg-purple-600",
      }[color]
    }`;
  } else if (variant === "outlined") {
    classname += ` border-2 ${
      {
        primary: "border-blue-500 text-blue-500 hover:bg-blue-50",
        secondary: "border-gray-500 text-gray-500 hover:bg-gray-50",
        success: "border-green-500 text-green-500 hover:bg-green-50",
        error: "border-red-500 text-red-500 hover:bg-red-50",
        warning: "border-yellow-500 text-yellow-500 hover:bg-yellow-50",
        danger: "border-purple-500 text-purple-500 hover:bg-purple-50",
      }[color]
    }`;
  }
  // Adding custom styles if provided
  if (className) {
    classname += ` ${className}`;
  } else {
    className += "w-full";
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <span className="flex items-center justify-center">
          <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
          Loading...
        </span>
      );
    }

    return (
      <span className="flex items-center justify-center gap-1">
        {StartIcon && <StartIcon className="size-5 md:size-6" />}
        <h1 className="font-semibold">{label}</h1>
      </span>
    );
  };
  return (
    <button type={type} disabled={isLoading || isDisabled} onClick={onClick} className={classname}>
      {renderContent()}
    </button>
  );
};
