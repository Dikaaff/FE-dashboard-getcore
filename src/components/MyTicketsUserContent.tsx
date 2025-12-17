import { Plus, Search, Eye, Calendar, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { TicketDetailDialog } from './TicketDetailDialog';
import { toast } from 'sonner@2.0.3';

interface MyTicketsUserContentProps {
  onViewTicket: (ticketId: string) => void;
  onCreateTicket: () => void;
}

export function MyTicketsUserContent({ onViewTicket, onCreateTicket }: MyTicketsUserContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  // Mock user tickets data with full details
  const [tickets, setTickets] = useState([
    {
      id: 'TCK-001',
      subject: 'Tidak bisa login ke dashboard',
      status: 'open',
      priority: 'high',
      lastUpdated: '2 hours ago',
      createdAt: '10 Jan 2025',
      category: 'Technical',
      description: 'Saya tidak bisa login ke dashboard GetCore. Setiap kali saya memasukkan email dan password, muncul error "Invalid credentials". Mohon bantuan segera.',
      messages: [
        {
          id: 'm1',
          sender: 'user' as const,
          message: 'Saya tidak bisa login ke dashboard GetCore. Setiap kali saya memasukkan email dan password, muncul error "Invalid credentials".',
          timestamp: '10 Jan 2025, 09:00',
        },
        {
          id: 'm2',
          sender: 'support' as const,
          message: 'Terima kasih telah menghubungi kami. Kami sedang memeriksa masalah login Anda. Apakah Anda sudah mencoba reset password?',
          timestamp: '10 Jan 2025, 09:15',
        },
        {
          id: 'm3',
          sender: 'user' as const,
          message: 'Sudah saya coba reset password, tapi tetap tidak bisa login.',
          timestamp: '10 Jan 2025, 10:30',
        },
      ],
    },
    {
      id: 'TCK-002',
      subject: 'Request fitur export data',
      status: 'pending',
      priority: 'medium',
      lastUpdated: '1 day ago',
      createdAt: '09 Jan 2025',
      category: 'Feature Request',
      description: 'Saya ingin request fitur untuk export data customers ke format CSV atau Excel. Ini akan sangat membantu untuk reporting.',
      messages: [
        {
          id: 'm1',
          sender: 'user' as const,
          message: 'Saya ingin request fitur untuk export data customers ke format CSV atau Excel.',
          timestamp: '09 Jan 2025, 14:00',
        },
        {
          id: 'm2',
          sender: 'support' as const,
          message: 'Terima kasih atas feedback Anda. Kami akan forward request ini ke tim product development.',
          timestamp: '09 Jan 2025, 15:30',
        },
      ],
    },
    {
      id: 'TCK-003',
      subject: 'Pertanyaan tentang billing',
      status: 'resolved',
      priority: 'low',
      lastUpdated: '3 days ago',
      createdAt: '07 Jan 2025',
      category: 'Billing',
      description: 'Saya ingin tanya tentang billing cycle untuk professional plan. Apakah bisa diubah dari monthly ke yearly?',
      messages: [
        {
          id: 'm1',
          sender: 'user' as const,
          message: 'Saya ingin tanya tentang billing cycle untuk professional plan. Apakah bisa diubah dari monthly ke yearly?',
          timestamp: '07 Jan 2025, 10:00',
        },
        {
          id: 'm2',
          sender: 'support' as const,
          message: 'Ya tentu bisa! Anda bisa upgrade ke yearly plan dari halaman Billing & Subscription. Dengan yearly plan, Anda akan mendapat diskon 20%.',
          timestamp: '07 Jan 2025, 10:30',
        },
        {
          id: 'm3',
          sender: 'user' as const,
          message: 'Terima kasih atas informasinya!',
          timestamp: '07 Jan 2025, 11:00',
        },
      ],
    },
    {
      id: 'TCK-004',
      subject: 'AI Assistant tidak merespon',
      status: 'open',
      priority: 'high',
      lastUpdated: '5 hours ago',
      createdAt: '10 Jan 2025',
      category: 'Technical',
      description: 'AI Assistant saya tidak merespon ketika saya mengirim pesan. Loading terus menerus tanpa jawaban.',
      messages: [
        {
          id: 'm1',
          sender: 'user' as const,
          message: 'AI Assistant saya tidak merespon ketika saya mengirim pesan. Loading terus menerus.',
          timestamp: '10 Jan 2025, 06:00',
        },
      ],
    },
    {
      id: 'TCK-005',
      subject: 'Update informasi profil',
      status: 'resolved',
      priority: 'low',
      lastUpdated: '1 week ago',
      createdAt: '03 Jan 2025',
      category: 'Account',
      description: 'Bagaimana cara update informasi profil perusahaan di GetCore?',
      messages: [
        {
          id: 'm1',
          sender: 'user' as const,
          message: 'Bagaimana cara update informasi profil perusahaan?',
          timestamp: '03 Jan 2025, 13:00',
        },
        {
          id: 'm2',
          sender: 'support' as const,
          message: 'Anda bisa update profil melalui menu Settings > Company Profile. Semua informasi bisa diubah di sana.',
          timestamp: '03 Jan 2025, 13:20',
        },
      ],
    },
  ]);

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

  const filteredTickets = tickets.filter((ticket) =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteTicket = (ticketId: string) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
    toast.success('Ticket deleted successfully!');
  };

  const currentTicket = tickets.find(t => t.id === selectedTicket);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">My Tickets</h1>
          <p className="text-gray-600">Kelola dan lacak tiket support Anda</p>
        </div>
        <Button
          onClick={onCreateTicket}
          className="bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white gap-2 h-11 shadow-lg shadow-[#8a25ed]/20"
        >
          <Plus className="w-5 h-5" strokeWidth={2} />
          Buat Tiket Baru
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
          <Input
            type="text"
            placeholder="Cari tiket berdasarkan ID atau subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle className="w-12 h-12 text-gray-300 mb-3" strokeWidth={1.5} />
                      <p className="text-gray-500 mb-1">Tidak ada tiket ditemukan</p>
                      <p className="text-sm text-gray-400">Coba ubah kata kunci pencarian Anda</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 font-mono">{ticket.id}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{ticket.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 max-w-xs truncate">
                        {ticket.subject}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getStatusBadge(ticket.status)}`}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getPriorityBadge(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" strokeWidth={2} />
                        {ticket.lastUpdated}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => setSelectedTicket(ticket.id)}
                        size="sm"
                        variant="ghost"
                        className="gap-2 hover:bg-[#8a25ed]/10 hover:text-[#8a25ed]"
                      >
                        <Eye className="w-4 h-4" strokeWidth={2} />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Empty State - No Tickets Ever Created */}
        {tickets.length === 0 && (
          <div className="px-6 py-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
              </div>
              <p className="text-gray-900 mb-2">Belum ada tiket</p>
              <p className="text-sm text-gray-500 mb-6">
                Buat tiket pertama Anda untuk mendapatkan bantuan dari tim support kami
              </p>
              <Button
                onClick={onCreateTicket}
                className="bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white gap-2 shadow-lg shadow-[#8a25ed]/20"
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
                Buat Tiket Baru
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Ticket Detail Dialog */}
      <TicketDetailDialog
        isOpen={selectedTicket !== null}
        onClose={() => setSelectedTicket(null)}
        ticket={currentTicket || null}
        onDelete={handleDeleteTicket}
      />
    </div>
  );
}