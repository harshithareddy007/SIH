import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Mail, 
  Lock, 
  User, 
  Phone,
  Eye,
  EyeOff,
  Shield,
  Heart
} from 'lucide-react';

interface LoginPageProps {
  onPageChange: (page: string) => void;
}

export default function LoginPage({ onPageChange }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onPageChange('dashboard');
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      onPageChange('dashboard');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google login
    setTimeout(() => {
      setIsLoading(false);
      onPageChange('dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--healthcare-blue-light)] via-white to-[var(--healthcare-green-light)]">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left side - Illustration */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--healthcare-blue)] to-[var(--healthcare-green)] flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-2xl font-bold text-[var(--healthcare-blue-dark)]">Svasta</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Welcome to Your Health Journey
              </h1>
              <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                Join thousands of users who trust Svasta for accessible, reliable, and inclusive healthcare.
              </p>
            </div>

            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--healthcare-blue-light)] to-[var(--healthcare-green-light)] p-8">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1587557983735-f05198060b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVhbSUyMGRvY3RvciUyMG51cnNlfGVufDF8fHx8MTc1ODk1MjU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Healthcare professionals"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              {/* Floating trust indicators */}
              <div className="absolute -top-3 -right-3 bg-white rounded-full p-3 shadow-lg">
                <Shield className="h-6 w-6 text-[var(--healthcare-green)]" />
              </div>
              <div className="absolute -bottom-3 -left-3 bg-white rounded-full p-3 shadow-lg">
                <Heart className="h-6 w-6 text-[var(--healthcare-red)]" />
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-[var(--healthcare-green)] rounded-full"></div>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-[var(--healthcare-blue)] rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Forms */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Access Your Account</CardTitle>
                <CardDescription>
                  Choose how you'd like to continue with Svasta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            className="pl-10"
                          />
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                            className="pl-10 pr-10"
                          />
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-[var(--healthcare-blue)] hover:bg-[var(--healthcare-blue-dark)]"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>

                    <div className="text-center">
                      <Button variant="link" className="text-sm text-[var(--healthcare-blue)]">
                        Forgot your password?
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <Input
                            id="name"
                            type="text"
                            placeholder="Your full name"
                            required
                            className="pl-10"
                          />
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            className="pl-10"
                          />
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            required
                            className="pl-10"
                          />
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            required
                            className="pl-10 pr-10"
                          />
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-[var(--healthcare-green)] hover:bg-[var(--healthcare-green-dark)]"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500 pt-4">
                  By continuing, you agree to our{' '}
                  <Button variant="link" className="text-xs h-auto p-0 text-[var(--healthcare-blue)]">
                    Terms of Service
                  </Button>{' '}
                  and{' '}
                  <Button variant="link" className="text-xs h-auto p-0 text-[var(--healthcare-blue)]">
                    Privacy Policy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}