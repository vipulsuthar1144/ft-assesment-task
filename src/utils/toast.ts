import { toast } from "react-hot-toast";

const showSuccessToast = (message: string) => {
  toast.success(message, {
    id: message,
    style: {
      //   border: "1px solid #4caf50",
      //   padding: "16px",
      color: "#4caf50",
    },
    iconTheme: {
      primary: "#4caf50",
      secondary: "#FFFFFF",
    },
  });
};

const showErrorToast = (message: string) => {
  toast.error(message, {
    id: message,
    style: {
      //   border: "1px solid #f44336",
      //   padding: "16px",
      color: "#f44336",
    },
    iconTheme: {
      primary: "#f44336",
      secondary: "#FFFFFF",
    },
  });
};

const showInfoToast = (message: string) => {
  toast(message, {
    id: message,
    style: {
      //   border: "1px solid #2196f3",
      //   padding: "16px",
      color: "#2196f3",
    },
    iconTheme: {
      primary: "#2196f3",
      secondary: "#FFFFFF",
    },
  });
};

// Exporting the utility functions
const toastUtils = {
  success: showSuccessToast,
  error: showErrorToast,
  info: showInfoToast,
};

export default toastUtils;
