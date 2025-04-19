import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salesData = Array.from({ length: 40 }, (_, i) => ({
  name: `${5 * (i + 1)}k`,
  value: Math.floor(Math.random() * 60) + 20,
}));

export function SalesDetailsChart() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Sales Details</h2>
        <select className="border px-2 py-1 rounded text-sm">
          <option>October</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={salesData}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} tickFormatter={tick => `${tick}%`} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4f46e5"
            fill="url(#colorSales)"
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
