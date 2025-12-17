import { Home, Ticket, ShoppingBag, Bot, Activity, Settings, X, User, Menu, CreditCard } from 'lucide-react';
import { cn } from './ui/utils';
import logoIcon from 'figma:asset/eab31c85a652a99b3530a2e0cac28524aca91b36.png';
import logoText from 'figma:asset/91baf29c75205776c9677c686dcc0a8b96ca505b.png';

type UserPage = 'dashboard' | 'tickets' | 'shop' | 'assistant' | 'activity' | 'billing' | 'profile' | 'settings';

interface UserSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: UserPage;
  onNavigate: (page: UserPage) => void;
}

export function UserSidebar({ isOpen, onToggle, currentPage, onNavigate }: UserSidebarProps) {
  const menuItems = [
    { id: 'dashboard' as UserPage, label: 'Welcome', icon: Home },
    { id: 'tickets' as UserPage, label: 'My Tickets', icon: Ticket },
    { id: 'shop' as UserPage, label: 'Shop', icon: ShoppingBag },
    { id: 'assistant' as UserPage, label: 'GetCore Assistant', icon: Bot },
    { id: 'activity' as UserPage, label: 'Activity Log', icon: Activity },
  ];

  const bottomItems = [
    { id: 'profile' as UserPage, label: 'Profile', icon: User },
    { id: 'settings' as UserPage, label: 'Settings', icon: Settings },
    { id: 'billing' as UserPage, label: 'Billing', icon: CreditCard },
  ];

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-white border-r border-gray-200/60 z-50 transition-all duration-300 flex flex-col shadow-xl lg:shadow-none',
          isOpen ? 'w-64' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'
        )}
      >
        {/* Header / Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200/40 flex-shrink-0">
          <div className={cn(
            'flex items-center gap-3 transition-opacity duration-300',
            !isOpen && 'lg:opacity-0 lg:w-0 lg:overflow-hidden'
          )}>
            <img src={logoIcon} alt="GetCore" className="w-10 h-10" />
            <span className="text-xl text-gray-900">GetCore</span>
          </div>
          
          {!isOpen && (
            <div className="hidden lg:flex w-full justify-center">
              <img src={logoIcon} alt="GetCore" className="w-10 h-10" />
            </div>
          )}

          {/* Toggle Button for Mobile */}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Toggle Button for Desktop - shown when sidebar is open */}
          {isOpen && (
            <button
              onClick={onToggle}
              className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Main Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative',
                    isActive
                      ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon 
                    className={cn(
                      'w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110',
                      isActive && 'text-[#8a25ed]'
                    )} 
                    strokeWidth={2}
                  />
                  <span className={cn(
                    'text-sm transition-opacity duration-300',
                    !isOpen && 'lg:opacity-0 lg:w-0 lg:overflow-hidden'
                  )}>
                    {item.label}
                  </span>
                  
                  {!isOpen && (
                    <div className="hidden lg:block absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Menu (Profile & Settings) */}
        <div className="px-3 py-4 border-t border-gray-200/40 flex-shrink-0">
          <div className="space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative',
                    isActive
                      ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon 
                    className={cn(
                      'w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110',
                      isActive && 'text-[#8a25ed]'
                    )} 
                    strokeWidth={2}
                  />
                  <span className={cn(
                    'text-sm transition-opacity duration-300',
                    !isOpen && 'lg:opacity-0 lg:w-0 lg:overflow-hidden'
                  )}>
                    {item.label}
                  </span>
                  
                  {!isOpen && (
                    <div className="hidden lg:block absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Collapse Button - shown when sidebar is collapsed */}
        {!isOpen && (
          <div className="hidden lg:block px-3 py-3 border-t border-gray-200/40 flex-shrink-0">
            <button
              onClick={onToggle}
              className="w-full p-3 hover:bg-gray-100 rounded-xl transition-colors group relative"
            >
              <Menu className="w-5 h-5 text-gray-600 mx-auto" />
              <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                Expand
              </div>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}