import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Customer } from './CustomerManagementContent';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (customer: Customer) => void;
  customer?: Customer;
}

const availableLabels = ['VIP', 'Active', 'Trial', 'New', 'Referral', 'Premium', 'Inactive'];

export function AddCustomerDialog({ open, onOpenChange, onSave, customer }: AddCustomerDialogProps) {
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    phone: '',
    email: '',
    planType: 'Standard',
    labels: [],
    customFields: {},
    notes: [],
  });
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<{ key: string; value: string }[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (customer) {
      setFormData(customer);
      setSelectedLabels(customer.labels || []);
      setCustomFields(
        Object.entries(customer.customFields || {}).map(([key, value]) => ({ key, value }))
      );
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        planType: 'Standard',
        labels: [],
        customFields: {},
        notes: [],
      });
      setSelectedLabels([]);
      setCustomFields([]);
      setNewNote('');
    }
  }, [customer, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const customFieldsObj = customFields.reduce((acc, field) => {
      if (field.key && field.value) {
        acc[field.key] = field.value;
      }
      return acc;
    }, {} as { [key: string]: string });

    const customerData: Customer = {
      id: customer?.id || '',
      name: formData.name || '',
      phone: formData.phone || '',
      email: formData.email || '',
      planType: (formData.planType || 'Standard') as Customer['planType'],
      labels: selectedLabels,
      createdAt: customer?.createdAt || new Date().toISOString().split('T')[0],
      customFields: customFieldsObj,
      notes: customer?.notes || [],
    };

    onSave(customerData);
    onOpenChange(false);
  };

  const toggleLabel = (label: string) => {
    setSelectedLabels(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const updateCustomField = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...customFields];
    updated[index][field] = value;
    setCustomFields(updated);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {customer ? 'Update customer information and settings' : 'Fill in the details to add a new customer'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium text-gray-700">
                  Customer Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                  className="bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+62 xxx-xxxx-xxxx"
                  required
                  className="bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                required
                className="bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="planType" className="text-xs font-medium text-gray-700">
                Plan Type <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.planType} 
                onValueChange={(value) => setFormData({ ...formData, planType: value as Customer['planType'] })}
              >
                <SelectTrigger className="bg-white border-gray-200/60">
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="UMKM Professional">UMKM Professional</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Labels/Tags */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Labels & Tags</h3>
            <div className="flex flex-wrap gap-2">
              {availableLabels.map((label) => (
                <Badge
                  key={label}
                  variant="outline"
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedLabels.includes(label)
                      ? 'bg-[#8a25ed] text-white border-[#8a25ed]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#8a25ed]'
                  }`}
                  onClick={() => toggleLabel(label)}
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Custom Fields */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Custom Fields</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCustomField}
                className="h-8 text-xs"
              >
                <Plus className="w-3 h-3 mr-1" strokeWidth={2} />
                Add Field
              </Button>
            </div>
            {customFields.length > 0 && (
              <div className="space-y-2">
                {customFields.map((field, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Field name"
                      value={field.key}
                      onChange={(e) => updateCustomField(index, 'key', e.target.value)}
                      className="flex-1 bg-white border-gray-200/60 text-sm"
                    />
                    <Input
                      placeholder="Field value"
                      value={field.value}
                      onChange={(e) => updateCustomField(index, 'value', e.target.value)}
                      className="flex-1 bg-white border-gray-200/60 text-sm"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeCustomField(index)}
                      className="h-10 w-10 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          {customer && (
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Notes</h3>
              <Textarea
                placeholder="Add a note about this customer..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] min-h-[80px]"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              {customer ? 'Save Changes' : 'Add Customer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
