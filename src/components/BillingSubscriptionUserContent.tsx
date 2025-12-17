import { CreditCard, Calendar, Download, CheckCircle, Clock, XCircle, Package, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

export function BillingSubscriptionUserContent() {
  // Mock current subscription data
  const currentSubscription = {
    plan: 'Professional Plan',
    price: 'Rp 800rb',
    period: '/bulan',
    status: 'paid', // paid | waiting | failed
    renewalDate: '12 Feb 2026',
    nextBilling: 'Rp 800rb on 12 Feb 2026',
  };

  // Mock invoice history
  const invoices = [
    {
      id: 'INV-2025-001',
      date: '12 Jan 2025',
      description: 'Professional Maintenance - January 2025',
      amount: 'Rp 800,000',
      status: 'paid',
    },
    {
      id: 'INV-2024-012',
      date: '12 Dec 2024',
      description: 'Professional Maintenance - December 2024',
      amount: 'Rp 800,000',
      status: 'paid',
    },
    {
      id: 'INV-2024-011',
      date: '12 Nov 2024',
      description: 'Professional Maintenance - November 2024',
      amount: 'Rp 800,000',
      status: 'paid',
    },
    {
      id: 'INV-2024-010',
      date: '12 Oct 2024',
      description: 'Professional Maintenance - October 2024',
      amount: 'Rp 800,000',
      status: 'paid',
    },
    {
      id: 'INV-2024-009',
      date: '12 Sep 2024',
      description: 'Professional Maintenance - September 2024',
      amount: 'Rp 800,000',
      status: 'waiting',
    },
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      paid: {
        icon: CheckCircle,
        className: 'bg-green-100 text-green-700 border-green-200',
        label: 'Paid',
      },
      waiting: {
        icon: Clock,
        className: 'bg-amber-100 text-amber-700 border-amber-200',
        label: 'Waiting for Payment',
      },
      failed: {
        icon: XCircle,
        className: 'bg-red-100 text-red-700 border-red-200',
        label: 'Failed',
      },
    };
    return config[status as keyof typeof config] || config.paid;
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Downloading invoice ${invoiceId}...`);
    // Simulate download
    setTimeout(() => {
      toast.success('Invoice downloaded successfully!');
    }, 1500);
  };

  const currentStatus = getStatusBadge(currentSubscription.status);
  const StatusIcon = currentStatus.icon;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Billing & Subscription</h1>
        <p className="text-gray-600">Kelola langganan dan riwayat pembayaran Anda</p>
      </div>

      {/* Current Subscription Card */}
      <div className="bg-gradient-to-br from-[#8a25ed]/10 to-purple-100 rounded-2xl border-2 border-[#8a25ed]/30 p-8 shadow-lg">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#8a25ed] to-[#6a1fb3] rounded-2xl flex items-center justify-center shadow-lg">
              <Package className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">{currentSubscription.plan}</h2>
              <div className="flex items-baseline gap-1">
                <p className="text-xl text-gray-700">{currentSubscription.price}</p>
                <p className="text-sm text-gray-500">{currentSubscription.period}</p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${currentStatus.className}`}>
            <StatusIcon className="w-5 h-5" strokeWidth={2} />
            <span className="text-sm">{currentStatus.label}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expiry Date */}
          <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-white/80">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#8a25ed]/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#8a25ed]" strokeWidth={2} />
              </div>
              <p className="text-sm text-gray-600">Masa Berlaku</p>
            </div>
            <p className="text-lg text-gray-900 ml-13">
              Expire: <span className="font-medium">{currentSubscription.renewalDate}</span>
            </p>
          </div>

          {/* Next Billing */}
          <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-white/80">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#8a25ed]/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#8a25ed]" strokeWidth={2} />
              </div>
              <p className="text-sm text-gray-600">Next Billing</p>
            </div>
            <p className="text-lg text-gray-900 ml-13">{currentSubscription.nextBilling}</p>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-600" strokeWidth={2} />
            <h3 className="text-lg text-gray-900">Invoice History</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => {
                const status = getStatusBadge(invoice.status);
                const InvoiceStatusIcon = status.icon;

                return (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 font-mono">{invoice.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{invoice.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{invoice.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{invoice.amount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${status.className}`}>
                        <InvoiceStatusIcon className="w-4 h-4" strokeWidth={2} />
                        {status.label}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => handleDownloadInvoice(invoice.id)}
                        size="sm"
                        variant="ghost"
                        className="gap-2 hover:bg-[#8a25ed]/10 hover:text-[#8a25ed]"
                        disabled={invoice.status !== 'paid'}
                      >
                        <Download className="w-4 h-4" strokeWidth={2} />
                        Download
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
