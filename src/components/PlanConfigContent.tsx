import { useState, useCallback } from 'react';
import { Plus, Eye, Edit, Trash2, Package, RefreshCw, Star, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { PlanFormDialog } from './PlanFormDialog';
import { PlanPreviewModal } from './PlanPreviewModal';
import { toast } from 'sonner@2.0.3';

export interface Plan {
  id: string;
  name: string;
  type: 'implementation' | 'maintenance';
  price: number;
  originalPrice: number;
  discount: number;
  period?: string;
  subtitle: string;
  ctaText: string;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  icon?: string;
}

const initialImplementationPlans: Plan[] = [
  {
    id: '1',
    name: 'Standard Plan',
    type: 'implementation',
    price: 2000000,
    originalPrice: 3000000,
    discount: 33,
    subtitle: 'Paket Implementasi Lengkap',
    ctaText: 'Pilih Paket',
    features: [
      'AI Chatbot untuk customer service',
      'Otomasi inventory management',
      'Analytics dashboard',
      'Training & onboarding',
    ],
    isPopular: false,
    isActive: true,
  },
  {
    id: '2',
    name: 'UMKM Professional',
    type: 'implementation',
    price: 4000000,
    originalPrice: 6000000,
    discount: 33,
    subtitle: 'Paket Implementasi + Setup',
    ctaText: 'Pilih Paket',
    features: [
      'Semua fitur UMKM Starter',
      'Advanced AI automation',
      'Multi-platform integration',
      'Dedicated account manager',
    ],
    isPopular: false,
    isActive: true,
  },
  {
    id: '3',
    name: 'Corporate Enterprise',
    type: 'implementation',
    price: 7000000,
    originalPrice: 10000000,
    discount: 30,
    subtitle: 'Paket Enterprise Lengkap',
    ctaText: 'Hubungi Sales',
    features: [
      'Semua fitur Professional',
      'Custom AI model training',
      'White-label solution',
      'API access & integrations',
    ],
    isPopular: false,
    isActive: true,
  },
];

const initialMaintenancePlans: Plan[] = [
  {
    id: '4',
    name: 'Starter Maintenance',
    type: 'maintenance',
    price: 400000,
    originalPrice: 400000,
    discount: 0,
    period: '/Bulan',
    subtitle: 'Maintenance dasar',
    ctaText: 'Pilih Paket',
    features: [
      'Bug fixes & security patches',
      'Monthly system updates',
      'Email support (48 jam)',
      'Monthly backup',
    ],
    isPopular: false,
    isActive: true,
  },
  {
    id: '5',
    name: 'Professional Maintenance',
    type: 'maintenance',
    price: 800000,
    originalPrice: 800000,
    discount: 0,
    period: '/Bulan',
    subtitle: 'Maintenance professional',
    ctaText: 'Pilih Paket',
    features: [
      'Semua fitur Starter',
      'Priority support (24 jam)',
      'Weekly backup',
      'Database optimization',
    ],
    isPopular: true,
    isActive: true,
  },
  {
    id: '6',
    name: 'Enterprise Maintenance',
    type: 'maintenance',
    price: 1500000,
    originalPrice: 1500000,
    discount: 0,
    period: '/Bulan',
    subtitle: 'Maintenance enterprise',
    ctaText: 'Pilih Paket',
    features: [
      'Semua fitur Professional',
      '24/7 phone support',
      'Daily backup',
      'SLA guarantee (99.9%)',
    ],
    isPopular: false,
    isActive: true,
  },
];

export function PlanConfigContent() {
  const [implementationPlans, setImplementationPlans] = useState<Plan[]>(initialImplementationPlans);
  const [maintenancePlans, setMaintenancePlans] = useState<Plan[]>(initialMaintenancePlans);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState<'implementation' | 'maintenance'>('implementation');

  const handleAddPlan = (type: 'implementation' | 'maintenance') => {
    setSelectedPlan({
      id: Date.now().toString(),
      name: '',
      type,
      price: 0,
      originalPrice: 0,
      discount: 0,
      period: type === 'maintenance' ? '/Bulan' : undefined,
      subtitle: '',
      ctaText: 'Pilih Paket',
      features: [],
      isPopular: false,
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsFormOpen(true);
  };

  const handleDeletePlan = (planId: string, type: 'implementation' | 'maintenance') => {
    if (type === 'implementation') {
      setImplementationPlans(implementationPlans.filter((p) => p.id !== planId));
    } else {
      setMaintenancePlans(maintenancePlans.filter((p) => p.id !== planId));
    }
    toast.success('Plan deleted successfully');
  };

  const handleToggleActive = (planId: string, type: 'implementation' | 'maintenance') => {
    if (type === 'implementation') {
      setImplementationPlans(
        implementationPlans.map((p) => (p.id === planId ? { ...p, isActive: !p.isActive } : p))
      );
    } else {
      setMaintenancePlans(
        maintenancePlans.map((p) => (p.id === planId ? { ...p, isActive: !p.isActive } : p))
      );
    }
    toast.success('Plan status updated');
  };

  const handleTogglePopular = (planId: string, type: 'implementation' | 'maintenance') => {
    if (type === 'implementation') {
      setImplementationPlans(
        implementationPlans.map((p) => (p.id === planId ? { ...p, isPopular: !p.isPopular } : p))
      );
    } else {
      setMaintenancePlans(
        maintenancePlans.map((p) => (p.id === planId ? { ...p, isPopular: !p.isPopular } : p))
      );
    }
    toast.success('Popular status updated');
  };

  const handleSavePlan = (plan: Plan) => {
    if (plan.type === 'implementation') {
      const exists = implementationPlans.find((p) => p.id === plan.id);
      if (exists) {
        setImplementationPlans(implementationPlans.map((p) => (p.id === plan.id ? plan : p)));
        toast.success('Plan updated successfully');
      } else {
        setImplementationPlans([...implementationPlans, plan]);
        toast.success('Plan created successfully');
      }
    } else {
      const exists = maintenancePlans.find((p) => p.id === plan.id);
      if (exists) {
        setMaintenancePlans(maintenancePlans.map((p) => (p.id === plan.id ? plan : p)));
        toast.success('Plan updated successfully');
      } else {
        setMaintenancePlans([...maintenancePlans, plan]);
        toast.success('Plan created successfully');
      }
    }
    setIsFormOpen(false);
  };

  const handlePreview = (type: 'implementation' | 'maintenance') => {
    setPreviewType(type);
    setIsPreviewOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderPlanCard = (plan: Plan) => (
    <div
      key={plan.id}
      className="bg-white border border-gray-200/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900">{plan.name}</h3>
            {plan.isPopular && (
              <Badge className="bg-[#8a25ed] text-white text-xs px-2 py-0.5">Popular</Badge>
            )}
            {!plan.isActive && (
              <Badge variant="outline" className="text-xs px-2 py-0.5 text-gray-500">
                Inactive
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500">{plan.subtitle}</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditPlan(plan)}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-4 h-4 text-gray-600" strokeWidth={2} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeletePlan(plan.id, plan.type)}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="w-4 h-4 text-red-500" strokeWidth={2} />
          </Button>
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#8a25ed]">
            {formatPrice(plan.price)}
          </span>
          {plan.period && <span className="text-sm text-gray-500">{plan.period}</span>}
        </div>
        {plan.discount > 0 && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(plan.originalPrice)}
            </span>
            <span className="text-xs font-medium text-red-500">-{plan.discount}%</span>
          </div>
        )}
      </div>

      {/* Features Preview */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">{plan.features.length} features</p>
        <div className="space-y-1">
          {plan.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#8a25ed] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
              <span className="text-xs text-gray-600 line-clamp-1">{feature}</span>
            </div>
          ))}
          {plan.features.length > 3 && (
            <p className="text-xs text-gray-400 pl-5">+{plan.features.length - 3} more</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 flex-1">
          <Switch
            checked={plan.isActive}
            onCheckedChange={() => handleToggleActive(plan.id, plan.type)}
          />
          <span className="text-xs text-gray-600">Active</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleTogglePopular(plan.id, plan.type)}
          className="text-xs"
        >
          <Star
            className={`w-3 h-3 mr-1 ${plan.isPopular ? 'fill-yellow-400 text-yellow-400' : ''}`}
            strokeWidth={2}
          />
          {plan.isPopular ? 'Popular' : 'Set Popular'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">Plan Configuration</h1>
          <p className="text-sm text-gray-600">
            Manage pricing plans, features, and packages for your customers
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="implementation" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="implementation">Implementation Plans</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Plans</TabsTrigger>
        </TabsList>

        {/* Implementation Plans */}
        <TabsContent value="implementation" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => handleAddPlan('implementation')}
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              <Plus className="w-4 h-4 mr-2" strokeWidth={2.5} />
              Add Implementation Plan
            </Button>
            <Button
              onClick={() => handlePreview('implementation')}
              variant="outline"
              className="border-[#8a25ed] text-[#8a25ed] hover:bg-[#8a25ed]/5"
            >
              <Eye className="w-4 h-4 mr-2" strokeWidth={2} />
              Preview Shop
            </Button>
          </div>

          {implementationPlans.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-semibold text-gray-900 mb-2">No Implementation Plans</h3>
              <p className="text-sm text-gray-500 mb-6">
                Get started by creating your first implementation plan
              </p>
              <Button
                onClick={() => handleAddPlan('implementation')}
                className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
              >
                <Plus className="w-4 h-4 mr-2" strokeWidth={2.5} />
                Add Plan
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {implementationPlans.map(renderPlanCard)}
            </div>
          )}
        </TabsContent>

        {/* Maintenance Plans */}
        <TabsContent value="maintenance" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => handleAddPlan('maintenance')}
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              <Plus className="w-4 h-4 mr-2" strokeWidth={2.5} />
              Add Maintenance Plan
            </Button>
            <Button
              onClick={() => handlePreview('maintenance')}
              variant="outline"
              className="border-[#8a25ed] text-[#8a25ed] hover:bg-[#8a25ed]/5"
            >
              <Eye className="w-4 h-4 mr-2" strokeWidth={2} />
              Preview Shop
            </Button>
          </div>

          {maintenancePlans.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
              <RefreshCw className="w-12 h-12 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-semibold text-gray-900 mb-2">No Maintenance Plans</h3>
              <p className="text-sm text-gray-500 mb-6">
                Get started by creating your first maintenance plan
              </p>
              <Button
                onClick={() => handleAddPlan('maintenance')}
                className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
              >
                <Plus className="w-4 h-4 mr-2" strokeWidth={2.5} />
                Add Plan
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {maintenancePlans.map(renderPlanCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Plan Form Dialog */}
      {selectedPlan && (
        <PlanFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          plan={selectedPlan}
          onSave={handleSavePlan}
        />
      )}

      {/* Preview Modal */}
      <PlanPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        plans={previewType === 'implementation' ? implementationPlans : maintenancePlans}
        type={previewType}
      />
    </div>
  );
}