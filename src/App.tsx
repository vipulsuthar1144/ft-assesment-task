import AppRoutes from "@/routes";
import { Toaster } from "react-hot-toast";
import ProviderNetworkStatus from "./componets/ProviderNetworkStatus";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary fallback={<>Something wents wrong</>}>
      <ProviderNetworkStatus>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ duration: 2500 }}
        />
        <AppRoutes />
      </ProviderNetworkStatus>
    </ErrorBoundary>
  );
}

export default App;
