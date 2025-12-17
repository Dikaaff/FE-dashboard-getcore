import { CreditCard, Building2, QrCode, Wallet, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';

interface CheckoutPageProps {
  planId: string;
  onBack: () => void;
  onProceed: (paymentMethod: string) => void;
}

export function CheckoutPage({ planId, onBack, onProceed }: CheckoutPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    notes: '',
  });

  // Plan details mapping
  const planDetails = {
    standard: {
      name: 'Standard Plan',
      price: 1990000,
      duration: '1 Tahun',
      features: ['100 AI Chat/hari', '50 Tickets', '5 Users', 'Priority Support'],
    },
    professional: {
      name: 'Professional Plan',
      price: 4990000,
      duration: '1 Tahun',
      features: ['Unlimited AI Chat', 'Unlimited Tickets', '25 Users', '24/7 Support'],
    },
    enterprise: {
      name: 'Enterprise Plan',
      price: 0,
      duration: 'Custom',
      features: ['Custom solutions', 'Unlimited everything', 'Dedicated support'],
    },
  };

  const plan = planDetails[planId as keyof typeof planDetails] || planDetails.standard;
  const tax = plan.price * 0.11; // PPN 11%
  const total = plan.price + tax;

  const paymentMethods = [
    {
      id: 'qris',
      name: 'QRIS',
      icon: QrCode,
      description: 'Scan & bayar dengan e-wallet',
      popular: true,
    },
    {
      id: 'va',
      name: 'Virtual Account',
      icon: Building2,
      description: 'BCA, BRI, Mandiri, BNI',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, JCB',
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      icon: Wallet,
      description: 'DANA, OVO, ShopeePay, GoPay',
    },
  ];

  const handleProceed = () => {
    if (!selectedMethod || !formData.fullName || !formData.email) {
      return;
    }
    onProceed(selectedMethod);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 gap-2 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Shop
          </Button>
          <h1 className="text-3xl text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Selesaikan pembelian Anda dengan aman</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl text-gray-900 mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#8a25ed]" strokeWidth={2} />
                Informasi Pembeli
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Nama Lengkap *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Nama Perusahaan (Opsional)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="PT. Example Indonesia"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Catatan Pembelian (Opsional)</Label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tambahkan catatan untuk tim kami..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8a25ed] focus:border-transparent resize-none mt-1.5"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#8a25ed]" strokeWidth={2} />
                Metode Pembayaran
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                        selectedMethod === method.id
                          ? 'border-[#8a25ed] bg-[#8a25ed]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {method.popular && (
                        <div className="absolute -top-2 -right-2 bg-[#8a25ed] text-white px-2 py-0.5 rounded-full text-xs">
                          Popular
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedMethod === method.id
                            ? 'bg-[#8a25ed]/10'
                            : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            selectedMethod === method.id ? 'text-[#8a25ed]' : 'text-gray-600'
                          }`} strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-0.5">{method.name}</p>
                          <p className="text-xs text-gray-500">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 rounded-xl border border-green-200 p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <p className="text-sm text-green-900 mb-1">Pembayaran Aman & Terenkripsi</p>
                <p className="text-xs text-green-700">
                  Transaksi Anda dilindungi dengan enkripsi SSL 256-bit dan diproses melalui payment gateway terpercaya.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-6">
              <h2 className="text-xl text-gray-900 mb-6">Ringkasan Pesanan</h2>
              
              {/* Plan Details */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-900 mb-1">{plan.name}</p>
                    <p className="text-xs text-gray-500">{plan.duration}</p>
                  </div>
                  <p className="text-sm text-gray-900">{formatPrice(plan.price)}</p>
                </div>
                
                <div className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1 h-1 bg-[#8a25ed] rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(plan.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">PPN (11%)</span>
                  <span className="text-gray-900">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-gray-900">Total</span>
                  <span className="text-xl text-gray-900">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Proceed Button */}
              <Button
                onClick={handleProceed}
                disabled={!selectedMethod || !formData.fullName || !formData.email}
                className="w-full h-12 bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white rounded-xl shadow-lg shadow-[#8a25ed]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="w-4 h-4 mr-2" />
                Lanjut ke Pembayaran
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Dengan melanjutkan, Anda menyetujui{' '}
                <a href="#" className="text-[#8a25ed] hover:underline">Terms of Service</a>
                {' '}dan{' '}
                <a href="#" className="text-[#8a25ed] hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
