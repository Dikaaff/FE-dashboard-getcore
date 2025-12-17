import { Check, Sparkles, TrendingUp, Crown, Zap, Package, PhoneCall } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface ShopContentProps {
  onCheckout?: (planId: string) => void;
}

export function ShopContent({ onCheckout }: ShopContentProps) {
  const [activeTab, setActiveTab] = useState<'implementation' | 'maintenance'>('implementation');

  const implementationPlans = [
    {
      id: 'consultation',
      name: 'Konsultasi Gratis',
      price: 'Gratis',
      originalPrice: null,
      discount: null,
      subtitle: 'Tanpa biaya tersembunyi',
      icon: Sparkles,
      iconColor: 'text-gray-600',
      bgColor: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      features: [
        'Konsultasi AI strategy untuk UMKM',
        'Demo aplikasi AI',
        'Analysis kebutuhan bisnis',
        'Roadmap implementasi AI',
        'Support via WhatsApp',
      ],
      cta: 'Mulai Konsultasi',
      popular: false,
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: 'Rp 2Jt',
      originalPrice: 'Rp 3Jt',
      discount: '33%',
      subtitle: 'Paket Implementasi Lengkap',
      subtext: 'Sudah include training',
      icon: TrendingUp,
      iconColor: 'text-[#8a25ed]',
      bgColor: 'from-[#8a25ed]/5 to-purple-50',
      borderColor: 'border-[#8a25ed]/30',
      features: [
        'AI Chatbot untuk customer service',
        'Otomasi inventory management',
        'Analytics dashboard',
        'Training & onboarding',
        'Support WhatsApp 24/7',
      ],
      cta: 'Pilih Paket',
      popular: true,
      badge: 'Paling Populer',
    },
    {
      id: 'professional',
      name: 'UMKM Professional',
      price: 'Rp 4Jt',
      originalPrice: 'Rp 6Jt',
      discount: '33%',
      subtitle: 'Paket Implementasi + Setup',
      subtext: 'Include custom integration',
      icon: Crown,
      iconColor: 'text-amber-600',
      bgColor: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200',
      features: [
        'Semua fitur UMKM Starter',
        'Advanced AI automation',
        'Multi-platform integration',
        'Predictive analytics',
        'Dedicated account manager',
      ],
      cta: 'Pilih Paket',
      popular: false,
    },
    {
      id: 'enterprise',
      name: 'Corporate Enterprise',
      price: 'Rp 7Jt',
      originalPrice: 'Rp 10Jt',
      discount: '30%',
      subtitle: 'Paket Enterprise Lengkap',
      subtext: 'Include 6 bulan support',
      icon: Zap,
      iconColor: 'text-blue-600',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      features: [
        'Semua fitur Professional',
        'Custom AI model training',
        'White-label solution',
        'API access & integrations',
        'On-premise deployment',
      ],
      cta: 'Hubungi Sales',
      popular: false,
    },
  ];

  const maintenancePlans = [
    {
      id: 'starter-maintenance',
      name: 'Starter Maintenance',
      price: 'Rp 400rb',
      period: '/Bulan',
      subtitle: 'maintenance dasar',
      icon: Package,
      iconColor: 'text-gray-600',
      bgColor: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      features: [
        'Bug fixes & security patches',
        'Monthly system updates',
        'Email support (48 jam)',
        'Basic performance monitoring',
        'Monthly backup (1x/bulan)',
        'WhatsApp support',
        'Custom integration support',
      ],
      cta: 'Pilih Paket',
      popular: false,
    },
    {
      id: 'professional-maintenance',
      name: 'Professional Maintenance',
      price: 'Rp 800rb',
      period: '/Bulan',
      subtitle: 'maintenance professional',
      icon: TrendingUp,
      iconColor: 'text-[#8a25ed]',
      bgColor: 'from-[#8a25ed]/5 to-purple-50',
      borderColor: 'border-[#8a25ed]/30',
      features: [
        'Semua fitur Starter Maintenance',
        'Priority email support (24 jam)',
        'WhatsApp support (jam kerja)',
        'Weekly backup (4x/bulan)',
        'Advanced performance monitoring',
        'Minor feature updates',
        'Database optimization (monthly)',
        '24/7 phone support',
      ],
      cta: 'Pilih Paket',
      popular: true,
      badge: 'Most Popular',
    },
    {
      id: 'enterprise-maintenance',
      name: 'Enterprise Maintenance',
      price: 'Rp 1.5jt',
      period: '/Bulan',
      subtitle: 'maintenance enterprise',
      icon: Crown,
      iconColor: 'text-amber-600',
      bgColor: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200',
      features: [
        'Semua fitur Professional Maintenance',
        '24/7 phone & WhatsApp support',
        'Daily backup (30x/bulan)',
        'Real-time monitoring & alerts',
        'Custom integration support',
        'Dedicated account manager',
        'SLA guarantee (99.9% uptime)',
        'Emergency hotfix deployment',
        'Quarterly strategy consultation',
      ],
      cta: 'Pilih Paket',
      popular: false,
    },
  ];

  return (
    <div className="p-6 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl text-gray-900 mb-4">Pilih Paket GetCore</h1>
        <p className="text-lg text-gray-600">
          Tingkatkan produktivitas dengan paket implementasi dan maintenance yang sesuai dengan kebutuhan bisnis Anda.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'implementation' ? 'bg-[#8a25ed] text-white' : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setActiveTab('implementation')}
        >
          Paket Implementasi
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'maintenance' ? 'bg-[#8a25ed] text-white' : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setActiveTab('maintenance')}
        >
          Paket Maintenance
        </button>
      </div>

      {/* Paket Implementasi Section */}
      {activeTab === 'implementation' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl text-gray-900 mb-3">Paket Implementasi</h2>
            <p className="text-gray-600">Pilihan paket untuk implementasi AI di bisnis Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {implementationPlans.map((plan) => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-3xl border-2 ${plan.borderColor} p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col ${
                    plan.popular ? 'ring-2 ring-[#8a25ed] ring-offset-2' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] text-white px-4 py-1.5 rounded-full text-xs shadow-lg">
                        ⭐ {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${plan.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-sm mx-auto`}>
                    <Icon className={`w-7 h-7 ${plan.iconColor}`} strokeWidth={2} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl text-gray-900 mb-3 text-center font-semibold">{plan.name}</h3>

                  {/* Price */}
                  <div className="mb-4 text-center">
                    {plan.originalPrice ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-2xl text-gray-900 font-bold">{plan.price}</p>
                          {plan.discount && (
                            <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-lg text-xs font-semibold">
                              -{plan.discount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 line-through">{plan.originalPrice}</p>
                      </div>
                    ) : (
                      <p className="text-2xl text-gray-900 font-bold">{plan.price}</p>
                    )}
                  </div>

                  {/* Subtitle */}
                  <p className="text-sm text-gray-600 mb-2 text-center">{plan.subtitle}</p>
                  {plan.subtext && (
                    <p className="text-xs text-[#8a25ed] mb-4 text-center">{plan.subtext}</p>
                  )}

                  {/* CTA Button */}
                  <Button
                    onClick={() => onCheckout?.(plan.id)}
                    className={`w-full h-11 rounded-xl mb-6 transition-all text-sm ${
                      plan.id === 'consultation'
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : plan.popular
                        ? 'bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white shadow-lg shadow-[#8a25ed]/20'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-[#8a25ed] hover:text-[#8a25ed]'
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  {/* Features List */}
                  <div className="space-y-3 flex-1">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                        </div>
                        <p className="text-sm text-gray-700 leading-tight">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Paket Maintenance Section */}
      {activeTab === 'maintenance' && (
        <div className="space-y-6 pt-12 border-t border-gray-200">
          <div className="text-center">
            <h2 className="text-3xl text-gray-900 mb-3">Paket Maintenance</h2>
            <p className="text-gray-600">Jaga sistem Anda tetap optimal dengan paket maintenance kami</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {maintenancePlans.map((plan) => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-3xl border-2 ${plan.borderColor} p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col ${
                    plan.popular ? 'ring-2 ring-[#8a25ed] ring-offset-2' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] text-white px-4 py-1.5 rounded-full text-xs shadow-lg">
                        ⭐ {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${plan.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-sm mx-auto`}>
                    <Icon className={`w-7 h-7 ${plan.iconColor}`} strokeWidth={2} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl text-gray-900 mb-3 text-center font-semibold">{plan.name}</h3>

                  {/* Price */}
                  <div className="mb-4 text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <p className="text-2xl text-gray-900 font-bold">{plan.price}</p>
                      <p className="text-sm text-gray-500">{plan.period}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{plan.subtitle}</p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => onCheckout?.(plan.id)}
                    className={`w-full h-11 rounded-xl mb-6 transition-all text-sm ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white shadow-lg shadow-[#8a25ed]/20'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-[#8a25ed] hover:text-[#8a25ed]'
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  {/* Features List */}
                  <div className="space-y-3 flex-1">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                        </div>
                        <p className="text-sm text-gray-700 leading-tight">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}