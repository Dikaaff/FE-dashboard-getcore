import { X, Check, Star } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plan } from './PlanConfigContent';

interface PlanPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: Plan[];
  type: 'implementation' | 'maintenance';
}

export function PlanPreviewModal({ isOpen, onClose, plans, type }: PlanPreviewModalProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `Rp ${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}Jt`;
    } else if (price >= 1000) {
      return `Rp ${(price / 1000).toFixed(0)}rb`;
    }
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const activePlans = plans.filter((plan) => plan.isActive);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] lg:max-w-7xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="font-semibold text-gray-900 text-sm sm:text-base">
              Preview - {type === 'implementation' ? 'Implementation' : 'Maintenance'} Plans
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
              This is how customers will see your pricing plans
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 flex-shrink-0">
            <X className="w-4 h-4" strokeWidth={2} />
          </Button>
        </div>

        {/* Preview Content */}
        <div className="p-4 sm:p-6 lg:p-12 bg-gradient-to-br from-[#f7f7f7] via-white to-purple-50/30">
          {activePlans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No active plans to preview</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
              {activePlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                    plan.isPopular
                      ? 'border-2 border-[#8a25ed] shadow-xl shadow-[#8a25ed]/10'
                      : 'border border-gray-200/60 shadow-lg'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] text-white text-xs font-semibold px-4 py-1.5 shadow-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" strokeWidth={2} />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {/* Plan Name */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                        {formatPrice(plan.price)}
                      </span>
                      {plan.period && (
                        <span className="text-sm text-gray-500">{plan.period}</span>
                      )}
                    </div>
                    
                    {plan.discount > 0 && (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(plan.originalPrice)}
                        </span>
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-600 border-red-200 text-xs"
                        >
                          -{plan.discount}%
                        </Badge>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2">{plan.subtitle}</p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full mb-6 py-6 rounded-2xl font-semibold ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white shadow-lg shadow-[#8a25ed]/20'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {plan.ctaText}
                  </Button>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#8a25ed]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check
                            className="w-3 h-3 text-[#8a25ed]"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {activePlans.length} active plan{activePlans.length !== 1 ? 's' : ''} displayed
          </p>
          <Button
            onClick={onClose}
            className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
          >
            Close Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}