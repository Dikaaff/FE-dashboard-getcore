import { Card } from './ui/card';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const salesData = [
  {
    orderId: '789001',
    date: '2 Dec 2025',
    customer: 'Oliver John Brown',
    category: 'Shoes, Shirt',
    status: 'Pending',
    items: '2 Items',
    total: '$789.00',
    statusColor: 'pending'
  },
  {
    orderId: '789002',
    date: '1 Dec 2025',
    customer: 'Noah James Smith',
    category: 'Sneakers, T-shirt',
    status: 'Complete',
    items: '3 Items',
    total: '$99.00',
    statusColor: 'complete'
  },
  {
    orderId: '789003',
    date: '30 Nov 2025',
    customer: 'Emma Wilson Davis',
    category: 'Dress, Bag',
    status: 'Complete',
    items: '2 Items',
    total: '$456.00',
    statusColor: 'complete'
  },
  {
    orderId: '789004',
    date: '29 Nov 2025',
    customer: 'Liam Michael Brown',
    category: 'Jacket, Jeans',
    status: 'Pending',
    items: '4 Items',
    total: '$1,234.00',
    statusColor: 'pending'
  },
];

export function RecentSales() {
  return (
    <Card className="p-6 border-0 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="font-semibold text-[16px] text-[#2E3A59]">Recent Sales</h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[16px] h-[16px] text-gray-400" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-[10px] text-[13px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 w-full sm:w-44 bg-white font-medium"
            />
          </div>
          <Button variant="outline" className="gap-1.5 h-9 rounded-[10px] border-gray-200 bg-white text-[13px] font-medium px-3.5 hover:bg-gray-50">
            All Category
            <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-[10px] border-gray-200 bg-white hover:bg-gray-50">
            <SlidersHorizontal className="w-[16px] h-[16px]" strokeWidth={2} />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3.5 px-3 text-[13px] text-gray-600 font-semibold">Order Id</th>
              <th className="text-left py-3.5 px-3 text-[13px] text-gray-600 font-semibold">Date</th>
              <th className="text-left py-3.5 px-3 text-[13px] text-gray-600 font-semibold">Customer</th>
              <th className="text-left py-3.5 px-3 text-[13px] text-gray-600 font-semibold">Category</th>
              <th className="text-left py-3.5 px-3 text-[13px] text-gray-600 font-semibold">Status</th>
              <th className="text-left py-3.5 px-3 text-[13px] text-gray-600 font-semibold">Items</th>
              <th className="text-left py-3.5 px-3 text-[13px] text-gray-600 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-3 text-[13px] text-[#2E3A59] font-medium">#{sale.orderId}</td>
                <td className="py-4 px-3 text-[13px] text-gray-600">{sale.date}</td>
                <td className="py-4 px-3 text-[13px] text-[#2E3A59] font-medium">{sale.customer}</td>
                <td className="py-4 px-3 text-[13px] text-gray-600">{sale.category}</td>
                <td className="py-4 px-3">
                  <Badge 
                    className={`${
                      sale.statusColor === 'pending' 
                        ? 'bg-[#FFF4E6] text-[#FF9500] hover:bg-[#FFF4E6]' 
                        : 'bg-[#E8F5E9] text-[#4CAF50] hover:bg-[#E8F5E9]'
                    } border-0 font-medium text-[12px] px-3 py-1 rounded-full`}
                  >
                    {sale.status}
                  </Badge>
                </td>
                <td className="py-4 px-3 text-[13px] text-gray-600">{sale.items}</td>
                <td className="py-4 px-3 text-[13px] font-semibold text-[#2E3A59]">{sale.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
