import { QrCode, Copy, Check, Clock, ArrowLeft, CreditCard, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';

interface PaymentProcessingPageProps {
  paymentMethod: string;
  onBack: () => void;
  onComplete: () => void;
}

export function PaymentProcessingPage({ paymentMethod, onBack, onComplete }: PaymentProcessingPageProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Berhasil disalin!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate payment verification
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  // Mock data based on payment method
  const paymentData = {
    qris: {
      title: 'Scan QR Code',
      description: 'Gunakan aplikasi e-wallet Anda untuk scan QR code',
      qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=GETCORE-INV-2025-001',
    },
    va: {
      title: 'Virtual Account',
      description: 'Transfer ke nomor Virtual Account berikut',
      vaNumber: '8808123456789012',
      bank: 'Bank BCA',
    },
    card: {
      title: 'Pembayaran Kartu',
      description: 'Masukkan detail kartu Anda',
    },
    ewallet: {
      title: 'E-Wallet',
      description: 'Anda akan diarahkan ke aplikasi e-wallet',
    },
  };

  const currentPayment = paymentData[paymentMethod as keyof typeof paymentData] || paymentData.qris;
  const invoiceId = 'GETCORE-INV-2025-001';
  const amount = 'Rp 2.209.900';

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 gap-2 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
          <h1 className="text-3xl text-gray-900 mb-2">Menunggu Pembayaran</h1>
          <p className="text-gray-600">Selesaikan pembayaran sebelum waktu habis</p>
        </div>

        {/* Timer Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">Waktu Tersisa</p>
                <p className="text-3xl text-amber-600 tabular-nums">{formatTime(timeLeft)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 mb-1">Invoice ID</p>
              <p className="text-sm text-gray-900 font-mono">{invoiceId}</p>
            </div>
          </div>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg mb-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-gray-900 mb-2">{currentPayment.title}</h2>
            <p className="text-gray-600">{currentPayment.description}</p>
          </div>

          {/* QRIS Method */}
          {paymentMethod === 'qris' && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg">
                  <img
                    src={currentPayment.qrUrl}
                    alt="QR Code"
                    className="w-64 h-64"
                  />
                </div>
              </div>
              <div className="bg-[#8a25ed]/5 rounded-xl p-4 border border-[#8a25ed]/20">
                <p className="text-center text-sm text-gray-700">
                  Scan QR code dengan aplikasi: DANA, OVO, GoPay, ShopeePay, atau aplikasi mobile banking
                </p>
              </div>
            </div>
          )}

          {/* Virtual Account Method */}
          {paymentMethod === 'va' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Building2 className="w-8 h-8 text-blue-600" strokeWidth={2} />
                  <p className="text-lg text-gray-900">{currentPayment.bank}</p>
                </div>
                <div className="bg-white rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-600 mb-2 text-center">Nomor Virtual Account</p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-2xl text-gray-900 font-mono tracking-wider">{currentPayment.vaNumber}</p>
                    <Button
                      onClick={() => handleCopy(currentPayment.vaNumber!)}
                      size="sm"
                      variant="ghost"
                      className="flex-shrink-0"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-xs text-gray-600 mb-2 text-center">Jumlah Transfer</p>
                  <p className="text-3xl text-gray-900 text-center">{amount}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-900">Cara Transfer:</p>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#8a25ed]/10 rounded-full flex items-center justify-center text-xs text-[#8a25ed]">1</span>
                    <span>Buka aplikasi mobile banking atau ATM</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#8a25ed]/10 rounded-full flex items-center justify-center text-xs text-[#8a25ed]">2</span>
                    <span>Pilih menu Transfer ke Virtual Account</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#8a25ed]/10 rounded-full flex items-center justify-center text-xs text-[#8a25ed]">3</span>
                    <span>Masukkan nomor Virtual Account di atas</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#8a25ed]/10 rounded-full flex items-center justify-center text-xs text-[#8a25ed]">4</span>
                    <span>Transfer sesuai jumlah yang tertera</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#8a25ed]/10 rounded-full flex items-center justify-center text-xs text-[#8a25ed]">5</span>
                    <span>Simpan bukti transfer Anda</span>
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Card Payment Method */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <CreditCard className="w-12 h-12 mb-6 opacity-80" strokeWidth={1.5} />
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Kartu Anda akan dikenakan biaya {amount}
              </p>
            </div>
          )}

          {/* E-Wallet Method */}
          {paymentMethod === 'ewallet' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {['DANA', 'OVO', 'ShopeePay', 'GoPay'].map((wallet) => (
                  <button
                    key={wallet}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#8a25ed] hover:bg-[#8a25ed]/5 transition-all"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                      <span className="text-lg">{wallet[0]}</span>
                    </div>
                    <p className="text-sm text-gray-900">{wallet}</p>
                  </button>
                ))}
              </div>
              <div className="bg-[#8a25ed]/5 rounded-xl p-4 border border-[#8a25ed]/20">
                <p className="text-sm text-gray-700 text-center">
                  Pilih e-wallet untuk melanjutkan ke aplikasi pembayaran
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            className="w-full h-12 bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white rounded-xl shadow-lg shadow-[#8a25ed]/20"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Memeriksa Pembayaran...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                Saya Sudah Bayar
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Pembayaran akan dikonfirmasi otomatis dalam 1-5 menit
          </p>
        </div>
      </div>
    </div>
  );
}
