import { Card } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MoreVertical } from 'lucide-react';
import { Button } from './ui/button';

const data = [
  { name: 'Sales', value: 70.8 },
  { name: 'Other', value: 29.2 },
];

export function SalesOverview() {
  return (
    <Card className="p-6 border-0 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-[16px] text-[#2E3A59]">Sales Overview</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[8px] hover:bg-gray-100">
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </Button>
      </div>

      <div className="relative mb-6">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={65}
              outerRadius={95}
              paddingAngle={0}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#FF6B6B' : '#FFE5E5'} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[36px] font-semibold text-[#2E3A59] leading-none mb-1">70.8%</div>
            <div className="text-[12px] text-gray-500 font-medium">Sales Growth</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3.5 bg-[#FAFBFC] rounded-[12px]">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 bg-[#FF6B6B] rounded-full"></div>
            <span className="text-[14px] text-gray-600 font-medium">Sales</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-[15px] text-[#2E3A59]">$3,884.00</div>
            <div className="text-[11px] text-gray-500">Target $20,000.00</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
