import FallbackNetworkStatus from "@fallback/FallbackNetworkStatus";
import useNetworkStatus from "@hooks/useNetworkStatus";
import React from "react";

interface IProviderNetworkStatusProps {
  children: React.ReactNode;
}

const ProviderNetworkStatus = ({ children }: IProviderNetworkStatusProps) => {
  const { isOnline } = useNetworkStatus();
  if (!isOnline) return <FallbackNetworkStatus />;
  return <>{children}</>;
};

export default ProviderNetworkStatus;
