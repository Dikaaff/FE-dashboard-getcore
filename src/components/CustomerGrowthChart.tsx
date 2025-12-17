import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { month: 'Jan', customers: 1200 },
  { month: 'Feb', customers: 1450 },
  { month: 'Mar', customers: 1680 },
  { month: 'Apr', customers: 1890 },
  { month: 'May', customers: 2150 },
  { month: 'Jun', customers: 2340 },
  { month: 'Jul', customers: 2580 },
  { month: 'Aug', customers: 2847 },
];

export function CustomerGrowthChart() {
  return (
    <Card className="p-5 border border-gray-200/60 rounded-xl bg-white transition-all duration-300 hover:shadow-lg hover:border-[#8a25ed]/20 hover:-translate-y-0.5 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="font-semibold text-sm text-gray-900 mb-0.5 group-hover:text-[#8a25ed] transition-colors">
            Customer Growth
          </h2>
          <p className="text-xs text-gray-500">Total customers over time</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-[#8a25ed]/10 rounded-md group-hover:bg-[#8a25ed]/20 transition-all duration-300 group-hover:scale-105">
          <TrendingUp className="w-3 h-3 text-[#8a25ed]" strokeWidth={2} />
          <span className="text-xs font-medium text-[#8a25ed]">+18.2%</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-semibold text-gray-900 group-hover:text-[#8a25ed] transition-colors">
            2,847
          </span>
          <span className="text-xs text-gray-500">total customers</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8a25ed" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#8a25ed" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 11 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 11 }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              fontSize: '12px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="customers" 
            stroke="#8a25ed" 
            strokeWidth={2}
            fill="url(#colorCustomers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
