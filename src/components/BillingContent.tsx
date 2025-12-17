import { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  CheckCircle, 
  Zap, 
  TrendingUp,
  Shield,
  Search,
  Filter,
  Calendar,
  ChevronRight,
  Star,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
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
import { toast } from 'sonner@2.0.3';
import { cn } from './ui/utils';

interface BillingHistory {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

const mockBillingHistory: BillingHistory[] = [
  {
    id: '1',
    date: 'Oct 2025',
    description: 'GetCore UMKM Professional Renewal',
    amount: 'Rp 4.000.000',
    status: 'Paid',
  },
  {
    id: '2',
    date: 'Sep 2025',
    description: 'GetCore UMKM Professional Renewal',
    amount: 'Rp 4.000.000',
    status: 'Paid',
  },
  {
    id: '3',
    date: 'Aug 2025',
    description: 'GetCore UMKM Professional Renewal',
    amount: 'Rp 4.000.000',
    status: 'Paid',
  },
  {
    id: '4',
    date: 'Jul 2025',
    description: 'GetCore Standard Plan Renewal',
    amount: 'Rp 2.000.000',
    status: 'Paid',
  },
  {
    id: '5',
    date: 'Jun 2025',
    description: 'GetCore Standard Plan Renewal',
    amount: 'Rp 2.000.000',
    status: 'Paid',
  },
];

const plans = [
  {
    id: 'free',
    name: 'Konsultasi Gratis',
    price: 'Gratis',
    originalPrice: null,
    discount: null,
    subtitle: 'Tanpa biaya tersembunyi',
    badge: null,
    color: 'green',
    buttonText: 'Mulai Konsultasi',
    buttonVariant: 'outline' as const,
    features: [
      'Konsultasi AI strategy untuk UMKM',
      'Demo aplikasi AI',
      'Analysis kebutuhan bisnis',
      'Roadmap implementasi AI',
      'Support via WhatsApp',
    ],
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: 'Rp 2Jt',
    originalPrice: 'Rp 3Jt',
    discount: '-33%',
    subtitle: 'Paket Implementasi Lengkap',
    badge: 'Paling Populer',
    ribbon: 'Sudah include training',
    color: 'purple',
    buttonText: 'Pilih Paket',
    buttonVariant: 'default' as const,
    features: [
      'AI Chatbot untuk customer service',
      'Otomasi inventory management',
      'Analytics dashboard',
      'Training & onboarding',
      'Support WhatsApp 24/7',
    ],
  },
  {
    id: 'professional',
    name: 'UMKM Professional',
    price: 'Rp 4Jt',
    originalPrice: 'Rp 6Jt',
    discount: '-33%',
    subtitle: 'Paket Implementasi + Setup',
    badge: null,
    ribbon: 'Include custom integration',
    color: 'blue',
    buttonText: 'Pilih Paket',
    buttonVariant: 'default' as const,
    features: [
      'Semua fitur UMKM Starter',
      'Advanced AI automation',
      'Multi-platform integration',
      'Predictive analytics',
      'Dedicated account manager',
    ],
  },
  {
    id: 'enterprise',
    name: 'Corporate Enterprise',
    price: 'Rp 7Jt',
    originalPrice: 'Rp 10Jt',
    discount: '-30%',
    subtitle: 'Paket Enterprise Lengkap',
    badge: null,
    ribbon: 'Include 6 bulan support',
    color: 'amber',
    buttonText: 'Hubungi Sales',
    buttonVariant: 'default' as const,
    features: [
      'Semua fitur Professional',
      'Custom AI model training',
      'White-label solution',
      'API access & integrations',
      'On-premise deployment',
    ],
  },
];

const statusColors = {
  Paid: 'bg-green-100 text-green-700 border-green-200',
  Pending: 'bg-amber-100 text-amber-700 border-amber-200',
  Failed: 'bg-red-100 text-red-700 border-red-200',
};

export function BillingContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const currentPlan = 'UMKM Professional';
  const nextBillingDate = '30 November 2025';
  const agentsUsed = 3;
  const agentsLimit = 5;
  const agentsPercentage = (agentsUsed / agentsLimit) * 100;

  const filteredHistory = mockBillingHistory.filter(item => {
    const matchesSearch = 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleUpgradePlan = () => {
    setUpgradeDialogOpen(true);
  };

  const handleCancelPlan = () => {
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    toast.error('Plan cancellation initiated');
    setCancelDialogOpen(false);
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    toast.success('Plan selected! Redirecting to checkout...');
  };

  const handleDownloadInvoice = (id: string) => {
    toast.success('Downloading invoice...');
  };

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
        <div>
          <h1 className="text-2xl text-gray-900 tracking-tight">
            Billing & Subscription
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola paket berlangganan dan histori pembayaran Anda
          </p>
        </div>
        <Badge className="bg-[#8a25ed] hover:bg-[#8a25ed] text-white text-sm px-4 py-2 w-fit">
          <Star className="w-4 h-4 mr-2" />
          {currentPlan}
        </Badge>
      </div>

      {/* Current Plan Summary */}
      <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg text-gray-900">Current Plan</h2>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Plan: {currentPlan}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Next billing date: <span className="text-gray-900">{nextBillingDate}</span></span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">AI Agents Used</span>
                <span className="text-gray-900">{agentsUsed} / {agentsLimit}</span>
              </div>
              <Progress value={agentsPercentage} className="h-2" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Button
              onClick={handleUpgradePlan}
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Upgrade Plan
            </Button>
            <Button
              variant="outline"
              onClick={handleCancelPlan}
              className="border-gray-200/60 text-gray-700 hover:bg-gray-50"
            >
              Cancel Plan
            </Button>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <h2 className="text-lg text-gray-900">Available Plans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative bg-white border rounded-xl p-5 hover:shadow-xl transition-all duration-300",
                plan.badge ? "border-[#8a25ed] ring-2 ring-[#8a25ed]/20" : "border-gray-200/60"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#8a25ed] hover:bg-[#8a25ed] text-white text-xs px-3 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {plan.ribbon && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-xl">
                  {plan.ribbon}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-xs text-gray-500">{plan.subtitle}</p>
                </div>

                <div>
                  {plan.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-400 line-through">{plan.originalPrice}</span>
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
                        {plan.discount}
                      </Badge>
                    </div>
                  )}
                  <div className="text-2xl text-gray-900">{plan.price}</div>
                  {plan.price !== 'Gratis' && (
                    <p className="text-xs text-gray-500">per bulan</p>
                  )}
                </div>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  variant={plan.buttonVariant}
                  className={cn(
                    "w-full gap-2",
                    plan.buttonVariant === 'default' && "bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
                  )}
                >
                  {plan.id === 'free' && <Phone className="w-4 h-4" />}
                  {plan.id === 'enterprise' && <Phone className="w-4 h-4" />}
                  {plan.id !== 'free' && plan.id !== 'enterprise' && <Zap className="w-4 h-4" />}
                  {plan.buttonText}
                </Button>

                <div className="pt-4 border-t border-gray-200/60 space-y-2.5">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#8a25ed] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg text-gray-900">Billing History</h2>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
              <Input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] w-full sm:w-64"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[160px] bg-white border-gray-200/60">
                <Filter className="w-4 h-4 mr-2" strokeWidth={2} />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white border border-gray-200/60 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="text-xs text-gray-900">Date</TableHead>
                <TableHead className="text-xs text-gray-900">Description</TableHead>
                <TableHead className="text-xs text-gray-900">Amount</TableHead>
                <TableHead className="text-xs text-gray-900">Status</TableHead>
                <TableHead className="text-xs text-gray-900 text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="text-sm text-gray-900">{item.date}</TableCell>
                  <TableCell className="text-xs text-gray-600">{item.description}</TableCell>
                  <TableCell className="text-sm text-gray-900">{item.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${statusColors[item.status]}`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadInvoice(item.id)}
                      className="text-[#8a25ed] hover:text-[#7a1fd9] hover:bg-[#8a25ed]/10 gap-2"
                    >
                      <Download className="w-4 h-4" strokeWidth={2} />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200/60 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-900">{item.date}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
                <Badge variant="outline" className={`text-xs ${statusColors[item.status]}`}>
                  {item.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
                <span className="text-sm text-gray-900">{item.amount}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownloadInvoice(item.id)}
                  className="text-[#8a25ed] hover:text-[#7a1fd9] hover:bg-[#8a25ed]/10 gap-2 h-8 text-xs"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={2} />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#8a25ed]/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#8a25ed]" />
            </div>
            <div>
              <h3 className="text-sm text-gray-900">Payment Method</h3>
              <p className="text-xs text-gray-500 mt-0.5">Visa •••• 4242</p>
              <p className="text-xs text-gray-400 mt-1">Next billing on {nextBillingDate}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-gray-200/60 text-gray-700 hover:bg-gray-50 gap-2 w-full sm:w-auto"
          >
            Change Payment Method
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade Your Plan</DialogTitle>
            <DialogDescription>
              Choose a higher tier plan to unlock more features and capabilities.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              <div className="p-4 border border-gray-200/60 rounded-lg hover:border-[#8a25ed] transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm text-gray-900">Corporate Enterprise</h4>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">-30%</Badge>
                </div>
                <p className="text-xs text-gray-500 mb-2">Rp 7Jt/bulan</p>
                <Button size="sm" className="w-full bg-[#8a25ed] hover:bg-[#7a1fd9] text-white">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription? You will lose access to all premium features.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
              className="border-gray-200/60"
            >
              Keep Plan
            </Button>
            <Button
              onClick={handleConfirmCancel}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Confirm Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
