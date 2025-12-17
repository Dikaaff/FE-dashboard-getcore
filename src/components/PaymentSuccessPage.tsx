import { CheckCircle2, Download, Calendar, Package, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface PaymentSuccessPageProps {
  onNavigateToDashboard: () => void;
  onNavigateToAgents?: () => void;
}

export function PaymentSuccessPage({ onNavigateToDashboard, onNavigateToAgents }: PaymentSuccessPageProps) {
  const invoiceId = 'GETCORE-INV-2025-001';
  const planName = 'Standard Plan';
  const activationDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDownloadInvoice = () => {
    // Mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `invoice-${invoiceId}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Success Animation Container */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 animate-in zoom-in duration-500 shadow-xl shadow-green-500/30">
            <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl text-gray-900 mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Pembayaran Berhasil! 🎉
          </h1>
          <p className="text-lg text-gray-600 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Terima kasih telah berlangganan GetCore
          </p>
        </div>

        {/* Success Details Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="space-y-6">
            {/* Plan Activated */}
            <div className="bg-gradient-to-br from-[#8a25ed]/5 to-purple-50 rounded-2xl p-6 border border-[#8a25ed]/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#8a25ed] to-[#6a1fb3] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#8a25ed]/30">
                  <Package className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Paket Aktif</p>
                  <p className="text-2xl text-gray-900 mb-3">{planName}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tanggal Aktivasi</p>
                      <p className="text-sm text-gray-900">{activationDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Berlaku Hingga</p>
                      <p className="text-sm text-gray-900">{expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Invoice ID</p>
                  <p className="text-lg text-gray-900 font-mono">{invoiceId}</p>
                </div>
                <Button
                  onClick={handleDownloadInvoice}
                  variant="outline"
                  className="gap-2 border-2 hover:border-[#8a25ed] hover:text-[#8a25ed]"
                >
                  <Download className="w-4 h-4" />
                  Download Invoice
                </Button>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Metode Pembayaran</p>
                    <p className="text-gray-900">QRIS</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-green-600">Lunas</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Total Pembayaran</p>
                    <p className="text-gray-900">Rp 2.209.900</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Tanggal Pembayaran</p>
                    <p className="text-gray-900">{activationDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Confirmation Notice */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-blue-600" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-blue-900 mb-1">Email Konfirmasi Terkirim</p>
                <p className="text-xs text-blue-700">
                  Kami telah mengirimkan detail invoice dan informasi langganan ke email Anda.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8a25ed]" strokeWidth={2} />
            Langkah Selanjutnya
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-[#8a25ed]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-[#8a25ed]">1</span>
              </div>
              <div>
                <p className="text-sm text-gray-900 mb-1">Konfigurasi AI Agent Anda</p>
                <p className="text-xs text-gray-600">
                  Mulai setup AI assistant untuk customer service otomatis
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-[#8a25ed]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-[#8a25ed]">2</span>
              </div>
              <div>
                <p className="text-sm text-gray-900 mb-1">Import Data Customer</p>
                <p className="text-xs text-gray-600">
                  Upload data customer Anda untuk memulai pengelolaan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-[#8a25ed]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-[#8a25ed]">3</span>
              </div>
              <div>
                <p className="text-sm text-gray-900 mb-1">Undang Tim Anda</p>
                <p className="text-xs text-gray-600">
                  Tambahkan anggota tim untuk kolaborasi lebih baik
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <Button
            onClick={onNavigateToDashboard}
            className="w-full h-12 bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white rounded-xl shadow-lg shadow-[#8a25ed]/20 gap-2"
          >
            Kembali ke Dashboard
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            onClick={onNavigateToAgents}
            variant="outline"
            className="w-full h-12 border-2 hover:border-[#8a25ed] hover:text-[#8a25ed] hover:bg-[#8a25ed]/5 rounded-xl gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Setup AI Agent
          </Button>
        </div>

        {/* Support Contact */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Butuh bantuan?{' '}
            <a href="#" className="text-[#8a25ed] hover:underline">
              Hubungi customer support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
