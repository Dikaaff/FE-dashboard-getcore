import { useState } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, UserPlus, RefreshCw, Send, Headphones } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { cn } from './ui/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon?: 'user' | 'refresh' | 'send' | 'check' | 'alert' | 'ticket';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Tiket Baru Masuk',
    message: 'TKT-2024-001: API Integration Error dari Ahmad Rifai',
    timestamp: '2 minutes ago',
    read: false,
    icon: 'ticket',
  },
  {
    id: '2',
    type: 'info',
    title: 'Update pada Tiket #TKT-2024-002',
    message: 'Customer membalas tiket Dashboard tidak menampilkan data',
    timestamp: '10 minutes ago',
    read: false,
    icon: 'ticket',
  },
  {
    id: '3',
    type: 'success',
    title: 'Customer Added',
    message: 'New customer "Budi Santoso" has been added successfully',
    timestamp: '15 minutes ago',
    read: false,
    icon: 'user',
  },
  {
    id: '4',
    type: 'info',
    title: 'Plan Updated',
    message: 'Siti Aminah upgraded to Corporate Enterprise plan',
    timestamp: '15 minutes ago',
    read: false,
    icon: 'refresh',
  },
  {
    id: '5',
    type: 'success',
    title: 'Team Member Invited',
    message: 'Invitation sent to newstaff@getcore.com',
    timestamp: '30 minutes ago',
    read: false,
    icon: 'user',
  },
  {
    id: '6',
    type: 'success',
    title: 'Broadcast Sent',
    message: 'Monthly newsletter sent to 847 customers',
    timestamp: '1 hour ago',
    read: false,
    icon: 'send',
  },
  {
    id: '7',
    type: 'warning',
    title: 'AI Agent Disconnected',
    message: 'Telegram Support agent has been disconnected',
    timestamp: '2 hours ago',
    read: true,
    icon: 'alert',
  },
  {
    id: '8',
    type: 'info',
    title: 'New Customer Note',
    message: 'Admin added a note to Ahmad Wijaya profile',
    timestamp: '3 hours ago',
    read: true,
  },
  {
    id: '9',
    type: 'success',
    title: 'Label Created',
    message: 'New label "Premium VIP" has been created',
    timestamp: '4 hours ago',
    read: true,
  },
  {
    id: '10',
    type: 'info',
    title: 'System Update',
    message: 'New features are now available in your dashboard',
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: '11',
    type: 'success',
    title: 'Customer Plan Change',
    message: 'Dewi Lestari downgraded from Enterprise to UMKM',
    timestamp: '6 hours ago',
    read: true,
  },
  {
    id: '12',
    type: 'info',
    title: 'Team Activity',
    message: 'Sarah Johnson changed role from Staff to Admin',
    timestamp: '1 day ago',
    read: true,
  },
];

export function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (notification: Notification) => {
    if (notification.icon === 'user') {
      return <UserPlus className="w-4 h-4" />;
    }
    if (notification.icon === 'refresh') {
      return <RefreshCw className="w-4 h-4" />;
    }
    if (notification.icon === 'send') {
      return <Send className="w-4 h-4" />;
    }
    if (notification.icon === 'alert') {
      return <AlertCircle className="w-4 h-4" />;
    }
    if (notification.icon === 'check') {
      return <CheckCircle className="w-4 h-4" />;
    }
    if (notification.icon === 'ticket') {
      return <Headphones className="w-4 h-4" />;
    }

    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      case 'info':
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-amber-600 bg-amber-50';
      case 'info':
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-lg hover:bg-white h-9 w-9 relative transition-all duration-200 hover:shadow-sm active:scale-95"
        >
          <Bell className="w-[17px] h-[17px] text-gray-600" strokeWidth={2} />
          {unreadCount > 0 && (
            <>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#8a25ed] rounded-full animate-pulse"></span>
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center p-0 text-[10px] bg-[#8a25ed] hover:bg-[#8a25ed] border-0">
                {unreadCount}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-96 p-0 rounded-xl shadow-lg border-gray-200/60"
        sideOffset={8}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200/60 flex items-center justify-between">
          <div>
            <h3 className="text-sm text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-500">{unreadCount} unread</p>
            )}
          </div>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-[#8a25ed] hover:text-[#7a1fd4] hover:bg-[#8a25ed]/10 h-7 text-xs rounded-lg"
                >
                  Mark all as read
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No notifications</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[400px]">
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer relative',
                      !notification.read && 'bg-[#8a25ed]/5'
                    )}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    {!notification.read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8a25ed]"></div>
                    )}
                    <div className="flex gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                        getNotificationColor(notification.type)
                      )}>
                        {getNotificationIcon(notification)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className={cn(
                            'text-sm',
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          )}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-[#8a25ed] flex-shrink-0 mt-1.5"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{notification.message}</p>
                        <p className="text-xs text-gray-400">{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-200/60">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="w-full text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs"
              >
                Clear all notifications
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}