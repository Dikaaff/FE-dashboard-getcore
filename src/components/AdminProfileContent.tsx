import { useState } from 'react';
import { User, Mail, Shield, Camera, Eye, EyeOff, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

export function AdminProfileContent() {
  const [profileData, setProfileData] = useState({
    fullName: 'Super Admin',
    email: 'admin@getcore.id',
    role: 'Super Admin',
    profilePhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
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
    <div className="px-6 py-6 space-y-6">
      {/* Page Header */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
        <h1 className="text-2xl text-gray-900 tracking-tight">Admin Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your administrator information and account security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Photo */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 h-fit animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-3 mb-4">
            <h3 className="text-sm text-gray-900">Profile Photo</h3>
            <p className="text-xs text-gray-500">Update your profile picture</p>
          </div>
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
        </div>

        {/* Right Column - Basic Info & Security */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <div className="space-y-3 mb-6">
              <h3 className="text-sm text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#8a25ed]" />
                Administrator Information
              </h3>
              <p className="text-xs text-gray-500">Your admin details and role information</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700 text-xs">Admin Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      className="pl-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 text-xs">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      value={profileData.email}
                      readOnly
                      className="pl-10 bg-gray-50 border-gray-200/60 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-400">Email cannot be changed</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-700 text-xs">Admin Role</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Select
                    value={profileData.role}
                    onValueChange={(value) => setProfileData({ ...profileData, role: value })}
                  >
                    <SelectTrigger id="role" className="pl-10 bg-white border-gray-200/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Staff Admin">Staff Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-gray-400">
                  {profileData.role === 'Super Admin' 
                    ? 'Full access to all system features' 
                    : 'Limited access based on permissions'}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white px-6"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white border border-gray-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <div className="space-y-3 mb-6">
              <h3 className="text-sm text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#8a25ed]" />
                Change Password
              </h3>
              <p className="text-xs text-gray-500">Update your password to keep your account secure</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-gray-700 text-xs">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="pr-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20"
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
                <Label htmlFor="newPassword" className="text-gray-700 text-xs">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="pr-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20"
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
                <Label htmlFor="confirmPassword" className="text-gray-700 text-xs">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="pr-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20"
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

              <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleChangePassword}
                  variant="outline"
                  className="border-[#8a25ed] text-[#8a25ed] hover:bg-[#8a25ed]/10"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
