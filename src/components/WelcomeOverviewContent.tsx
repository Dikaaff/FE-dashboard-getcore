import { Ticket, ShoppingBag, Bot, Activity, Package } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeOverviewContentProps {
  onNavigate?: (page: string) => void;
}

export function WelcomeOverviewContent({ onNavigate }: WelcomeOverviewContentProps) {
  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header - Simple & Clean */}
      <div className="mb-2">
        <p className="text-sm text-gray-500 mb-1">Welcome back,</p>
        <h1 className="text-2xl text-gray-900">Selamat datang kembali di GetCore! 🎉</h1>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-200/60 p-8 shadow-sm">
        <h2 className="text-xl text-gray-900 mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() => onNavigate?.('tickets')}
            className="bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white justify-start gap-3 h-14 shadow-lg shadow-[#8a25ed]/20"
          >
            <Ticket className="w-5 h-5" strokeWidth={2} />
            Buat Tiket Baru
          </Button>

          <Button
            onClick={() => onNavigate?.('shop')}
            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 justify-start gap-3 h-14 hover:border-[#8a25ed]"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={2} />
            Buka Shop
          </Button>

          <Button
            onClick={() => onNavigate?.('assistant')}
            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 justify-start gap-3 h-14 hover:border-[#8a25ed]"
          >
            <Bot className="w-5 h-5" strokeWidth={2} />
            GetCore Assistant
          </Button>

          <Button
            onClick={() => onNavigate?.('activity')}
            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 justify-start gap-3 h-14 hover:border-[#8a25ed]"
          >
            <Activity className="w-5 h-5" strokeWidth={2} />
            Lihat Activity
          </Button>
        </div>
      </div>

      {/* Upgrade Suggestion */}
      <div className="bg-gradient-to-br from-[#8a25ed]/10 to-purple-100 rounded-2xl border-2 border-[#8a25ed]/30 p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-[#8a25ed] to-[#6a1fb3] rounded-2xl flex items-center justify-center shadow-lg">
              <Package className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl text-gray-900 mb-2">Upgrade to Professional</h3>
            <p className="text-gray-700">
              Dapatkan unlimited AI chat & priority support
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button
              onClick={() => onNavigate?.('shop')}
              className="bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white h-12 px-8 shadow-lg shadow-[#8a25ed]/20"
            >
              Lihat Paket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}