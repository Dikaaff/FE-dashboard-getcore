import { useState } from 'react';
import { Building2, Globe, Upload, Clock, Save, Image, Link } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { toast } from 'sonner@2.0.3';

export function AdminSettingsContent() {
  const [settings, setSettings] = useState({
    companyName: 'GetCore AI Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
    customDomain: '',
    enableCustomDomain: false,
    timezone: 'Asia/Jakarta',
    regionalFormat: 'id-ID',
  });

  const handleSaveSettings = () => {
    toast.success('System settings saved successfully!');
  };

  const handleLogoUpload = () => {
    toast.success('Company logo updated!');
  };

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Page Header */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
        <h1 className="text-2xl text-gray-900 tracking-tight">System Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage company information and system configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-3 mb-6">
            <h3 className="text-sm text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#8a25ed]" />
              Company Information
            </h3>
            <p className="text-xs text-gray-500">Basic company details and branding</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-gray-700 text-xs">Company Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="pl-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-gray-700 text-xs">Company Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg border-2 border-gray-200/60 overflow-hidden bg-gray-50 flex items-center justify-center">
                  {settings.companyLogo ? (
                    <img 
                      src={settings.companyLogo} 
                      alt="Company Logo" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <Button
                    onClick={handleLogoUpload}
                    variant="outline"
                    className="w-full border-gray-200/60 hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Logo
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">PNG, JPG or SVG (max. 2MB, recommended 400x400px)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Settings */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="space-y-3 mb-6">
            <h3 className="text-sm text-gray-900 flex items-center gap-2">
              <Link className="w-5 h-5 text-[#8a25ed]" />
              Domain Settings
            </h3>
            <p className="text-xs text-gray-500">Configure your custom domain (optional)</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1">
                <p className="text-sm text-gray-900">Enable Custom Domain</p>
                <p className="text-xs text-gray-500 mt-0.5">Use your own domain for the dashboard</p>
              </div>
              <Switch
                checked={settings.enableCustomDomain}
                onCheckedChange={(checked) => {
                  setSettings({ ...settings, enableCustomDomain: checked });
                  toast.success(checked ? 'Custom domain enabled' : 'Custom domain disabled');
                }}
                className="data-[state=checked]:bg-[#8a25ed]"
              />
            </div>

            {settings.enableCustomDomain && (
              <div className="space-y-2">
                <Label htmlFor="customDomain" className="text-gray-700 text-xs">Custom Domain</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="customDomain"
                    value={settings.customDomain}
                    onChange={(e) => setSettings({ ...settings, customDomain: e.target.value })}
                    className="pl-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20"
                    placeholder="dashboard.yourdomain.com"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Point your domain to our servers and update the DNS settings
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-900">
                <strong>Current Domain:</strong> getcore-dashboard.vercel.app
              </p>
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div className="space-y-3 mb-6">
            <h3 className="text-sm text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#8a25ed]" />
              Regional & Timezone Settings
            </h3>
            <p className="text-xs text-gray-500">Set system timezone and regional format</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-gray-700 text-xs flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                System Timezone
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
                  <SelectItem value="Asia/Dubai">(GMT+4) Dubai</SelectItem>
                  <SelectItem value="Asia/Kolkata">(GMT+5:30) India</SelectItem>
                  <SelectItem value="Asia/Shanghai">(GMT+8) China</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">Used for all timestamps and scheduling</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="regionalFormat" className="text-gray-700 text-xs flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-400" />
                Regional Format
              </Label>
              <Select
                value={settings.regionalFormat}
                onValueChange={(value) => setSettings({ ...settings, regionalFormat: value })}
              >
                <SelectTrigger id="regionalFormat" className="bg-white border-gray-200/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id-ID">Indonesia (Rp, DD/MM/YYYY)</SelectItem>
                  <SelectItem value="en-US">United States ($, MM/DD/YYYY)</SelectItem>
                  <SelectItem value="en-GB">United Kingdom (£, DD/MM/YYYY)</SelectItem>
                  <SelectItem value="en-AU">Australia ($, DD/MM/YYYY)</SelectItem>
                  <SelectItem value="en-SG">Singapore ($, DD/MM/YYYY)</SelectItem>
                  <SelectItem value="ja-JP">Japan (¥, YYYY/MM/DD)</SelectItem>
                  <SelectItem value="zh-CN">China (¥, YYYY-MM-DD)</SelectItem>
                  <SelectItem value="de-DE">Germany (€, DD.MM.YYYY)</SelectItem>
                  <SelectItem value="fr-FR">France (€, DD/MM/YYYY)</SelectItem>
                  <SelectItem value="es-ES">Spain (€, DD/MM/YYYY)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">Date, time, and currency formatting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <Button
          onClick={handleSaveSettings}
          className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white gap-2"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-[#8a25ed]/10 to-[#6a1fb3]/10 border border-[#8a25ed]/20 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-250">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#8a25ed] flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-gray-900 mb-2">System Configuration</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              These settings affect the entire system. Changes to timezone and regional format will be applied to all users and reports. Make sure to coordinate with your team before making significant changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
