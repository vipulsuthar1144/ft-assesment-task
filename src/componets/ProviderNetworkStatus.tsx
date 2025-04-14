import useNetworkStatus from "@hooks/useNetworkStatus";
import React from "react";

interface IProviderNetworkStatusProps {
  children: React.ReactNode;
}

const ProviderNetworkStatus = ({ children }: IProviderNetworkStatusProps) => {
  const { isOnline } = useNetworkStatus();

  if (!isOnline)
    return (
      <div
        style={{
          width: "100%",
          height: "100svh",
          backgroundColor: "black",
          color: "red",
        }}
      >
        Netwok Error
      </div>
    );

  return <>{children}</>;
};

export default ProviderNetworkStatus;
