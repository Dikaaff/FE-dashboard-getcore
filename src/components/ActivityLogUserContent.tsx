import { Activity, Calendar, User, Ticket, CreditCard, Package } from 'lucide-react';

export function ActivityLogUserContent() {
  // Mock activity log data
  const activityLogs = [
    {
      id: 'log-001',
      action: 'Created Ticket',
      description: 'Created support ticket #TCK-001 - "Tidak bisa login ke dashboard"',
      timestamp: '10 Jan 2025, 09:00',
      icon: Ticket,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 'log-002',
      action: 'Ticket Updated',
      description: 'Added reply to ticket #TCK-001',
      timestamp: '10 Jan 2025, 10:30',
      icon: Ticket,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      id: 'log-003',
      action: 'Payment Completed',
      description: 'Successfully paid invoice #INV-2025-001 - Rp 800,000',
      timestamp: '12 Jan 2025, 14:15',
      icon: CreditCard,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 'log-004',
      action: 'Created Ticket',
      description: 'Created support ticket #TCK-002 - "Request fitur export data"',
      timestamp: '09 Jan 2025, 14:00',
      icon: Ticket,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 'log-005',
      action: 'Subscription Changes',
      description: 'Upgraded subscription plan from Starter to Professional',
      timestamp: '15 Dec 2024, 16:45',
      icon: Package,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      id: 'log-006',
      action: 'Ticket Updated',
      description: 'Ticket #TCK-003 marked as resolved',
      timestamp: '07 Jan 2025, 11:00',
      icon: Ticket,
      iconColor: 'text-gray-600',
      bgColor: 'bg-gray-100',
    },
    {
      id: 'log-007',
      action: 'Payment Completed',
      description: 'Successfully paid invoice #INV-2024-012 - Rp 800,000',
      timestamp: '12 Dec 2024, 13:20',
      icon: CreditCard,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 'log-008',
      action: 'Created Ticket',
      description: 'Created support ticket #TCK-004 - "AI Assistant tidak merespon"',
      timestamp: '10 Jan 2025, 06:00',
      icon: Ticket,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 'log-009',
      action: 'Subscription Changes',
      description: 'Renewed subscription for Professional Plan',
      timestamp: '12 Nov 2024, 09:30',
      icon: Package,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      id: 'log-010',
      action: 'Ticket Updated',
      description: 'Ticket #TCK-005 marked as resolved',
      timestamp: '03 Jan 2025, 13:20',
      icon: Ticket,
      iconColor: 'text-gray-600',
      bgColor: 'bg-gray-100',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Activity Log</h1>
        <p className="text-gray-600">Riwayat aktivitas Anda di GetCore</p>
      </div>

      {/* Activity Log Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activityLogs.map((log) => {
                const Icon = log.icon;

                return (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${log.bgColor} rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${log.iconColor}`} strokeWidth={2} />
                        </div>
                        <span className="text-sm text-gray-900">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{log.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" strokeWidth={2} />
                        {log.timestamp}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Ticket className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
            <h3 className="text-sm text-gray-600">Tickets Created</h3>
          </div>
          <p className="text-2xl text-gray-900">5</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Ticket className="w-5 h-5 text-amber-600" strokeWidth={2} />
            </div>
            <h3 className="text-sm text-gray-600">Tickets Updated</h3>
          </div>
          <p className="text-2xl text-gray-900">3</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-green-600" strokeWidth={2} />
            </div>
            <h3 className="text-sm text-gray-600">Payments</h3>
          </div>
          <p className="text-2xl text-gray-900">2</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" strokeWidth={2} />
            </div>
            <h3 className="text-sm text-gray-600">Plan Changes</h3>
          </div>
          <p className="text-2xl text-gray-900">2</p>
        </div>
      </div>
    </div>
  );
}
