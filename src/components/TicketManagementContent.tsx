import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Plus, Clock, AlertCircle, CheckCircle2, ChevronDown, X, LayoutGrid, List } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';
import { KanbanBoardContent } from './KanbanBoardContent';

type Priority = 'low' | 'medium' | 'high';
type Status = 'open' | 'pending' | 'resolved';
type Category = 'bug' | 'request' | 'billing' | 'technical' | 'general';
type ViewMode = 'table' | 'kanban';

interface Ticket {
  id: string;
  ticketNumber: string;
  reporterName: string;
  reporterEmail: string;
  category: Category;
  priority: Priority;
  status: Status;
  subject: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  replies: number;
}

interface TicketManagementContentProps {
  onViewTicket?: (ticketId: string) => void;
  onCreateTicket?: () => void;
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    ticketNumber: 'TKT-2024-001',
    reporterName: 'Ahmad Rifai',
    reporterEmail: 'ahmad.rifai@customer.com',
    category: 'technical',
    priority: 'high',
    status: 'open',
    subject: 'API Integration Error - Payment Gateway',
    description: 'Mengalami error saat integrasi payment gateway...',
    createdAt: new Date('2024-11-25T08:30:00'),
    updatedAt: new Date('2024-11-25T08:30:00'),
    replies: 0,
  },
  {
    id: '2',
    ticketNumber: 'TKT-2024-002',
    reporterName: 'Siti Nurhaliza',
    reporterEmail: 'siti.n@company.id',
    category: 'bug',
    priority: 'medium',
    status: 'pending',
    subject: 'Dashboard tidak menampilkan data customer',
    description: 'Setelah login, dashboard kosong dan data tidak muncul...',
    createdAt: new Date('2024-11-24T14:20:00'),
    updatedAt: new Date('2024-11-25T09:15:00'),
    replies: 3,
  },
  {
    id: '3',
    ticketNumber: 'TKT-2024-003',
    reporterName: 'Budi Santoso',
    reporterEmail: 'budi.s@startup.co.id',
    category: 'billing',
    priority: 'low',
    status: 'resolved',
    subject: 'Pertanyaan tentang upgrade paket',
    description: 'Saya ingin upgrade dari paket Starter ke Professional...',
    createdAt: new Date('2024-11-23T10:00:00'),
    updatedAt: new Date('2024-11-24T16:30:00'),
    replies: 5,
  },
  {
    id: '4',
    ticketNumber: 'TKT-2024-004',
    reporterName: 'Dewi Lestari',
    reporterEmail: 'dewi.lestari@bizz.com',
    category: 'request',
    priority: 'medium',
    status: 'open',
    subject: 'Request fitur export data ke Excel',
    description: 'Apakah bisa ditambahkan fitur export customer data ke Excel?',
    createdAt: new Date('2024-11-25T11:45:00'),
    updatedAt: new Date('2024-11-25T11:45:00'),
    replies: 1,
  },
  {
    id: '5',
    ticketNumber: 'TKT-2024-005',
    reporterName: 'Rudi Hartono',
    reporterEmail: 'rudi.h@enterprise.id',
    category: 'technical',
    priority: 'high',
    status: 'pending',
    subject: 'Server timeout saat broadcast ke 5000+ user',
    description: 'Ketika melakukan broadcast ke lebih dari 5000 user, terjadi timeout...',
    createdAt: new Date('2024-11-25T07:20:00'),
    updatedAt: new Date('2024-11-25T10:30:00'),
    replies: 2,
  },
  {
    id: '6',
    ticketNumber: 'TKT-2024-006',
    reporterName: 'Linda Wijaya',
    reporterEmail: 'linda.w@tech.co.id',
    category: 'general',
    priority: 'low',
    status: 'resolved',
    subject: 'Cara menggunakan fitur AI Agent',
    description: 'Saya bingung cara setup AI Agent, bisa dibantu?',
    createdAt: new Date('2024-11-22T15:30:00'),
    updatedAt: new Date('2024-11-23T09:00:00'),
    replies: 4,
  },
];

export function TicketManagementContent({ onViewTicket, onCreateTicket }: TicketManagementContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status'>('date');
  const [showFilters, setShowFilters] = useState(false);

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
        return <AlertCircle className="w-3.5 h-3.5" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5" />;
      case 'resolved':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryLabel = (category: Category) => {
    const labels = {
      bug: 'Bug',
      request: 'Feature Request',
      billing: 'Billing',
      technical: 'Technical',
      general: 'General',
    };
    return labels[category];
  };

  const filteredTickets = mockTickets
    .filter((ticket) => {
      const matchesSearch =
        ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
      const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        const statusOrder = { open: 3, pending: 2, resolved: 1 };
        return statusOrder[b.status] - statusOrder[a.status];
      }
    });

  const stats = {
    total: mockTickets.length,
    open: mockTickets.filter((t) => t.status === 'open').length,
    pending: mockTickets.filter((t) => t.status === 'pending').length,
    resolved: mockTickets.filter((t) => t.status === 'resolved').length,
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

    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const activeFiltersCount =
    (selectedStatus !== 'all' ? 1 : 0) +
    (selectedPriority !== 'all' ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0);

  useEffect(() => {
    const currentRef = dropdownRef.current;
    const handleClickOutside = (event: MouseEvent) => {
      if (currentRef && !currentRef.contains(event.target as Node)) {
        setShowViewDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Ticket Management</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola semua tiket support dari customer</p>
        </div>
        <Button onClick={onCreateTicket} className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white gap-2">
          <Plus className="w-4 h-4" />
          Create Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-200/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Tickets</p>
              <p className="text-2xl text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Open</p>
              <p className="text-2xl text-purple-600 mt-1">{stats.open}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-2xl text-amber-600 mt-1">{stats.pending}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Resolved</p>
              <p className="text-2xl text-green-600 mt-1">{stats.resolved}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
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

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'status')}
              className="appearance-none pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all cursor-pointer"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="status">Sort by Status</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* View Mode Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowViewDropdown(!showViewDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all cursor-pointer hover:border-gray-300"
            >
              {viewMode === 'table' ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
              {viewMode === 'table' ? 'Table' : 'Kanban'}
              <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none" />
            </button>
            {showViewDropdown && (
              <div className="absolute right-0 top-11 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px] overflow-hidden">
                <button
                  onClick={() => {
                    setViewMode('table');
                    setShowViewDropdown(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm w-full text-left transition-colors",
                    viewMode === 'table' ? 'bg-[#8a25ed]/10 text-[#8a25ed]' : 'hover:bg-gray-50'
                  )}
                >
                  <List className="w-4 h-4" />
                  Table View
                </button>
                <button
                  onClick={() => {
                    setViewMode('kanban');
                    setShowViewDropdown(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm w-full text-left transition-colors",
                    viewMode === 'kanban' ? 'bg-[#8a25ed]/10 text-[#8a25ed]' : 'hover:bg-gray-50'
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Kanban View
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-gray-600 mb-2 block">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as Status | 'all')}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

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
              <div className="sm:col-span-3">
                <Button
                  onClick={() => {
                    setSelectedStatus('all');
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

      {/* Tickets Table */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-gray-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/60 bg-gray-50/50">
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Ticket ID</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Reporter</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Subject</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Priority</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-12 h-12 text-gray-300" />
                        <p className="text-sm text-gray-500">No tickets found</p>
                        <p className="text-xs text-gray-400">Try adjusting your filters or search query</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="border-b border-gray-200/40 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900">{ticket.ticketNumber}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm text-gray-900">{ticket.reporterName}</p>
                          <p className="text-xs text-gray-500">{ticket.reporterEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-sm text-gray-900 truncate">{ticket.subject}</p>
                        {ticket.replies > 0 && (
                          <p className="text-xs text-gray-500 mt-0.5">{ticket.replies} replies</p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs border-gray-200">
                          {getCategoryLabel(ticket.category)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={cn('text-xs capitalize', getPriorityColor(ticket.priority))}>
                          {ticket.priority}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={cn('text-xs capitalize flex items-center gap-1 w-fit', getStatusColor(ticket.status))}>
                          {getStatusIcon(ticket.status)}
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-600">{formatDate(ticket.createdAt)}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          onClick={() => onViewTicket?.(ticket.id)}
                          size="sm"
                          variant="ghost"
                          className="text-[#8a25ed] hover:bg-[#8a25ed]/10"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredTickets.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200/40 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Showing {filteredTickets.length} of {mockTickets.length} tickets
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <KanbanBoardContent onViewTicket={onViewTicket} />
      )}
    </div>
  );
}