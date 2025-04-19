import AppRoutes from "@/routes";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import ProviderNetworkStatus from "@components/ProviderNetworkStatus";
import FallbackErrorBoundary from "@fallback/FallbackErrorBoundary";
import { Provider } from "react-redux";
import { store } from "@store/store";

function App() {
  return (
    <ErrorBoundary fallback={<FallbackErrorBoundary />}>
      <Provider store={store}>
        <ProviderNetworkStatus>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{ duration: 2500 }}
          />
          <AppRoutes />
        </ProviderNetworkStatus>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
