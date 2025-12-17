import { useState } from 'react';
import { ArrowLeft, Clock, AlertCircle, CheckCircle2, User, Calendar, Tag, Paperclip, Send, FileText, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from './ui/utils';
import { toast } from 'sonner@2.0.3';

type Priority = 'low' | 'medium' | 'high';
type Status = 'open' | 'pending' | 'resolved';

interface Activity {
  id: string;
  type: 'reply' | 'status_change' | 'priority_change' | 'note';
  author: string;
  authorEmail: string;
  content: string;
  timestamp: Date;
  metadata?: {
    oldValue?: string;
    newValue?: string;
  };
}

interface TicketDetailContentProps {
  ticketId: string;
  onBack: () => void;
}

export function TicketDetailContent({ ticketId, onBack }: TicketDetailContentProps) {
  const [status, setStatus] = useState<Status>('open');
  const [priority, setPriority] = useState<Priority>('high');
  const [replyMessage, setReplyMessage] = useState('');
  const [noteMessage, setNoteMessage] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  // Mock ticket data
  const ticket = {
    id: ticketId,
    ticketNumber: 'TKT-2024-001',
    reporterName: 'Ahmad Rifai',
    reporterEmail: 'ahmad.rifai@customer.com',
    category: 'technical',
    priority: priority,
    status: status,
    subject: 'API Integration Error - Payment Gateway',
    description: 'Halo team GetCore,\n\nSaya mengalami error saat mencoba integrasi payment gateway di sistem kami. Error muncul ketika customer mencoba melakukan pembayaran.\n\nError message: "Gateway connection timeout after 30s"\n\nMohon bantuannya untuk troubleshooting issue ini. Terima kasih!',
    createdAt: new Date('2024-11-25T08:30:00'),
    updatedAt: new Date('2024-11-25T09:45:00'),
    attachments: [
      { name: 'error-screenshot.png', size: '2.4 MB', url: '#' },
      { name: 'api-logs.txt', size: '156 KB', url: '#' },
    ],
  };

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'reply',
      author: 'Support Team',
      authorEmail: 'support@getcore.id',
      content: 'Halo Pak Ahmad, terima kasih sudah melaporkan issue ini. Kami sedang melakukan pengecekan pada API gateway configuration. Mohon ditunggu update-nya ya.',
      timestamp: new Date('2024-11-25T09:15:00'),
    },
    {
      id: '2',
      type: 'status_change',
      author: 'System',
      authorEmail: 'system@getcore.id',
      content: 'Status updated',
      timestamp: new Date('2024-11-25T09:15:30'),
      metadata: { oldValue: 'Open', newValue: 'Pending' },
    },
    {
      id: '3',
      type: 'note',
      author: 'Admin User',
      authorEmail: 'admin@getcore.id',
      content: 'Sudah dicek dengan tim engineering, sepertinya ada issue di payment gateway provider. Sedang koordinasi dengan pihak ketiga.',
      timestamp: new Date('2024-11-25T09:30:00'),
    },
  ]);

  const handleStatusChange = (newStatus: Status) => {
    setStatus(newStatus);
    
    const statusLabels = { open: 'Open', pending: 'Pending', resolved: 'Resolved' };
    const oldStatus = statusLabels[status];
    const newStatusLabel = statusLabels[newStatus];

    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        type: 'status_change',
        author: 'Admin User',
        authorEmail: 'admin@getcore.id',
        content: 'Status updated',
        timestamp: new Date(),
        metadata: { oldValue: oldStatus, newValue: newStatusLabel },
      },
    ]);

    toast.success(`Status updated to ${newStatusLabel}`);
  };

  const handlePriorityChange = (newPriority: Priority) => {
    const oldPriorityLabel = priority.charAt(0).toUpperCase() + priority.slice(1);
    const newPriorityLabel = newPriority.charAt(0).toUpperCase() + newPriority.slice(1);

    setPriority(newPriority);
    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        type: 'priority_change',
        author: 'Admin User',
        authorEmail: 'admin@getcore.id',
        content: 'Priority updated',
        timestamp: new Date(),
        metadata: { oldValue: oldPriorityLabel, newValue: newPriorityLabel },
      },
    ]);

    toast.success(`Priority updated to ${newPriorityLabel}`);
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;

    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        type: 'reply',
        author: 'Admin User',
        authorEmail: 'admin@getcore.id',
        content: replyMessage,
        timestamp: new Date(),
      },
    ]);

    setReplyMessage('');
    
    // Auto update status to pending after reply
    if (status === 'open') {
      handleStatusChange('pending');
    }
    
    toast.success('Reply sent successfully');
  };

  const handleAddNote = () => {
    if (!noteMessage.trim()) return;

    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        type: 'note',
        author: 'Admin User',
        authorEmail: 'admin@getcore.id',
        content: noteMessage,
        timestamp: new Date(),
      },
    ]);

    setNoteMessage('');
    setShowNoteInput(false);
    toast.success('Internal note added');
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'open':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Tickets
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Info */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/40">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-gray-900">{ticket.ticketNumber}</h1>
                  <Badge variant="outline" className={cn('capitalize flex items-center gap-1', getStatusColor(status))}>
                    {getStatusIcon(status)}
                    {status}
                  </Badge>
                </div>
                <h2 className="text-xl text-gray-900">{ticket.subject}</h2>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{ticket.reporterName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDateTime(ticket.createdAt)}</span>
              </div>
              <Badge variant="outline" className={cn('capitalize', getPriorityColor(priority))}>
                {priority} priority
              </Badge>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-gray-700 whitespace-pre-line">{ticket.description}</p>
            </div>

            {/* Attachments */}
            {ticket.attachments.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200/60">
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  Attachments ({ticket.attachments.length})
                </p>
                <div className="space-y-2">
                  {ticket.attachments.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 group-hover:text-[#8a25ed]">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/40">
            <h3 className="text-gray-900 mb-4">Activity & Discussion</h3>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-gray-200/60">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.author}`} />
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                      {activity.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="text-sm text-gray-900">{activity.author}</p>
                          <p className="text-xs text-gray-500">{activity.authorEmail}</p>
                        </div>
                        <span className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                      </div>

                      {activity.type === 'reply' && (
                        <p className="text-sm text-gray-700 whitespace-pre-line">{activity.content}</p>
                      )}

                      {activity.type === 'status_change' && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-600">Changed status from</span>
                          <Badge variant="outline" className="text-xs">{activity.metadata?.oldValue}</Badge>
                          <span className="text-gray-600">to</span>
                          <Badge variant="outline" className="text-xs">{activity.metadata?.newValue}</Badge>
                        </div>
                      )}

                      {activity.type === 'priority_change' && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-600">Changed priority from</span>
                          <Badge variant="outline" className="text-xs">{activity.metadata?.oldValue}</Badge>
                          <span className="text-gray-600">to</span>
                          <Badge variant="outline" className="text-xs">{activity.metadata?.newValue}</Badge>
                        </div>
                      )}

                      {activity.type === 'note' && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Tag className="w-3.5 h-3.5 text-amber-600" />
                            <span className="text-xs text-amber-600">Internal Note</span>
                          </div>
                          <p className="text-sm text-gray-700 whitespace-pre-line">{activity.content}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="mt-6 pt-6 border-t border-gray-200/60">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-gray-200/60">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                    <AvatarFallback className="bg-[#8a25ed] text-white text-xs">AU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply to customer..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all resize-none"
                      rows={4}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        onClick={handleSendReply}
                        disabled={!replyMessage.trim()}
                        className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white gap-2"
                        size="sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send Reply
                      </Button>
                      <Button
                        onClick={() => setShowNoteInput(!showNoteInput)}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Tag className="w-3.5 h-3.5" />
                        Add Internal Note
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Internal Note Input */}
                {showNoteInput && (
                  <div className="flex gap-3 pl-11">
                    <div className="flex-1">
                      <textarea
                        value={noteMessage}
                        onChange={(e) => setNoteMessage(e.target.value)}
                        placeholder="Add internal note (visible only to team)..."
                        className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                        rows={3}
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          onClick={handleAddNote}
                          disabled={!noteMessage.trim()}
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                          size="sm"
                        >
                          Add Note
                        </Button>
                        <Button
                          onClick={() => {
                            setShowNoteInput(false);
                            setNoteMessage('');
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {/* Status Actions */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/40">
            <h3 className="text-sm text-gray-900 mb-4">Update Status</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleStatusChange('open')}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left',
                  status === 'open'
                    ? 'bg-purple-100 border-2 border-purple-200'
                    : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                )}
              >
                <AlertCircle className={cn('w-4 h-4', status === 'open' ? 'text-purple-600' : 'text-gray-400')} />
                <div className="flex-1">
                  <p className={cn('text-sm', status === 'open' ? 'text-purple-900' : 'text-gray-700')}>Open</p>
                  <p className="text-xs text-gray-500">New or reopened ticket</p>
                </div>
              </button>

              <button
                onClick={() => handleStatusChange('pending')}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left',
                  status === 'pending'
                    ? 'bg-amber-100 border-2 border-amber-200'
                    : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                )}
              >
                <Clock className={cn('w-4 h-4', status === 'pending' ? 'text-amber-600' : 'text-gray-400')} />
                <div className="flex-1">
                  <p className={cn('text-sm', status === 'pending' ? 'text-amber-900' : 'text-gray-700')}>Pending</p>
                  <p className="text-xs text-gray-500">Waiting for response</p>
                </div>
              </button>

              <button
                onClick={() => handleStatusChange('resolved')}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left',
                  status === 'resolved'
                    ? 'bg-green-100 border-2 border-green-200'
                    : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                )}
              >
                <CheckCircle2 className={cn('w-4 h-4', status === 'resolved' ? 'text-green-600' : 'text-gray-400')} />
                <div className="flex-1">
                  <p className={cn('text-sm', status === 'resolved' ? 'text-green-900' : 'text-gray-700')}>Resolved</p>
                  <p className="text-xs text-gray-500">Issue is fixed</p>
                </div>
              </button>
            </div>
          </div>

          {/* Priority Actions */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/40">
            <h3 className="text-sm text-gray-900 mb-4">Update Priority</h3>
            <div className="relative">
              <select
                value={priority}
                onChange={(e) => handlePriorityChange(e.target.value as Priority)}
                className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] cursor-pointer"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Ticket Info Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/40">
            <h3 className="text-sm text-gray-900 mb-4">Ticket Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-1">Reporter</p>
                <p className="text-gray-900">{ticket.reporterName}</p>
                <p className="text-xs text-gray-600">{ticket.reporterEmail}</p>
              </div>
              <div className="pt-3 border-t border-gray-200/60">
                <p className="text-xs text-gray-500 mb-1">Category</p>
                <Badge variant="outline" className="text-xs capitalize">{ticket.category}</Badge>
              </div>
              <div className="pt-3 border-t border-gray-200/60">
                <p className="text-xs text-gray-500 mb-1">Created</p>
                <p className="text-gray-900">{formatDateTime(ticket.createdAt)}</p>
              </div>
              <div className="pt-3 border-t border-gray-200/60">
                <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                <p className="text-gray-900">{formatDateTime(ticket.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
