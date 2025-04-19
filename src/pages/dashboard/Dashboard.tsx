import FallbackError from "@fallback/FallbackError";
import { useAppDispatch, useAppSelector } from "@store/store";
import { DashboardAPI } from "@store/thunk-services/dashboard.thunk";
import { useEffect } from "react";
import DashboardStats from "./DashboardStats";
import { Skeleton } from "@ui/skeleton";
import { SalesDetailsChart } from "./SalesDetails.chart";
import { RevenueChart } from "./Revenue.chart";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { isDashboardStatsLoading, isDashboardStatsError, dashboardStatsData } =
    useAppSelector(state => state.dashboard);

  useEffect(() => {
    !dashboardStatsData && dispatch(DashboardAPI.getDashboard());
  }, []);

  if (isDashboardStatsError && !isDashboardStatsLoading) {
    return <FallbackError type="something_went_wrong" />;
  }

  return (
    <>
      <h1 className={`text-3xl font-medium mb-6`}>Dashboard</h1>
      {isDashboardStatsLoading ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-6 lg:grid-cols-4">
            {[1, 2, 3, 4].map(item => (
              <Skeleton key={item} className="w-full rounded-md aspect-video" />
            ))}
          </div>
          <Skeleton className="w-full mb-6 aspect-[4/1]" />
          <Skeleton className="w-full  aspect-[4/1]" />
        </>
      ) : (
        <>
          <DashboardStats
            activeUser={dashboardStatsData?.activeUser}
            activeUserChange={dashboardStatsData?.activeUserChange}
            buyersChange={dashboardStatsData?.buyersChange}
            earningChange={dashboardStatsData?.earningChange}
            sellersChange={dashboardStatsData?.sellersChange}
            totalBuyers={dashboardStatsData?.totalBuyers}
            totalEarning={dashboardStatsData?.totalEarning}
            totalSellers={dashboardStatsData?.totalSellers}
          />
          <SalesDetailsChart />
          <RevenueChart />
        </>
      )}
    </>
  );
};

export default Dashboard;
