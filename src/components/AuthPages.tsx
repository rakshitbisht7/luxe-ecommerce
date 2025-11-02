import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthPagesProps {
  mode: 'login' | 'signup';
  onToggleMode: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string, role: 'customer' | 'admin') => void;
}

export function AuthPages({ mode, onToggleMode, onLogin, onSignup }: AuthPagesProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as 'customer' | 'admin',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (mode === 'login') {
      onLogin(formData.email, formData.password);
    } else {
      if (!formData.name.trim()) {
        toast.error('Please enter your name');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      
      onSignup(formData.name, formData.email, formData.password, formData.role);
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Social Login', {
      description: 'Google OAuth integration would be implemented here with a backend service.',
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">✦</span>
            </div>
            <span className="text-3xl text-gray-900 tracking-tight">LUXE</span>
          </div>
          
          <h1 className="text-gray-900 mb-4">
            {mode === 'login' ? 'Welcome Back!' : 'Join LUXE Today'}
          </h1>
          <p className="text-gray-600 text-xl mb-8">
            {mode === 'login' 
              ? 'Sign in to access your account and continue your shopping journey.'
              : 'Create an account to unlock exclusive collections and premium shopping experience.'}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900">Exclusive Collections</p>
                <p className="text-gray-600 text-sm">Access to premium fashion products</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900">Fast Delivery</p>
                <p className="text-gray-600 text-sm">Free shipping on orders over ₹4000</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900">Secure Shopping</p>
                <p className="text-gray-600 text-sm">100% protected payments</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <Card className="p-8 lg:p-10 shadow-2xl rounded-3xl border-0 bg-white">
            <div className="lg:hidden flex items-center space-x-2 mb-8 justify-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white">✦</span>
              </div>
              <span className="text-xl text-gray-900 tracking-tight">LUXE</span>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-gray-900 mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {mode === 'login'
                  ? 'Enter your credentials to access your account'
                  : 'Fill in your details to get started'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div>
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <div className="relative mt-2">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                        className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 mb-3 block">Select Account Type</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'customer' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.role === 'customer'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <UserIcon className={`w-6 h-6 mx-auto mb-2 ${
                          formData.role === 'customer' ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <p className={`text-sm ${
                          formData.role === 'customer' ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                          Customer
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'admin' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.role === 'admin'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Shield className={`w-6 h-6 mx-auto mb-2 ${
                          formData.role === 'admin' ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <p className={`text-sm ${
                          formData.role === 'admin' ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                          Admin
                        </p>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="button" 
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={onToggleMode}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>

              {mode === 'signup' && (
                <p className="text-xs text-gray-500 text-center mt-4">
                  By creating an account, you agree to our{' '}
                  <button type="button" className="text-blue-600 hover:underline">Terms of Service</button>
                  {' '}and{' '}
                  <button type="button" className="text-blue-600 hover:underline">Privacy Policy</button>
                </p>
              )}
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
