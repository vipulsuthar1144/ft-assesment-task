import { X } from "lucide-react";
import React from "react";

interface IAppDialogProps {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
  maxWidth?: string;
  errorMessage?: string | null;
}

const AppDialog = ({ children, title, onClose, maxWidth = "max-w-fit", errorMessage = null }: IAppDialogProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full ${maxWidth} p-5 m-5 z-50`}
        style={{ zIndex: 99 }}
      >
        <div className="max-h-[80vh]  overflow-y-auto  [&::-webkit-scrollbar]:w-0 z-50">
          <div className="sticky top-0 left-0  pb-3 flex-1 flex justify-between items-center bg-white dark:bg-gray-800">
            <h2 className="text-2xl  font-semibold ">{title}</h2>
            <button
              onClick={onClose}
              className="dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-full focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {errorMessage && (
            <div className="bg-red-100 my-3 dark:bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errorMessage}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppDialog;
