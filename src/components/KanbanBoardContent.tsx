import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Search, Filter, Eye, UserPlus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';
import { toast } from 'sonner@2.0.3';

type Priority = 'low' | 'medium' | 'high';
type KanbanStatus = 'todo' | 'in-progress' | 'completed';
type Category = 'bug' | 'request' | 'billing' | 'technical' | 'general';

interface Ticket {
  id: string;
  ticketNumber: string;
  reporterName: string;
  reporterEmail: string;
  category: Category;
  priority: Priority;
  status: KanbanStatus;
  subject: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
}

interface KanbanBoardContentProps {
  onViewTicket?: (ticketId: string) => void;
}

const mockKanbanTickets: Ticket[] = [
  {
    id: '1',
    ticketNumber: 'TKT-001',
    reporterName: 'Ahmad Rifai',
    reporterEmail: 'ahmad.rifai@customer.com',
    category: 'technical',
    priority: 'high',
    status: 'todo',
    subject: 'API Integration Error - Payment Gateway',
    description: 'Mengalami error saat integrasi payment gateway...',
    createdAt: new Date('2024-11-25T08:30:00'),
    updatedAt: new Date('2024-11-25T08:30:00'),
  },
  {
    id: '2',
    ticketNumber: 'TKT-002',
    reporterName: 'Siti Nurhaliza',
    reporterEmail: 'siti.n@company.id',
    category: 'bug',
    priority: 'medium',
    status: 'in-progress',
    subject: 'Dashboard tidak menampilkan data customer',
    description: 'Setelah login, dashboard kosong dan data tidak muncul...',
    createdAt: new Date('2024-11-24T14:20:00'),
    updatedAt: new Date('2024-11-25T09:15:00'),
    assignedTo: 'John Doe',
  },
  {
    id: '3',
    ticketNumber: 'TKT-003',
    reporterName: 'Budi Santoso',
    reporterEmail: 'budi.s@startup.co.id',
    category: 'billing',
    priority: 'low',
    status: 'completed',
    subject: 'Pertanyaan tentang upgrade paket',
    description: 'Saya ingin upgrade dari paket Starter ke Professional...',
    createdAt: new Date('2024-11-23T10:00:00'),
    updatedAt: new Date('2024-11-24T16:30:00'),
    assignedTo: 'Sarah Lee',
  },
  {
    id: '4',
    ticketNumber: 'TKT-004',
    reporterName: 'Dewi Lestari',
    reporterEmail: 'dewi.lestari@bizz.com',
    category: 'request',
    priority: 'medium',
    status: 'in-progress',
    subject: 'Request fitur export data ke Excel',
    description: 'Apakah bisa ditambahkan fitur export customer data ke Excel?',
    createdAt: new Date('2024-11-25T11:45:00'),
    updatedAt: new Date('2024-11-25T11:45:00'),
    assignedTo: 'Mike Chen',
  },
  {
    id: '5',
    ticketNumber: 'TKT-005',
    reporterName: 'Rudi Hartono',
    reporterEmail: 'rudi.h@enterprise.id',
    category: 'technical',
    priority: 'high',
    status: 'in-progress',
    subject: 'Server timeout saat broadcast ke 5000+ user',
    description: 'Ketika melakukan broadcast ke lebih dari 5000 user, terjadi timeout...',
    createdAt: new Date('2024-11-25T07:20:00'),
    updatedAt: new Date('2024-11-25T10:30:00'),
    assignedTo: 'John Doe',
  },
  {
    id: '6',
    ticketNumber: 'TKT-006',
    reporterName: 'Linda Wijaya',
    reporterEmail: 'linda.w@tech.co.id',
    category: 'general',
    priority: 'low',
    status: 'completed',
    subject: 'Cara menggunakan fitur AI Agent',
    description: 'Saya bingung cara setup AI Agent, bisa dibantu?',
    createdAt: new Date('2024-11-22T15:30:00'),
    updatedAt: new Date('2024-11-23T09:00:00'),
    assignedTo: 'Sarah Lee',
  },
  {
    id: '7',
    ticketNumber: 'TKT-007',
    reporterName: 'Andi Wijaya',
    reporterEmail: 'andi.w@startup.id',
    category: 'bug',
    priority: 'high',
    status: 'todo',
    subject: 'Email notification tidak terkirim',
    description: 'Customer tidak menerima email konfirmasi setelah registrasi...',
    createdAt: new Date('2024-11-25T13:00:00'),
    updatedAt: new Date('2024-11-25T13:00:00'),
  },
  {
    id: '8',
    ticketNumber: 'TKT-008',
    reporterName: 'Maya Putri',
    reporterEmail: 'maya.p@corp.com',
    category: 'technical',
    priority: 'medium',
    status: 'todo',
    subject: 'Integrasi dengan third-party API',
    description: 'Butuh bantuan untuk integrasi dengan Salesforce API...',
    createdAt: new Date('2024-11-25T10:15:00'),
    updatedAt: new Date('2024-11-25T14:00:00'),
    assignedTo: 'Mike Chen',
  },
];

const ITEM_TYPE = 'TICKET';

interface TicketCardProps {
  ticket: Ticket;
  onViewTicket?: (ticketId: string) => void;
  onMoveTicket: (ticketId: string, newStatus: KanbanStatus) => void;
}

function TicketCard({ ticket, onViewTicket, onMoveTicket }: TicketCardProps) {
  const [{ isDragging }, drag] = useDrag(
    {
      type: ITEM_TYPE,
      item: { id: ticket.id, currentStatus: ticket.status },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [ticket.id, ticket.status] // Add dependencies
  );

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'medium':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'low':
        return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('View ticket clicked:', ticket.id);
    if (onViewTicket) {
      onViewTicket(ticket.id);
    }
  };

  return (
    <div
      ref={drag}
      className={cn(
        'bg-white rounded-2xl p-4 border border-gray-100 shadow-sm backdrop-blur-xl transition-all duration-200 cursor-grab active:cursor-grabbing',
        'hover:shadow-xl hover:scale-[1.02] hover:border-gray-200',
        isDragging ? 'opacity-30 scale-105 shadow-2xl ring-2 ring-[#8a25ed]/30' : ''
      )}
      style={{
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="space-y-3">
        {/* Ticket ID & Priority */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-[#8a25ed]">{ticket.ticketNumber}</p>
          <Badge
            variant="outline"
            className={cn(
              'text-xs capitalize px-2 py-0.5 rounded-full border',
              getPriorityColor(ticket.priority)
            )}
          >
            {ticket.priority}
          </Badge>
        </div>

        {/* Subject */}
        <h4 className="text-sm text-gray-900 line-clamp-2 leading-snug">
          {ticket.subject}
        </h4>

        {/* Reporter with Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xs shadow-sm">
            {ticket.reporterName.charAt(0)}
          </div>
          <p className="text-xs text-gray-600 truncate flex-1">{ticket.reporterName}</p>
        </div>

        {/* Assigned To */}
        {ticket.assignedTo && (
          <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50/80 rounded-xl">
            <UserPlus className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-600">{ticket.assignedTo}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
          <p className="text-xs text-gray-400">{formatDate(ticket.updatedAt)}</p>
          <div className="flex items-center gap-1">
            <button
              onClick={handleViewClick}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              type="button"
              className="w-8 h-8 rounded-xl hover:bg-[#8a25ed]/10 flex items-center justify-center transition-all group active:scale-95 cursor-pointer z-10 relative"
              title="View Details"
            >
              <Eye className="w-4 h-4 text-gray-400 group-hover:text-[#8a25ed] transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  title: string;
  status: KanbanStatus;
  tickets: Ticket[];
  color: string;
  onViewTicket?: (ticketId: string) => void;
  onMoveTicket: (ticketId: string, newStatus: KanbanStatus) => void;
}

function KanbanColumn({ title, status, tickets, color, onViewTicket, onMoveTicket }: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { id: string; currentStatus: KanbanStatus }) => {
      if (item.currentStatus !== status) {
        onMoveTicket(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getColumnGradient = (status: KanbanStatus) => {
    switch (status) {
      case 'todo':
        return 'from-slate-50/50 to-gray-50/30';
      case 'in-progress':
        return 'from-amber-50/50 to-yellow-50/30';
      case 'completed':
        return 'from-emerald-50/50 to-green-50/30';
    }
  };

  return (
    <div
      ref={drop}
      className={cn(
        'flex-shrink-0 w-80 sm:w-72 lg:w-80 rounded-3xl p-5 transition-all duration-300',
        'bg-gradient-to-br backdrop-blur-xl border border-gray-200/40 shadow-sm',
        getColumnGradient(status),
        isOver && 'ring-2 ring-[#8a25ed] ring-offset-4 scale-[1.02] shadow-xl bg-[#8a25ed]/5'
      )}
      style={{
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200/50">
        <div className="flex items-center gap-2.5">
          <div className={cn('w-2.5 h-2.5 rounded-full shadow-sm', color)} />
          <h3 className="text-sm text-gray-900">{title}</h3>
        </div>
        <Badge
          variant="outline"
          className="bg-white/80 backdrop-blur-sm text-xs border-gray-200/50 shadow-sm px-2.5 py-0.5 rounded-full"
        >
          {tickets.length}
        </Badge>
      </div>

      {/* Tickets */}
      <div className="space-y-3.5 max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-100/80 backdrop-blur-sm flex items-center justify-center mb-3">
              <div className={cn('w-8 h-8 rounded-full opacity-40', color)} />
            </div>
            <p className="text-xs text-gray-400 text-center">No tickets in this column</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onViewTicket={onViewTicket}
              onMoveTicket={onMoveTicket}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function KanbanBoardContent({ onViewTicket }: KanbanBoardContentProps) {
  const [tickets, setTickets] = useState(mockKanbanTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleMoveTicket = (ticketId: string, newStatus: KanbanStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket.id === ticketId) {
          const updatedTicket = { ...ticket, status: newStatus, updatedAt: new Date() };
          
          // Show toast notification
          const statusLabels: Record<KanbanStatus, string> = {
            'todo': 'To Do',
            'in-progress': 'In Progress',
            'completed': 'Completed',
          };
          
          toast.success(`Ticket ${ticket.ticketNumber} moved to ${statusLabels[newStatus]}`, {
            duration: 3000,
          });
          
          return updatedTicket;
        }
        return ticket;
      })
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;

    return matchesSearch && matchesPriority && matchesCategory;
  });

  const columns = [
    {
      title: 'To Do',
      status: 'todo' as KanbanStatus,
      color: 'bg-slate-400',
      tickets: filteredTickets.filter((t) => t.status === 'todo'),
    },
    {
      title: 'In Progress',
      status: 'in-progress' as KanbanStatus,
      color: 'bg-amber-400',
      tickets: filteredTickets.filter((t) => t.status === 'in-progress'),
    },
    {
      title: 'Completed',
      status: 'completed' as KanbanStatus,
      color: 'bg-emerald-400',
      tickets: filteredTickets.filter((t) => t.status === 'completed'),
    },
  ];

  const activeFiltersCount =
    (selectedPriority !== 'all' ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/40">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ticket ID, name, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="gap-2 relative"
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 bg-[#8a25ed] text-white h-5 px-1.5 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600 mb-2 block">Priority</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value as Priority | 'all')}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-600 mb-2 block">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
                >
                  <option value="all">All Categories</option>
                  <option value="bug">Bug</option>
                  <option value="request">Feature Request</option>
                  <option value="billing">Billing</option>
                  <option value="technical">Technical</option>
                  <option value="general">General</option>
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <div className="sm:col-span-2">
                  <Button
                    onClick={() => {
                      setSelectedPriority('all');
                      setSelectedCategory('all');
                    }}
                    variant="ghost"
                    className="text-sm gap-2"
                    size="sm"
                  >
                    <X className="w-3.5 h-3.5" />
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {columns.map((column) => (
              <KanbanColumn
                key={column.status}
                title={column.title}
                status={column.status}
                tickets={column.tickets}
                color={column.color}
                onViewTicket={onViewTicket}
                onMoveTicket={handleMoveTicket}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}