import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Plan } from './PlanConfigContent';

interface PlanFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
  onSave: (plan: Plan) => void;
}

export function PlanFormDialog({ isOpen, onClose, plan, onSave }: PlanFormDialogProps) {
  const [formData, setFormData] = useState<Plan>(plan);
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    setFormData(plan);
    setNewFeature('');
  }, [plan, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate discount if prices are set
    const discount = formData.originalPrice > 0
      ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
      : 0;
    
    onSave({ ...formData, discount });
    setNewFeature('');
  };

  const handleClose = () => {
    setNewFeature('');
    onClose();
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formData.name ? `Edit ${formData.name}` : `Add New ${formData.type === 'implementation' ? 'Implementation' : 'Maintenance'} Plan`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Standard Plan"
                required
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Paket Implementasi Lengkap"
                required
              />
            </div>

            <div>
              <Label htmlFor="ctaText">CTA Button Text</Label>
              <Input
                id="ctaText"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                placeholder="e.g. Pilih Paket"
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Pricing</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="originalPrice">Original Price (Rp)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: Number(e.target.value) })
                  }
                  placeholder="e.g. 3000000"
                  required
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="price">Discounted Price (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="e.g. 2000000"
                  required
                  min="0"
                />
              </div>
            </div>

            {formData.type === 'maintenance' && (
              <div>
                <Label htmlFor="period">Period (optional)</Label>
                <Input
                  id="period"
                  value={formData.period || ''}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="e.g. /Bulan"
                />
              </div>
            )}

            {formData.originalPrice > 0 && formData.price > 0 && (
              <div className="p-3 bg-[#8a25ed]/5 border border-[#8a25ed]/20 rounded-lg">
                <p className="text-sm text-gray-700">
                  Discount:{' '}
                  <span className="font-semibold text-[#8a25ed]">
                    {Math.round(
                      ((formData.originalPrice - formData.price) / formData.originalPrice) * 100
                    )}
                    %
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Features</h3>
            
            {/* Feature List */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg group"
                >
                  <span className="flex-1 text-sm text-gray-700">{feature}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFeature(index)}
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" strokeWidth={2} />
                  </Button>
                </div>
              ))}
              
              {formData.features.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No features added yet</p>
              )}
            </div>

            {/* Add Feature */}
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a new feature"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddFeature}
                variant="outline"
                className="flex-shrink-0"
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
              </Button>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Settings</h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="mb-0">Mark as Popular</Label>
                <p className="text-xs text-gray-500">Show "Most Popular" badge</p>
              </div>
              <Switch
                checked={formData.isPopular}
                onCheckedChange={(checked) => setFormData({ ...formData, isPopular: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="mb-0">Active Status</Label>
                <p className="text-xs text-gray-500">Show plan to customers</p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              Save Plan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}