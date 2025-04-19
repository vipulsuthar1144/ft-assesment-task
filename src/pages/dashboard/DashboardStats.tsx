import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IDashboardSchema } from "@schemas/dashboard.schema";
import {
    ArrowDownRight,
    ArrowUpLeft,
    LineChart,
    Package,
    Timer,
    Users,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
  positive?: boolean;
  note: string;
  color: string;
}

const StatCard = ({
  title,
  value,
  icon,
  change,
  positive = true,
  color = "gray",
}: StatCardProps) => {
  return (
    <Card className="w-full max-w-xs shadow-md">
      <CardContent className="flex flex-col items-start gap-4">
        <div className="w-full flex gap-5 items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground font-medium">
              {title}
            </div>
            <div className="text-2xl font-bold">{value}</div>
          </div>
          <div
            className={`p-3 rounded-2xl bg-${color}-100 text-${color}-400 flex items-center justify-center`}
          >
            {icon}
          </div>
        </div>
        <div
          className={cn(
            "text-xs md:text-xs lg:text-sm flex items-center gap-1",
            positive ? "text-emerald-600" : "text-rose-600"
          )}
        >
          {positive ? (
            <ArrowUpLeft className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          <span>{change}</span>
          {/* <span className="text-muted-foreground">{note}</span> */}
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats = ({
  activeUser = 10,
  activeUserChange = "1.8",
  totalBuyers = 50,
  buyersChange = "7.5",
  totalSellers = 5,
  sellersChange = "8.9",
  totalEarning = "10",
  earningChange = "34",
}: IDashboardSchema) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 mb-6 md:grid-cols-3 lg:grid-cols-4">
      <StatCard
        title="Active Users"
        value={activeUser}
        icon={<Users className="text-purple-500 bg-purple-100" />}
        change={activeUserChange}
        note="Up from yesterday"
        positive={activeUserChange.includes("Up") ? true : false}
        color="purple"
      />
      <StatCard
        title="Total Buyers"
        value={totalBuyers}
        icon={<Package className="text-yellow-500 bg-yellow-100" />}
        change={buyersChange}
        note="Up from past week"
        positive={buyersChange.includes("Up") ? true : false}
        color="yellow"
      />
      <StatCard
        title="Total Sellers"
        value={totalSellers}
        icon={<Timer className="text-red-400 bg-red-100" />}
        change={sellersChange}
        note="Up from yesterday"
        positive={sellersChange.includes("Up") ? true : false}
        color="red"
      />
      <StatCard
        title="Total Sales"
        value={`$${totalEarning}`}
        icon={<LineChart className="text-green-400 bg-green-100" />}
        change={earningChange}
        note="Down from yesterday"
        positive={earningChange.includes("Up") ? true : false}
        color="green"
      />
    </div>
  );
};

export default DashboardStats;
