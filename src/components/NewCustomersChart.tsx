import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Calendar } from 'lucide-react';

const data = [
  { month: 'Jan', customers: 145 },
  { month: 'Feb', customers: 189 },
  { month: 'Mar', customers: 167 },
  { month: 'Apr', customers: 203 },
  { month: 'May', customers: 178 },
  { month: 'Jun', customers: 195 },
  { month: 'Jul', customers: 224 },
  { month: 'Aug', customers: 184 },
];

export function NewCustomersChart() {
  const maxValue = Math.max(...data.map(d => d.customers));

  return (
    <Card className="p-5 border border-gray-200/60 rounded-xl bg-white transition-all duration-300 hover:shadow-lg hover:border-[#8a25ed]/20 hover:-translate-y-0.5 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="font-semibold text-sm text-gray-900 mb-0.5 group-hover:text-[#8a25ed] transition-colors">
            New Customers per Month
          </h2>
          <p className="text-xs text-gray-500">Monthly new customer acquisition</p>
        </div>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95">
          <Calendar className="w-3.5 h-3.5 text-gray-600" strokeWidth={2} />
          <span className="text-xs font-medium text-gray-700">2025</span>
        </button>
      </div>

      <div className="mb-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-semibold text-gray-900 group-hover:text-[#8a25ed] transition-colors">
            184
          </span>
          <span className="text-xs text-gray-500">this month</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
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
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              fontSize: '12px'
            }}
            cursor={{ fill: 'rgba(138, 37, 237, 0.05)' }}
          />
          <Bar 
            dataKey="customers" 
            radius={[8, 8, 0, 0]} 
            maxBarSize={40}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.customers === maxValue ? '#8a25ed' : '#e9d5ff'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95">
          <p className="text-[10px] text-gray-600 mb-0.5">Avg/Month</p>
          <p className="text-sm font-semibold text-gray-900">188</p>
        </div>
        <div className="text-center p-2 bg-[#8a25ed]/10 rounded-lg hover:bg-[#8a25ed]/20 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95">
          <p className="text-[10px] text-[#8a25ed] mb-0.5">Highest</p>
          <p className="text-sm font-semibold text-[#8a25ed]">224</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95">
          <p className="text-[10px] text-gray-600 mb-0.5">Lowest</p>
          <p className="text-sm font-semibold text-gray-900">145</p>
        </div>
        <div className="text-center p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95">
          <p className="text-[10px] text-green-600 mb-0.5">Growth</p>
          <p className="text-sm font-semibold text-green-600">+27%</p>
        </div>
      </div>
    </Card>
  );
}
