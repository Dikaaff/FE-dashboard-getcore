import { X, Calendar, Tag, AlertCircle, MessageSquare, Send, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface TicketDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    id: string;
    subject: string;
    status: string;
    priority: string;
    category: string;
    description: string;
    lastUpdated: string;
    createdAt: string;
    messages: Array<{
      id: string;
      sender: 'user' | 'support';
      message: string;
      timestamp: string;
    }>;
  } | null;
  onDelete?: (ticketId: string) => void;
}

export function TicketDetailDialog({ isOpen, onClose, ticket, onDelete }: TicketDetailDialogProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen || !ticket) return null;

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      resolved: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return styles[status as keyof typeof styles] || styles.open;
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-orange-100 text-orange-700 border-orange-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return styles[priority as keyof typeof styles] || styles.medium;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setNewMessage('');
      setIsSending(false);
    }, 1000);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      onDelete?.(ticket.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex-1">
            <h2 className="text-xl text-gray-900 mb-2">{ticket.subject}</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-500 font-mono">{ticket.id}</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getStatusBadge(ticket.status)}`}>
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getPriorityBadge(ticket.priority)}`}>
                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200">
                <Tag className="w-3 h-3" strokeWidth={2} />
                {ticket.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
          </button>
        </div>

        {/* Ticket Info */}
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" strokeWidth={2} />
            <div className="flex-1">
              <p className="text-sm text-gray-900 mb-1">Description:</p>
              <p className="text-sm text-gray-700">{ticket.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-3 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" strokeWidth={2} />
              Created: {ticket.createdAt}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" strokeWidth={2} />
              Last Updated: {ticket.lastUpdated}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-gray-600" strokeWidth={2} />
            <h3 className="text-sm text-gray-900">Conversation</h3>
          </div>

          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm mb-1">{msg.message}</p>
                <p
                  className={`text-xs ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Input */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your reply..."
              className="flex-1 resize-none"
              rows={2}
              disabled={isSending || ticket.status === 'resolved'}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isSending || !newMessage.trim() || ticket.status === 'resolved'}
              className="bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white h-auto px-6"
            >
              <Send className="w-4 h-4" strokeWidth={2} />
            </Button>
          </div>
          {ticket.status === 'resolved' && (
            <p className="text-xs text-gray-500 mt-2">This ticket has been resolved and is closed for replies.</p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
          <Button
            onClick={handleDelete}
            variant="ghost"
            className="text-red-600 hover:bg-red-50 hover:text-red-700 gap-2"
          >
            <Trash2 className="w-4 h-4" strokeWidth={2} />
            Delete Ticket
          </Button>
          <Button onClick={onClose} variant="ghost">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
