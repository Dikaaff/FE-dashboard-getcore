import { useState } from 'react';
import { Globe, Clock, Bell, Mail, Ticket, CreditCard, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

export function UserSettingsContent() {
  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'Asia/Jakarta',
    emailNotification: true,
    ticketUpdateNotification: true,
    paymentReminder: true,
  });

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Page Header */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
        <h1 className="text-2xl text-gray-900 tracking-tight">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your preferences and notification settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language & Regional Settings */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-3 mb-6">
            <h3 className="text-sm text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#8a25ed]" />
              Language & Regional
            </h3>
            <p className="text-xs text-gray-500">Set your preferred language and timezone</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-gray-700 text-xs">Language Preference</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => setSettings({ ...settings, language: value })}
              >
                <SelectTrigger id="language" className="bg-white border-gray-200/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (US)</SelectItem>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-gray-700 text-xs flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Timezone
              </Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) => setSettings({ ...settings, timezone: value })}
              >
                <SelectTrigger id="timezone" className="bg-white border-gray-200/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Jakarta">(GMT+7) Jakarta, Bangkok</SelectItem>
                  <SelectItem value="Asia/Singapore">(GMT+8) Singapore, Kuala Lumpur</SelectItem>
                  <SelectItem value="Asia/Tokyo">(GMT+9) Tokyo, Seoul</SelectItem>
                  <SelectItem value="Australia/Sydney">(GMT+10) Sydney, Melbourne</SelectItem>
                  <SelectItem value="Pacific/Auckland">(GMT+12) Auckland</SelectItem>
                  <SelectItem value="America/Los_Angeles">(GMT-8) Los Angeles</SelectItem>
                  <SelectItem value="America/New_York">(GMT-5) New York</SelectItem>
                  <SelectItem value="Europe/London">(GMT+0) London</SelectItem>
                  <SelectItem value="Europe/Paris">(GMT+1) Paris, Berlin</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">Used for timestamps and scheduling</p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="space-y-3 mb-6">
            <h3 className="text-sm text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#8a25ed]" />
              Notification Settings
            </h3>
            <p className="text-xs text-gray-500">Control how you receive notifications</p>
          </div>

          <div className="space-y-4">
            {/* Email Notification */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Email Notifications</p>
                  <p className="text-xs text-gray-500 mt-0.5">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotification}
                onCheckedChange={(checked) => {
                  setSettings({ ...settings, emailNotification: checked });
                  toast.success(checked ? 'Email notifications enabled' : 'Email notifications disabled');
                }}
                className="data-[state=checked]:bg-[#8a25ed]"
              />
            </div>

            {/* Ticket Update Notification */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Ticket className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Ticket Updates</p>
                  <p className="text-xs text-gray-500 mt-0.5">Get notified when ticket status changes</p>
                </div>
              </div>
              <Switch
                checked={settings.ticketUpdateNotification}
                onCheckedChange={(checked) => {
                  setSettings({ ...settings, ticketUpdateNotification: checked });
                  toast.success(checked ? 'Ticket notifications enabled' : 'Ticket notifications disabled');
                }}
                className="data-[state=checked]:bg-[#8a25ed]"
              />
            </div>

            {/* Payment Reminder */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Payment Reminders</p>
                  <p className="text-xs text-gray-500 mt-0.5">Reminders for upcoming payments</p>
                </div>
              </div>
              <Switch
                checked={settings.paymentReminder}
                onCheckedChange={(checked) => {
                  setSettings({ ...settings, paymentReminder: checked });
                  toast.success(checked ? 'Payment reminders enabled' : 'Payment reminders disabled');
                }}
                className="data-[state=checked]:bg-[#8a25ed]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        <Button
          onClick={handleSaveSettings}
          className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white gap-2"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>

      {/* Additional Info Card */}
      <div className="bg-gradient-to-r from-[#8a25ed]/10 to-[#6a1fb3]/10 border border-[#8a25ed]/20 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#8a25ed] flex items-center justify-center flex-shrink-0">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-gray-900 mb-2">Notification Preferences</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              You can customize how and when you receive notifications. We recommend keeping ticket updates and payment reminders enabled to stay informed about important account activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
