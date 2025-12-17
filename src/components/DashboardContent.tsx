import { Users, UserPlus, PieChart } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { CustomerGrowthChart } from './CustomerGrowthChart';
import { LabelDistributionChart } from './LabelDistributionChart';
import { NewCustomersChart } from './NewCustomersChart';

export function DashboardContent() {
  return (
    <div className="px-6 py-6 space-y-6">
      {/* Page Title */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here's what's happening with your customers today.
        </p>
      </div>

      {/* Metric Cards - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <StatsCard
          title="Total Pelanggan"
          value="2,847"
          subtitle="Active customers"
          change="+12.5%"
          trend="up"
          icon={Users}
          accentColor={false}
        />
        <StatsCard
          title="Pelanggan Baru Bulan Ini"
          value="184"
          subtitle="New this month"
          change="+23.8%"
          trend="up"
          icon={UserPlus}
          accentColor={true}
        />
        <StatsCard
          title="Segmentasi Pelanggan"
          value="12"
          subtitle="Active segments"
          change="+2"
          trend="up"
          icon={PieChart}
          accentColor={false}
        />
      </div>

      {/* Chart Visualizations - 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <CustomerGrowthChart />
        <LabelDistributionChart />
      </div>

      {/* New Customers Chart - Full Width */}
      <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <NewCustomersChart />
      </div>
    </div>
  );
}
