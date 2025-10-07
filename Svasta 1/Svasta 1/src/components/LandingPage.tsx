import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Stethoscope, 
  Pill, 
  Heart, 
  Shield, 
  Users, 
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onPageChange: (page: string) => void;
}

export default function LandingPage({ onPageChange }: LandingPageProps) {
  const features = [
    {
      icon: Pill,
      title: "Medicine Delivery",
      description: "Order medicines online with fast, reliable delivery to your doorstep. Upload prescriptions and get authentic medicines.",
      action: () => onPageChange('medicine')
    },
    {
      icon: Stethoscope,
      title: "Doctor Consultation",
      description: "Connect with certified doctors through video calls, chat, or in-person appointments. Expert healthcare advice anytime.",
      action: () => onPageChange('consultation')
    },
    {
      icon: Heart,
      title: "Health Awareness",
      description: "Learn about health topics, first-aid, and legal rights. Empowering you with knowledge for better healthcare decisions.",
      action: () => onPageChange('education')
    }
  ];

  const stats = [
    { label: "Registered Doctors", value: "500+", icon: Stethoscope },
    { label: "Happy Patients", value: "10,000+", icon: Users },
    { label: "Cities Covered", value: "50+", icon: Shield },
    { label: "Avg Response Time", value: "< 15 min", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--healthcare-gray-light)]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[var(--healthcare-blue)]">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Trusted Healthcare Platform</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                One Platform for{' '}
                <span className="text-[var(--healthcare-blue)]">Accessible</span>,{' '}
                <span className="text-[var(--healthcare-green)]">Reliable</span>, and{' '}
                <span className="text-[var(--healthcare-blue-dark)]">Inclusive</span>{' '}
                Healthcare
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Svasta brings quality healthcare to everyone. From medicine delivery to doctor consultations, 
                we're here to support your health journey with care and compassion.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => onPageChange('medicine')}
                className="bg-[var(--healthcare-blue)] hover:bg-[var(--healthcare-blue-dark)] text-white"
              >
                <Pill className="mr-2 h-5 w-5" />
                Order Medicine
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onPageChange('consultation')}
                className="border-[var(--healthcare-green)] text-[var(--healthcare-green)] hover:bg-[var(--healthcare-green-light)]"
              >
                <Stethoscope className="mr-2 h-5 w-5" />
                Consult Doctor
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onPageChange('emergency')}
                className="border-[var(--healthcare-red)] text-[var(--healthcare-red)] hover:bg-[var(--healthcare-red-light)]"
              >
                <Heart className="mr-2 h-5 w-5" />
                Emergency Help
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--healthcare-blue-light)] to-[var(--healthcare-green-light)] p-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1587557983735-f05198060b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVhbSUyMGRvY3RvciUyMG51cnNlfGVufDF8fHx8MTc1ODk1MjU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthcare professionals working together"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <Heart className="h-8 w-8 text-[var(--healthcare-red)]" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
              <Shield className="h-8 w-8 text-[var(--healthcare-green)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--healthcare-blue-light)] rounded-full mb-4">
                    <Icon className="h-6 w-6 text-[var(--healthcare-blue)]" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Healthcare Services You Can Trust
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to make your health journey simple, 
            accessible, and reliable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--healthcare-blue)] to-[var(--healthcare-green)] rounded-2xl mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    onClick={feature.action}
                    className="w-full border-[var(--healthcare-blue)] text-[var(--healthcare-blue)] hover:bg-[var(--healthcare-blue)] hover:text-white"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gradient-to-r from-[var(--healthcare-blue)] to-[var(--healthcare-green)] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 text-white">
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current text-yellow-400" />
              ))}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Trusted by Thousands of Patients
            </h2>
            <p className="text-lg text-blue-100">
              "Svasta has transformed how I access healthcare. From emergency consultations 
              to regular medicine delivery, everything is just a click away."
            </p>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Verified Patient Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[var(--healthcare-gray-light)] to-white rounded-3xl p-8 lg:p-16 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Ready to Start Your Health Journey?
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied patients who trust Svasta for their healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onPageChange('login')}
                className="bg-[var(--healthcare-blue)] hover:bg-[var(--healthcare-blue-dark)] text-white"
              >
                Get Started Today
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onPageChange('dashboard')}
                className="border-[var(--healthcare-green)] text-[var(--healthcare-green)] hover:bg-[var(--healthcare-green-light)]"
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}