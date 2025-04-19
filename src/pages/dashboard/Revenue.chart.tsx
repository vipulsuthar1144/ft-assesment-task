import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = Array.from({ length: 30 }, (_, i) => ({
  name: `${10 * (i + 1)}k`,
  income: Math.floor(Math.random() * 60) + 10,
  expense: Math.floor(Math.random() * 80) + 10,
}));

export function RevenueChart() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-md mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Revenue</h2>
        <select className="border px-2 py-1 rounded text-sm">
          <option>October</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#f43f5e"
            fill="url(#colorIncome)"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#a855f7"
            fill="url(#colorExpense)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
