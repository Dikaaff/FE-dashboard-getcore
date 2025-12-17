import { Card } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Premium', value: 845, color: '#8a25ed' },
  { name: 'Standard', value: 1234, color: '#a855f7' },
  { name: 'Basic', value: 567, color: '#c084fc' },
  { name: 'Trial', value: 201, color: '#e9d5ff' },
];

const COLORS = data.map(item => item.color);

export function LabelDistributionChart() {
  return (
    <Card className="p-5 border border-gray-200/60 rounded-xl bg-white transition-all duration-300 hover:shadow-lg hover:border-[#8a25ed]/20 hover:-translate-y-0.5 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="font-semibold text-sm text-gray-900 mb-0.5 group-hover:text-[#8a25ed] transition-colors">
            Label Distribution
          </h2>
          <p className="text-xs text-gray-500">Customer segments breakdown</p>
        </div>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px', 
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-xl font-semibold text-gray-900 group-hover:text-[#8a25ed] transition-colors">
              2,847
            </div>
            <div className="text-[10px] text-gray-500">Total</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-1.5">
              <div 
                className="w-2 h-2 rounded-full transition-all duration-200" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-700">{item.name}</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
