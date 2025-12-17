import { useState } from 'react';
import { User, Mail, Phone, Shield, Camera, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

export function ProfileContent() {
  const [profileData, setProfileData] = useState({
    fullName: 'Admin User',
    email: 'admin@getcore.com',
    phone: '+62 812-3456-7890',
    role: 'Owner',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [twoStepEnabled, setTwoStepEnabled] = useState(false);

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long!');
      return;
    }
    toast.success('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handlePhotoChange = () => {
    toast.success('Profile photo updated!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">My Profile</h1>
        <p className="text-sm text-gray-500">Manage your personal information and account security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Photo */}
        <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl h-fit">
          <CardHeader>
            <CardTitle className="text-gray-900">Profile Photo</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-gray-100">
                  <AvatarImage src={profileData.profilePhoto} />
                  <AvatarFallback className="bg-gradient-to-br from-[#8a25ed] to-[#a855f7] text-white text-3xl">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handlePhotoChange}
                  className="absolute bottom-0 right-0 p-2.5 bg-[#8a25ed] rounded-full shadow-lg hover:bg-[#7a1fd4] transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Upload a new photo</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF (max. 2MB)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Basic Info & Security */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#8a25ed]" />
                Basic Information
              </CardTitle>
              <CardDescription>Your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      className="pl-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      value={profileData.email}
                      readOnly
                      className="pl-10 bg-gray-50 border-gray-200/60 text-gray-500 cursor-not-allowed rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-gray-400">Email cannot be changed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="pl-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-700">Role</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="role"
                      value={profileData.role}
                      readOnly
                      className="pl-10 bg-gray-50 border-gray-200/60 text-gray-500 cursor-not-allowed rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white rounded-lg px-6 transition-all duration-200 hover:shadow-lg active:scale-95"
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Password & Security */}
          <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#8a25ed]" />
                Password & Security
              </CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Change Password */}
              <div className="space-y-4">
                <h4 className="text-sm text-gray-700">Change Password</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-gray-700">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="pr-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-gray-700">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="pr-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="pr-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleChangePassword}
                  variant="outline"
                  className="border-[#8a25ed] text-[#8a25ed] hover:bg-[#8a25ed]/10 rounded-lg transition-all duration-200 active:scale-95"
                >
                  Update Password
                </Button>
              </div>

              <Separator />

              {/* Two-Step Login */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm text-gray-700">Two-Step Login</h4>
                  <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={twoStepEnabled}
                  onCheckedChange={(checked) => {
                    setTwoStepEnabled(checked);
                    toast.success(checked ? 'Two-step login enabled' : 'Two-step login disabled');
                  }}
                  className="data-[state=checked]:bg-[#8a25ed]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
