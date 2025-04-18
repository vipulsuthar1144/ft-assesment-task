import AppRoutes from "@/routes";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import ProviderNetworkStatus from "@components/ProviderNetworkStatus";
import FallbackErrorBoundary from "@fallback/FallbackErrorBoundary";

function App() {
  return (
    <ErrorBoundary fallback={<FallbackErrorBoundary />}>
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
