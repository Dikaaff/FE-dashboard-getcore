import { useState } from 'react';
import {
  CreditCard,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  FileText,
  Settings,
  AlertCircle,
  Wrench,
  DollarSign,
  Plus,
  Search,
  Filter,
  Eye,
  Send,
  Pause,
  Play,
  TrendingUp,
  Trash2,
  Edit,
  Check,
  X,
  ExternalLink,
  Key,
  Webhook,
  Calendar,
  ChevronDown,
  ChevronRight,
  Tag,
  Percent,
  Package,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { toast } from 'sonner@2.0.3';
import { cn } from './ui/utils';

interface CustomerSubscription {
  id: string;
  customerName: string;
  email: string;
  currentPlan: string;
  renewalDate: string;
  status: 'active' | 'expired' | 'cancelled';
  amount: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
}

interface RefundRequest {
  id: string;
  customerName: string;
  invoiceNumber: string;
  amount: string;
  reason: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface PlanConfig {
  id: string;
  name: string;
  price: string;
  features: string[];
  isActive: boolean;
}

// Mock Data
const mockCustomerSubscriptions: CustomerSubscription[] = [
  {
    id: '1',
    customerName: 'PT Maju Jaya',
    email: 'contact@majujaya.com',
    currentPlan: 'Corporate Enterprise',
    renewalDate: '2025-12-15',
    status: 'active',
    amount: 'Rp 7.000.000',
  },
  {
    id: '2',
    customerName: 'CV Sejahtera',
    email: 'admin@sejahtera.com',
    currentPlan: 'UMKM Professional',
    renewalDate: '2025-12-20',
    status: 'active',
    amount: 'Rp 4.000.000',
  },
  {
    id: '3',
    customerName: 'Toko Berkah',
    email: 'toko@berkah.com',
    currentPlan: 'Standard Plan',
    renewalDate: '2025-11-28',
    status: 'expired',
    amount: 'Rp 2.000.000',
  },
  {
    id: '4',
    customerName: 'UD Sentosa',
    email: 'sentosa@gmail.com',
    currentPlan: 'UMKM Professional',
    renewalDate: '2025-12-25',
    status: 'active',
    amount: 'Rp 4.000.000',
  },
];

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    customerName: 'PT Maju Jaya',
    amount: 'Rp 7.000.000',
    status: 'paid',
    date: '2025-11-01',
    dueDate: '2025-11-15',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-002',
    customerName: 'CV Sejahtera',
    amount: 'Rp 4.000.000',
    status: 'paid',
    date: '2025-11-05',
    dueDate: '2025-11-20',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-003',
    customerName: 'Toko Berkah',
    amount: 'Rp 2.000.000',
    status: 'overdue',
    date: '2025-10-15',
    dueDate: '2025-10-28',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2025-004',
    customerName: 'UD Sentosa',
    amount: 'Rp 4.000.000',
    status: 'pending',
    date: '2025-11-10',
    dueDate: '2025-11-25',
  },
];

const mockRefundRequests: RefundRequest[] = [
  {
    id: '1',
    customerName: 'PT Maju Jaya',
    invoiceNumber: 'INV-2025-001',
    amount: 'Rp 7.000.000',
    reason: 'Service tidak sesuai ekspektasi',
    requestDate: '2025-11-20',
    status: 'pending',
  },
  {
    id: '2',
    customerName: 'Toko Berkah',
    invoiceNumber: 'INV-2025-003',
    amount: 'Rp 2.000.000',
    reason: 'Duplikasi pembayaran',
    requestDate: '2025-11-18',
    status: 'pending',
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-700 border-green-200',
  expired: 'bg-red-100 text-red-700 border-red-200',
  cancelled: 'bg-gray-100 text-gray-700 border-gray-200',
  paid: 'bg-green-100 text-green-700 border-green-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  overdue: 'bg-red-100 text-red-700 border-red-200',
  approved: 'bg-green-100 text-green-700 border-green-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
};

export function AdminBillingContent() {
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSubscription | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<string>('');
  const [generateInvoiceOpen, setGenerateInvoiceOpen] = useState(false);
  const [invoiceDetailOpen, setInvoiceDetailOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [refundDetailOpen, setRefundDetailOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null);
  const [gatewaySettingsOpen, setGatewaySettingsOpen] = useState(false);
  const [planConfigOpen, setPlanConfigOpen] = useState(false);

  // Stats
  const totalRevenue = 'Rp 17.000.000';
  const activeSubscriptions = 3;
  const pendingInvoices = 1;
  const pendingRefunds = 2;

  const handleCustomerAction = (customer: CustomerSubscription, action: string) => {
    setSelectedCustomer(customer);
    setActionType(action);
    setActionDialogOpen(true);
  };

  const handleConfirmAction = () => {
    toast.success(`${actionType} action completed for ${selectedCustomer?.customerName}`);
    setActionDialogOpen(false);
  };

  const handleGenerateInvoice = () => {
    toast.success('Invoice generated successfully');
    setGenerateInvoiceOpen(false);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setInvoiceDetailOpen(true);
  };

  const handleResendInvoice = (invoiceId: string) => {
    toast.success('Invoice resent to customer email');
  };

  const handleViewRefund = (refund: RefundRequest) => {
    setSelectedRefund(refund);
    setRefundDetailOpen(true);
  };

  const handleRefundAction = (action: 'approve' | 'reject') => {
    toast.success(`Refund request ${action}d successfully`);
    setRefundDetailOpen(false);
  };

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
        <div>
          <h1 className="text-gray-900 tracking-tight">
            Billing & Subscription Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola subscription, invoice, dan payment gateway
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white border border-gray-200/60 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Total Revenue</p>
            <p className="text-xl text-gray-900">{totalRevenue}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200/60 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Active Subscriptions</p>
            <p className="text-xl text-gray-900">{activeSubscriptions}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200/60 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Pending Invoices</p>
            <p className="text-xl text-gray-900">{pendingInvoices}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200/60 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Pending Refunds</p>
            <p className="text-xl text-gray-900">{pendingRefunds}</p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <TabsList className="bg-white border border-gray-200/60 p-1">
          <TabsTrigger value="subscriptions" className="data-[state=active]:bg-[#8a25ed] data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            Customer Subscriptions
          </TabsTrigger>
          <TabsTrigger value="invoices" className="data-[state=active]:bg-[#8a25ed] data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="gateway" className="data-[state=active]:bg-[#8a25ed] data-[state=active]:text-white">
            <Settings className="w-4 h-4 mr-2" />
            Payment Gateway
          </TabsTrigger>
          <TabsTrigger value="refunds" className="data-[state=active]:bg-[#8a25ed] data-[state=active]:text-white">
            <AlertCircle className="w-4 h-4 mr-2" />
            Refund Requests
          </TabsTrigger>
          <TabsTrigger value="plans" className="data-[state=active]:bg-[#8a25ed] data-[state=active]:text-white">
            <Package className="w-4 h-4 mr-2" />
            Plan Configuration
          </TabsTrigger>
        </TabsList>

        {/* Customer Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white border-gray-200/60"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[160px] bg-white border-gray-200/60">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white border border-gray-200/60 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead className="text-xs text-gray-900">Customer</TableHead>
                  <TableHead className="text-xs text-gray-900">Current Plan</TableHead>
                  <TableHead className="text-xs text-gray-900">Renewal Date</TableHead>
                  <TableHead className="text-xs text-gray-900">Amount</TableHead>
                  <TableHead className="text-xs text-gray-900">Status</TableHead>
                  <TableHead className="text-xs text-gray-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCustomerSubscriptions.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell>
                      <div>
                        <p className="text-sm text-gray-900">{customer.customerName}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-gray-600">{customer.currentPlan}</TableCell>
                    <TableCell className="text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {customer.renewalDate}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">{customer.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${statusColors[customer.status]}`}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8">
                            Actions
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => handleCustomerAction(customer, 'Extend')}>
                            <Clock className="w-4 h-4 mr-2" />
                            Extend
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCustomerAction(customer, 'Pause')}>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCustomerAction(customer, 'Cancel')}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCustomerAction(customer, 'Upgrade')}>
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Upgrade
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search invoices..."
                className="pl-9 bg-white border-gray-200/60"
              />
            </div>
            <Button
              onClick={() => setGenerateInvoiceOpen(true)}
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Generate Invoice
            </Button>
          </div>

          <div className="bg-white border border-gray-200/60 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead className="text-xs text-gray-900">Invoice Number</TableHead>
                  <TableHead className="text-xs text-gray-900">Customer</TableHead>
                  <TableHead className="text-xs text-gray-900">Amount</TableHead>
                  <TableHead className="text-xs text-gray-900">Date</TableHead>
                  <TableHead className="text-xs text-gray-900">Due Date</TableHead>
                  <TableHead className="text-xs text-gray-900">Status</TableHead>
                  <TableHead className="text-xs text-gray-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="text-sm text-gray-900">{invoice.invoiceNumber}</TableCell>
                    <TableCell className="text-xs text-gray-600">{invoice.customerName}</TableCell>
                    <TableCell className="text-sm text-gray-900">{invoice.amount}</TableCell>
                    <TableCell className="text-xs text-gray-600">{invoice.date}</TableCell>
                    <TableCell className="text-xs text-gray-600">{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${statusColors[invoice.status]}`}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewInvoice(invoice)}
                          className="h-8 text-xs"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResendInvoice(invoice.id)}
                          className="h-8 text-xs"
                        >
                          <Send className="w-3.5 h-3.5 mr-1" />
                          Resend
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          <Download className="w-3.5 h-3.5 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Payment Gateway Tab */}
        <TabsContent value="gateway" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Midtrans Card */}
            <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-900">Midtrans</h3>
                    <p className="text-xs text-gray-500">Payment Gateway</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-600">Status</span>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-600">Webhook</span>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs">
                    <Webhook className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-gray-600">API Key</span>
                  <span className="text-xs text-gray-900 font-mono">***********abc123</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 border-gray-200/60"
                onClick={() => setGatewaySettingsOpen(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configure Settings
              </Button>
            </div>

            {/* Xendit Card */}
            <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-900">Xendit</h3>
                    <p className="text-xs text-gray-500">Payment Gateway</p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-600">Status</span>
                  <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
                    <XCircle className="w-3 h-3 mr-1" />
                    Not Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-600">Webhook</span>
                  <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Inactive
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-gray-600">API Key</span>
                  <span className="text-xs text-gray-400">Not configured</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 border-gray-200/60"
                onClick={() => setGatewaySettingsOpen(true)}
              >
                <Key className="w-4 h-4 mr-2" />
                Setup Integration
              </Button>
            </div>
          </div>

          {/* Webhook Logs */}
          <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-900">Recent Webhook Events</h3>
              <Button variant="ghost" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-xs text-gray-900">payment.success</p>
                    <p className="text-xs text-gray-500">INV-2025-001</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-xs text-gray-900">payment.pending</p>
                    <p className="text-xs text-gray-500">INV-2025-004</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div>
                    <p className="text-xs text-gray-900">payment.failed</p>
                    <p className="text-xs text-gray-500">INV-2025-003</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">3 hours ago</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Refund Requests Tab */}
        <TabsContent value="refunds" className="space-y-4">
          <div className="bg-white border border-gray-200/60 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead className="text-xs text-gray-900">Customer</TableHead>
                  <TableHead className="text-xs text-gray-900">Invoice</TableHead>
                  <TableHead className="text-xs text-gray-900">Amount</TableHead>
                  <TableHead className="text-xs text-gray-900">Reason</TableHead>
                  <TableHead className="text-xs text-gray-900">Request Date</TableHead>
                  <TableHead className="text-xs text-gray-900">Status</TableHead>
                  <TableHead className="text-xs text-gray-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRefundRequests.map((refund) => (
                  <TableRow key={refund.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="text-xs text-gray-900">{refund.customerName}</TableCell>
                    <TableCell className="text-xs text-gray-600">{refund.invoiceNumber}</TableCell>
                    <TableCell className="text-sm text-gray-900">{refund.amount}</TableCell>
                    <TableCell className="text-xs text-gray-600 max-w-[200px] truncate">{refund.reason}</TableCell>
                    <TableCell className="text-xs text-gray-600">{refund.requestDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${statusColors[refund.status]}`}>
                        {refund.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewRefund(refund)}
                        className="h-8 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Plan Configuration Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Manage pricing, features, discounts, and promo codes</p>
            <Button
              onClick={() => setPlanConfigOpen(true)}
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Plan Cards */}
            <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm text-gray-900">Standard Plan</h3>
                  <p className="text-xs text-gray-500 mt-1">Paket Implementasi Lengkap</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-gray-900">Rp 2Jt</span>
                  <span className="text-sm text-gray-400 line-through">Rp 3Jt</span>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">-33%</Badge>
                </div>

                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <p className="text-xs text-gray-600">Features:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-[#8a25ed] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-600">AI Chatbot untuk customer service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-[#8a25ed] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-600">Otomasi inventory management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-[#8a25ed] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-600">Analytics dashboard</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-gray-200/60">
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm text-gray-900">UMKM Professional</h3>
                  <p className="text-xs text-gray-500 mt-1">Paket Implementasi + Setup</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-gray-900">Rp 4Jt</span>
                  <span className="text-sm text-gray-400 line-through">Rp 6Jt</span>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">-33%</Badge>
                </div>

                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <p className="text-xs text-gray-600">Features:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-[#8a25ed] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-600">Semua fitur UMKM Starter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-[#8a25ed] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-600">Advanced AI automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-[#8a25ed] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-600">Multi-platform integration</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-gray-200/60">
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          {/* Promo Codes Section */}
          <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-900">Active Promo Codes</h3>
              <Button size="sm" className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white">
                <Tag className="w-4 h-4 mr-2" />
                Create Promo
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200/60 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Percent className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-mono">LAUNCH2025</p>
                    <p className="text-xs text-gray-500">50% discount - Valid until Dec 31, 2025</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200/60 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Percent className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-mono">NEWCUST20</p>
                    <p className="text-xs text-gray-500">20% discount for new customers</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Customer Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{actionType} Subscription</DialogTitle>
            <DialogDescription>
              Confirm {actionType.toLowerCase()} action for {selectedCustomer?.customerName}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Customer:</span>
                <span className="text-gray-900">{selectedCustomer?.customerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current Plan:</span>
                <span className="text-gray-900">{selectedCustomer?.currentPlan}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="text-gray-900">{selectedCustomer?.amount}</span>
              </div>
            </div>
            {actionType === 'Extend' && (
              <div className="space-y-2">
                <Label>Extension Period</Label>
                <Select defaultValue="1month">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAction} className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Invoice Dialog */}
      <Dialog open={generateInvoiceOpen} onOpenChange={setGenerateInvoiceOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Manual Invoice</DialogTitle>
            <DialogDescription>
              Create a custom invoice for a customer
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Customer</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomerSubscriptions.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.customerName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input type="text" placeholder="Rp 2.000.000" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Invoice description..." />
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGenerateInvoiceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateInvoice} className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white">
              Generate Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Detail Dialog */}
      <Dialog open={invoiceDetailOpen} onOpenChange={setInvoiceDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              View complete invoice information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Invoice Number:</span>
                <span className="text-gray-900 font-mono">{selectedInvoice?.invoiceNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Customer:</span>
                <span className="text-gray-900">{selectedInvoice?.customerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="text-gray-900">{selectedInvoice?.amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Issue Date:</span>
                <span className="text-gray-900">{selectedInvoice?.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Due Date:</span>
                <span className="text-gray-900">{selectedInvoice?.dueDate}</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Status:</span>
                <Badge variant="outline" className={`text-xs ${selectedInvoice?.status ? statusColors[selectedInvoice.status] : ''}`}>
                  {selectedInvoice?.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Resend Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Refund Detail Dialog */}
      <Dialog open={refundDetailOpen} onOpenChange={setRefundDetailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Refund Request Review</DialogTitle>
            <DialogDescription>
              Review and process refund request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Customer:</span>
                <span className="text-gray-900">{selectedRefund?.customerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Invoice:</span>
                <span className="text-gray-900 font-mono">{selectedRefund?.invoiceNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="text-gray-900">{selectedRefund?.amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Request Date:</span>
                <span className="text-gray-900">{selectedRefund?.requestDate}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason</Label>
              <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                {selectedRefund?.reason}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Admin Notes (Optional)</Label>
              <Textarea placeholder="Add notes about this refund request..." />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => handleRefundAction('reject')}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button
              onClick={() => handleRefundAction('approve')}
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Approve Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Gateway Settings Dialog */}
      <Dialog open={gatewaySettingsOpen} onOpenChange={setGatewaySettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Gateway Settings</DialogTitle>
            <DialogDescription>
              Configure your payment gateway integration
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Gateway Provider</Label>
              <Select defaultValue="midtrans">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midtrans">Midtrans</SelectItem>
                  <SelectItem value="xendit">Xendit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" placeholder="Enter API key" />
            </div>
            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <Input type="text" placeholder="https://..." />
            </div>
            <div className="flex items-center justify-between">
              <Label>Enable Gateway</Label>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGatewaySettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success('Gateway settings saved');
              setGatewaySettingsOpen(false);
            }} className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white">
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Plan Configuration Dialog */}
      <Dialog open={planConfigOpen} onOpenChange={setPlanConfigOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Plan</DialogTitle>
            <DialogDescription>
              Create a new subscription plan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label>Plan Name</Label>
              <Input type="text" placeholder="e.g. Enterprise Plan" />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input type="text" placeholder="e.g. For large businesses" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input type="text" placeholder="Rp 5.000.000" />
              </div>
              <div className="space-y-2">
                <Label>Discount (%)</Label>
                <Input type="number" placeholder="20" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Features (one per line)</Label>
              <Textarea 
                placeholder="AI Chatbot&#10;Advanced Analytics&#10;Priority Support"
                rows={5}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Active</Label>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlanConfigOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success('Plan created successfully');
              setPlanConfigOpen(false);
            }} className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white">
              Create Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}