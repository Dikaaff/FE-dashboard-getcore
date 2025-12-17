import { LayoutDashboard, Users, Radio, Bot, CreditCard, Activity, ChevronLeft, UserCog, Settings as SettingsIcon, Package, Headphones, ChevronDown, Ticket, Trello } from 'lucide-react';
import { cn } from './ui/utils';
import logoIcon from 'figma:asset/eab31c85a652a99b3530a2e0cac28524aca91b36.png';
import logoText from 'figma:asset/91baf29c75205776c9677c686dcc0a8b96ca505b.png';
import { useState } from 'react';

type Page = 'dashboard' | 'customers' | 'team' | 'tickets' | 'ticket-kanban-board' | 'broadcast' | 'agents' | 'activity' | 'billing' | 'profile' | 'settings' | 'assistant' | 'plan-config';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ isOpen, onToggle, currentPage, onNavigate }: SidebarProps) {
  const [ticketMenuOpen, setTicketMenuOpen] = useState(
    currentPage === 'tickets' || 
    currentPage === 'ticket-kanban-board'
  );

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard Overview', page: 'dashboard' as Page },
    { icon: Users, label: 'Customer Management', page: 'customers' as Page },
    { icon: UserCog, label: 'Team Members', page: 'team' as Page },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-screen bg-white border-r border-gray-200/40 transition-all duration-300 z-30 flex flex-col',
          isOpen ? 'w-64' : 'w-0 lg:w-20'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center px-6 border-b border-gray-200/40 flex-shrink-0">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt="GetCore" className="w-8 h-8" />
              <img src={logoText} alt="GetCore" className="h-6" />
            </div>
          ) : (
            <img src={logoIcon} alt="GetCore" className="w-8 h-8 hidden lg:block" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;

            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                  isActive
                    ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                    : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-colors',
                    isActive ? 'text-[#8a25ed]' : 'text-gray-500 group-hover:text-gray-700'
                  )}
                  strokeWidth={2}
                />
                {isOpen && (
                  <span className="text-sm truncate">{item.label}</span>
                )}
                {!isOpen && (
                  <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}

          {/* Ticket Management */}
          <button
            onClick={() => setTicketMenuOpen(!ticketMenuOpen)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
              currentPage === 'tickets' || currentPage === 'ticket-kanban-board'
                ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
            )}
          >
            <Headphones
              className={cn(
                'w-5 h-5 flex-shrink-0 transition-colors',
                currentPage === 'tickets' || currentPage === 'ticket-kanban-board'
                  ? 'text-[#8a25ed]'
                  : 'text-gray-500 group-hover:text-gray-700'
              )}
              strokeWidth={2}
            />
            {isOpen && (
              <span className="text-sm">Ticket Management</span>
            )}
            {!isOpen && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Ticket Management
              </div>
            )}
            {isOpen && (
              <ChevronDown
                className={cn(
                  'w-5 h-5 flex-shrink-0 transition-colors',
                  ticketMenuOpen ? 'rotate-180' : 'rotate-0'
                )}
                strokeWidth={2}
              />
            )}
          </button>

          {ticketMenuOpen && (
            <div className="pl-8">
              <button
                onClick={() => onNavigate('tickets')}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                  currentPage === 'tickets'
                    ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                    : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                )}
              >
                <Ticket
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-colors',
                    currentPage === 'tickets' ? 'text-[#8a25ed]' : 'text-gray-500 group-hover:text-gray-700'
                  )}
                  strokeWidth={2}
                />
                {isOpen && (
                  <span className="text-sm">Tickets</span>
                )}
                {!isOpen && (
                  <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    Tickets
                  </div>
                )}
              </button>

              <button
                onClick={() => onNavigate('ticket-kanban-board')}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                  currentPage === 'ticket-kanban-board'
                    ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                    : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                )}
              >
                <Trello
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-colors',
                    currentPage === 'ticket-kanban-board' ? 'text-[#8a25ed]' : 'text-gray-500 group-hover:text-gray-700'
                  )}
                  strokeWidth={2}
                />
                {isOpen && (
                  <span className="text-sm">Kanban Board</span>
                )}
                {!isOpen && (
                  <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    Kanban Board
                  </div>
                )}
              </button>
            </div>
          )}

          {/* Other menu items */}
          <button
            onClick={() => onNavigate('broadcast')}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
              currentPage === 'broadcast'
                ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
            )}
          >
            <Radio
              className={cn(
                'w-5 h-5 flex-shrink-0 transition-colors',
                currentPage === 'broadcast' ? 'text-[#8a25ed]' : 'text-gray-500 group-hover:text-gray-700'
              )}
              strokeWidth={2}
            />
            {isOpen && (
              <span className="text-sm">Broadcast</span>
            )}
            {!isOpen && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Broadcast
              </div>
            )}
          </button>

          <button
            onClick={() => onNavigate('agents')}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
              currentPage === 'agents'
                ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
            )}
          >
            <Bot
              className={cn(
                'w-5 h-5 flex-shrink-0 transition-colors',
                currentPage === 'agents' ? 'text-[#8a25ed]' : 'text-gray-500 group-hover:text-gray-700'
              )}
              strokeWidth={2}
            />
            {isOpen && (
              <span className="text-sm">AI Agents</span>
            )}
            {!isOpen && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                AI Agents
              </div>
            )}
          </button>

          <button
            onClick={() => onNavigate('plan-config')}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
              currentPage === 'plan-config'
                ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
            )}
          >
            <Package
              className={cn(
                'w-5 h-5 flex-shrink-0 transition-colors',
                currentPage === 'plan-config' ? 'text-[#8a25ed]' : 'text-gray-500 group-hover:text-gray-700'
              )}
              strokeWidth={2}
            />
            {isOpen && (
              <span className="text-sm">Plan Config</span>
            )}
            {!isOpen && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Plan Config
              </div>
            )}
          </button>

          <button
            onClick={() => onNavigate('billing')}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
              currentPage === 'billing'
                ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
            )}
          >
            <CreditCard
              className={cn(
                'w-5 h-5 flex-shrink-0 transition-colors',
                currentPage === 'billing' ? 'text-[#8a25ed]' : 'text-gray-500 group-hover:text-gray-700'
              )}
              strokeWidth={2}
            />
            {isOpen && (
              <span className="text-sm">Billing & Subscription</span>
            )}
            {!isOpen && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Billing & Subscription
              </div>
            )}
          </button>

          <button
            onClick={() => onNavigate('activity')}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
              currentPage === 'activity'
                ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
            )}
          >
            <Activity
              className={cn(
                'w-5 h-5 flex-shrink-0 transition-colors',
                currentPage === 'activity' ? 'text-[#8a25ed]' : 'text-gray-500 group-hover:text-gray-700'
              )}
              strokeWidth={2}
            />
            {isOpen && (
              <span className="text-sm">Activity Log</span>
            )}
            {!isOpen && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Activity Log
              </div>
            )}
          </button>
        </nav>

        {/* Settings at bottom */}
        <div className="px-4 py-4 border-t border-gray-200/40 flex-shrink-0">
          <button
            onClick={() => onNavigate('settings')}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
              currentPage === 'settings'
                ? 'bg-[#8a25ed]/10 text-[#8a25ed]'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
            )}
          >
            <SettingsIcon
              className={cn(
                'w-5 h-5 flex-shrink-0 transition-colors',
                currentPage === 'settings' ? 'text-[#8a25ed]' : 'text-gray-500 group-hover:text-gray-700'
              )}
              strokeWidth={2}
            />
            {isOpen && (
              <span className="text-sm">Settings</span>
            )}
            {!isOpen && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Settings
              </div>
            )}
          </button>
        </div>

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200/60 rounded-full items-center justify-center hover:bg-gray-50 transition-colors shadow-sm z-40"
        >
          <ChevronLeft
            className={cn(
              'w-4 h-4 text-gray-600 transition-transform duration-300',
              !isOpen && 'rotate-180'
            )}
          />
        </button>
      </aside>
    </>
  );
}