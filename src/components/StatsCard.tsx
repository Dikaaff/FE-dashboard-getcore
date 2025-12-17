import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { cn } from './ui/utils';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  accentColor: boolean;
}

export function StatsCard({ title, value, subtitle, change, trend, icon: Icon, accentColor }: StatsCardProps) {
  return (
    <Card className={cn(
      "p-4 border rounded-xl transition-all duration-300 cursor-pointer group",
      accentColor 
        ? "bg-gradient-to-br from-[#8a25ed] to-[#a855f7] text-white border-transparent hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]" 
        : "bg-white border-gray-200/60 hover:shadow-lg hover:border-[#8a25ed]/20 hover:-translate-y-0.5 active:translate-y-0"
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "p-2 rounded-lg transition-all duration-300 group-hover:scale-110",
          accentColor 
            ? "bg-white/20 group-hover:bg-white/30" 
            : "bg-[#8a25ed]/10 group-hover:bg-[#8a25ed]/20"
        )}>
          <Icon 
            className={cn(
              "w-4 h-4 transition-all duration-300",
              accentColor ? "text-white" : "text-[#8a25ed] group-hover:scale-110"
            )} 
            strokeWidth={2} 
          />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium transition-all duration-300",
          accentColor 
            ? "text-white/90" 
            : trend === 'up' 
              ? "text-green-600 group-hover:scale-110" 
              : "text-red-600 group-hover:scale-110"
        )}>
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3" strokeWidth={2} />
          ) : (
            <TrendingDown className="w-3 h-3" strokeWidth={2} />
          )}
          <span>{change}</span>
        </div>
      </div>
      
      <div>
        <p className={cn(
          "text-xs mb-1 font-medium transition-colors",
          accentColor ? "text-white/70" : "text-gray-600"
        )}>
          {title}
        </p>
        <p className={cn(
          "text-2xl font-semibold mb-1 transition-all duration-300",
          accentColor ? "text-white" : "text-gray-900 group-hover:text-[#8a25ed]"
        )}>
          {value}
        </p>
        <p className={cn(
          "text-[11px]",
          accentColor ? "text-white/60" : "text-gray-500"
        )}>
          {subtitle}
        </p>
      </div>
    </Card>
  );
}
