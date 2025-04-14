import AppRoutes from "@/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 2500 }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
