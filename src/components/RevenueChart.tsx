import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { MoreVertical, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';

const data = [
  { month: 'Jan', value: 15 },
  { month: 'Feb', value: 25 },
  { month: 'Mar', value: 20 },
  { month: 'Apr', value: 30 },
  { month: 'May', value: 25 },
  { month: 'Jun', value: 20 },
  { month: 'Jul', value: 15 },
  { month: 'Aug', value: 95 },
  { month: 'Sep', value: 30 },
  { month: 'Oct', value: 25 },
  { month: 'Nov', value: 20 },
  { month: 'Dec', value: 15 },
];

export function RevenueChart() {
  return (
    <Card className="p-6 border-0 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-white">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="font-semibold text-[16px] text-[#2E3A59] mb-3">Revenue Insights</h2>
          <div className="flex items-center gap-4 text-[13px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF6B6B] rounded-full"></span>
              <span className="text-gray-600 font-medium">Earnings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-gray-300 rounded-full"></span>
              <span className="text-gray-600 font-medium">Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-gray-200 rounded-full"></span>
              <span className="text-gray-600 font-medium">Net Cost</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-gray-200 rounded-[10px] overflow-hidden bg-white shadow-sm">
            <button className="px-3.5 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Monthly
            </button>
            <button className="px-3.5 py-1.5 text-[13px] font-medium bg-[#2E3A59] text-white">
              Yearly
            </button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[8px] hover:bg-gray-100">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-baseline gap-2">
          <span className="text-[32px] font-semibold text-[#2E3A59]">$5,567.00</span>
          <span className="text-[13px] text-red-500 flex items-center gap-1 font-semibold mb-1">
            <TrendingDown className="w-3.5 h-3.5" strokeWidth={2.5} />
            1.5%
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 30, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 500 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 500 }}
            ticks={[0, 10, 20, 30]}
            tickFormatter={(value) => `${value}k`}
          />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={32}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.month === 'Aug' ? '#FF6B6B' : '#E5E7EB'} 
              />
            ))}
            <LabelList 
              dataKey="value" 
              position="top" 
              formatter={(value: number) => value === 95 ? `${value}k` : ''}
              style={{ fill: '#FF6B6B', fontSize: 13, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
