import { useState } from 'react';
import { Globe, Clock, Bell, Tag, CreditCard, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';

interface LabelItem {
  id: string;
  name: string;
  color: string;
}

export function SettingsContent() {
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Asia/Jakarta');
  const [notifications, setNotifications] = useState({
    email: true,
    systemAlerts: true,
  });

  const [labels, setLabels] = useState<LabelItem[]>([
    { id: '1', name: 'VIP Customer', color: '#8a25ed' },
    { id: '2', name: 'New Lead', color: '#3b82f6' },
    { id: '3', name: 'High Priority', color: '#ef4444' },
    { id: '4', name: 'Follow Up', color: '#f59e0b' },
    { id: '5', name: 'Active', color: '#10b981' },
  ]);

  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  const [editLabelData, setEditLabelData] = useState({ name: '', color: '' });
  const [newLabel, setNewLabel] = useState({ name: '', color: '#8a25ed' });
  const [showAddLabel, setShowAddLabel] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState<string | null>(null);

  const [currentPlan, setCurrentPlan] = useState('Standard');

  const handleSaveGeneral = () => {
    toast.success('General settings saved successfully!');
  };

  const handleAddLabel = () => {
    if (!newLabel.name.trim()) {
      toast.error('Label name is required!');
      return;
    }
    const label: LabelItem = {
      id: Date.now().toString(),
      name: newLabel.name,
      color: newLabel.color,
    };
    setLabels([...labels, label]);
    setNewLabel({ name: '', color: '#8a25ed' });
    setShowAddLabel(false);
    toast.success('Label added successfully!');
  };

  const startEditLabel = (label: LabelItem) => {
    setEditingLabel(label.id);
    setEditLabelData({ name: label.name, color: label.color });
  };

  const handleSaveEdit = (id: string) => {
    if (!editLabelData.name.trim()) {
      toast.error('Label name is required!');
      return;
    }
    setLabels(labels.map(l => l.id === id ? { ...l, name: editLabelData.name, color: editLabelData.color } : l));
    setEditingLabel(null);
    toast.success('Label updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingLabel(null);
    setEditLabelData({ name: '', color: '' });
  };

  const confirmDeleteLabel = (id: string) => {
    setLabelToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteLabel = () => {
    if (labelToDelete) {
      setLabels(labels.filter(l => l.id !== labelToDelete));
      toast.success('Label deleted successfully!');
      setDeleteDialogOpen(false);
      setLabelToDelete(null);
    }
  };

  const planDetails = {
    Standard: { price: '$29', features: ['Up to 100 customers', 'Basic analytics', 'Email support'] },
    UMKM: { price: '$49', features: ['Up to 500 customers', 'Advanced analytics', 'Priority support', 'Custom fields'] },
    Corporate: { price: '$99', features: ['Unlimited customers', 'Premium analytics', '24/7 support', 'Custom integrations', 'Dedicated manager'] },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Settings</h1>
        <p className="text-sm text-gray-500">Manage your application preferences and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#8a25ed]" />
              General Settings
            </CardTitle>
            <CardDescription>Configure your language and regional preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-gray-700 flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                Language
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                Timezone
              </Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Jakarta">Asia/Jakarta (GMT+7)</SelectItem>
                  <SelectItem value="America/New_York">America/New York (GMT-5)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                  <SelectItem value="Australia/Sydney">Australia/Sydney (GMT+11)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-gray-700 flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-500" />
                Notifications
              </Label>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm text-gray-700">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive updates via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  className="data-[state=checked]:bg-[#8a25ed]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm text-gray-700">System Alerts</p>
                  <p className="text-xs text-gray-500">Get notified about important updates</p>
                </div>
                <Switch
                  checked={notifications.systemAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
                  className="data-[state=checked]:bg-[#8a25ed]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                onClick={handleSaveGeneral}
                className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white rounded-lg px-6 transition-all duration-200 hover:shadow-lg active:scale-95"
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#8a25ed]" />
              Subscription
            </CardTitle>
            <CardDescription>Manage your subscription plan and billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-[#8a25ed]/10 to-[#8a25ed]/5 rounded-xl border border-[#8a25ed]/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Current Plan</p>
                  <h3 className="text-gray-900">{currentPlan}</h3>
                </div>
                <Badge className="bg-[#8a25ed] hover:bg-[#8a25ed] text-white">
                  Active
                </Badge>
              </div>
              <p className="text-2xl font-semibold text-[#8a25ed] mb-3">
                {planDetails[currentPlan as keyof typeof planDetails].price}
                <span className="text-sm text-gray-500 font-normal">/month</span>
              </p>
              <ul className="space-y-2">
                {planDetails[currentPlan as keyof typeof planDetails].features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-[#8a25ed]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <p className="text-sm text-gray-700">Upgrade to unlock more features</p>
              <div className="grid grid-cols-1 gap-2">
                {Object.keys(planDetails).filter(plan => plan !== currentPlan).map((plan) => (
                  <button
                    key={plan}
                    onClick={() => {
                      setCurrentPlan(plan);
                      toast.success(`Plan upgraded to ${plan}!`);
                    }}
                    className="p-3 border border-gray-200 rounded-lg hover:border-[#8a25ed] hover:bg-[#8a25ed]/5 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900 group-hover:text-[#8a25ed]">{plan}</p>
                        <p className="text-xs text-gray-500">{planDetails[plan as keyof typeof planDetails].price}/month</p>
                      </div>
                      <div className="text-xs text-[#8a25ed] group-hover:underline">View details</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => toast.info('Redirecting to upgrade page...')}
              className="w-full bg-[#8a25ed] hover:bg-[#7a1fd4] text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
            >
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Labels & Tags - Full Width */}
      <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#8a25ed]" />
                Labels & Tags
              </CardTitle>
              <CardDescription>Manage labels for organizing your customers</CardDescription>
            </div>
            <Button
              onClick={() => setShowAddLabel(!showAddLabel)}
              className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Label
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Label Form */}
          {showAddLabel && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <Label className="text-gray-700 text-xs mb-1.5 block">Label Name</Label>
                  <Input
                    value={newLabel.name}
                    onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
                    placeholder="Enter label name"
                    className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 text-xs mb-1.5 block">Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={newLabel.color}
                      onChange={(e) => setNewLabel({ ...newLabel, color: e.target.value })}
                      className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <Input
                      value={newLabel.color}
                      onChange={(e) => setNewLabel({ ...newLabel, color: e.target.value })}
                      placeholder="#8a25ed"
                      className="flex-1 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddLabel(false);
                    setNewLabel({ name: '', color: '#8a25ed' });
                  }}
                  className="rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddLabel}
                  className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white rounded-lg transition-all duration-200 active:scale-95"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          )}

          {/* Labels List */}
          <div className="space-y-2">
            {labels.map((label) => (
              <div
                key={label.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                {editingLabel === label.id ? (
                  <>
                    <div className="flex-1 flex items-center gap-3">
                      <input
                        type="color"
                        value={editLabelData.color}
                        onChange={(e) => setEditLabelData({ ...editLabelData, color: e.target.value })}
                        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                      />
                      <Input
                        value={editLabelData.name}
                        onChange={(e) => setEditLabelData({ ...editLabelData, name: e.target.value })}
                        className="flex-1 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                      />
                    </div>
                    <div className="flex gap-2 ml-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSaveEdit(label.id)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelEdit}
                        className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg border border-gray-200"
                        style={{ backgroundColor: label.color }}
                      />
                      <span className="text-sm text-gray-700">{label.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEditLabel(label)}
                        className="text-gray-600 hover:text-[#8a25ed] hover:bg-[#8a25ed]/10"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => confirmDeleteLabel(label.id)}
                        className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Label</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this label? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLabel}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
