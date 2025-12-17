import { Eye, EyeOff, Mail, Lock, ArrowRight, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import logoIcon from 'figma:asset/eab31c85a652a99b3530a2e0cac28524aca91b36.png';
import logoText from 'figma:asset/91baf29c75205776c9677c686dcc0a8b96ca505b.png';

interface LoginPageProps {
  onLogin: (email?: string) => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome back!');
      onLogin(email);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Logged in with Google!');
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f7f7] via-[#fafafa] to-[#f0f0f0] p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#8a25ed]/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#8a25ed]/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Logo & Brand - INSIDE CARD */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <img 
                src={logoIcon} 
                alt="GetCore Logo" 
                className="w-16 h-16 object-contain"
              />
              <h1 className="text-4xl text-gray-900 tracking-tight">GetCore</h1>
            </div>
            <p className="text-sm text-gray-500">
              Powerful customer management platform
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl text-gray-900 mb-2 text-center">Welcome back</h2>
            <p className="text-sm text-gray-500 text-center">Sign in to continue to your dashboard</p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-gradient-to-br from-[#8a25ed]/5 to-purple-50 border border-[#8a25ed]/20 rounded-2xl">
            <p className="text-xs text-[#8a25ed] font-medium mb-3">Try demo access</p>
            <div className="space-y-3">
              {/* Admin Access */}
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <p className="text-xs font-medium text-gray-700 mb-1.5">👤 Admin Dashboard</p>
                <p className="text-xs text-gray-600">
                  Email: <span className="font-mono bg-gray-50 px-2 py-0.5 rounded text-gray-900">admin@getcore.com</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Password: <span className="font-mono bg-gray-50 px-2 py-0.5 rounded text-gray-900">admin123</span>
                </p>
              </div>
              
              {/* User Access */}
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <p className="text-xs font-medium text-gray-700 mb-1.5">👥 User Dashboard</p>
                <p className="text-xs text-gray-600">
                  Email: <span className="font-mono bg-gray-50 px-2 py-0.5 rounded text-gray-900">user@getcore.com</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Password: <span className="font-mono bg-gray-50 px-2 py-0.5 rounded text-gray-900">user123</span>
                </p>
              </div>
            </div>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 py-6 mb-6 gap-3 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm text-gray-700 mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 py-6 bg-gray-50 border-gray-200 focus:bg-white transition-all hover:border-gray-300"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm text-gray-700 mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 py-6 bg-gray-50 border-gray-200 focus:bg-white transition-all hover:border-gray-300"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-[#8a25ed] hover:text-[#7a1fd9] transition-colors font-medium"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white py-6 gap-2 shadow-lg shadow-[#8a25ed]/30 hover:shadow-xl hover:shadow-[#8a25ed]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" strokeWidth={2} />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onNavigateToRegister}
                className="text-[#8a25ed] hover:text-[#7a1fd9] font-medium transition-colors hover:underline"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 animate-in fade-in duration-700 delay-200">
          <p>© 2025 GetCore. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}