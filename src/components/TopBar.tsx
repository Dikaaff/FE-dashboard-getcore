import { Search, Menu, User, LogOut, ChevronDown, CreditCard, Bot, Package, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { NotificationPanel } from './NotificationPanel';
import { toast } from 'sonner@2.0.3';

type Page = 'dashboard' | 'customers' | 'team' | 'tickets' | 'broadcast' | 'agents' | 'activity' | 'billing' | 'profile' | 'settings' | 'assistant' | 'plan-config' | 'shop';

interface TopBarProps {
  onMenuClick: () => void;
  onNavigate?: (page: Page) => void;
  onLogout?: () => void;
}

export function TopBar({ onMenuClick, onNavigate, onLogout }: TopBarProps) {
  const handleLogout = () => {
    toast.success('Logged out successfully!');
    onLogout?.();
  };

  return (
    <header className="bg-[#f7f7f7] px-6 py-4 border-b border-gray-200/40">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="flex-1 flex items-center gap-3">
          {/* Shop CTA Button */}
          <Button
            onClick={() => onNavigate?.('shop')}
            className="hidden md:flex bg-[#8a25ed] hover:bg-[#7a1fd9] text-white gap-2 h-9"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={2} />
            Shop
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-hover:text-gray-600" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-72 pl-9 pr-4 py-2 bg-white border border-gray-200/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all hover:border-gray-300 hover:shadow-sm"
            />
          </div>

          {/* Notifications */}
          <NotificationPanel />

          {/* Getcore Assistant Button */}
          <Button
            onClick={() => onNavigate?.('assistant')}
            className="bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white gap-2 relative group shadow-lg shadow-[#8a25ed]/20"
          >
            <div className="relative flex items-center gap-2">
              <Bot className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">Getcore Assistant</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-sm" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-white rounded-lg px-2 py-1.5 transition-all duration-200 hover:shadow-sm group">
                <Avatar className="w-8 h-8 border-2 border-gray-200/60 group-hover:border-[#8a25ed]/30 transition-colors">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback className="bg-[#8a25ed] text-white text-xs">AU</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-xs text-gray-900">Adminit User</p>
                  <p className="text-xs text-gray-500">admin@getcore.id</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors hidden lg:block" strokeWidth={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs">
                <p className="text-sm text-gray-900">Adminit User</p>
                <p className="text-xs text-gray-500 mt-0.5">admin@getcore.id</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onNavigate?.('profile')}
                className="cursor-pointer text-sm"
              >
                <User className="mr-2 h-4 w-4" strokeWidth={2} />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-sm text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" strokeWidth={2} />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}