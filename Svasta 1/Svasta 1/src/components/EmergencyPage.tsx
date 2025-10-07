import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  AlertTriangle, 
  Phone, 
  MapPin,
  Clock,
  Heart,
  Shield,
  Zap,
  Users,
  Info,
  CheckCircle,
  ArrowRight,
  Ambulance,
  Activity,
  GraduationCap
} from 'lucide-react';

interface EmergencyPageProps {
  onPageChange: (page: string) => void;
}

export default function EmergencyPage({ onPageChange }: EmergencyPageProps) {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  const emergencyNumbers = [
    { service: 'Emergency Services', number: '911', description: 'Police, Fire, Ambulance' },
    { service: 'Poison Control', number: '1-800-222-1222', description: 'Poison emergency assistance' },
    { service: 'Mental Health Crisis', number: '988', description: '24/7 mental health support' },
    { service: 'Svasta Emergency', number: '1-800-SVASTA', description: 'Healthcare emergency line' }
  ];

  const firstAidTips = [
    {
      title: 'Heart Attack',
      steps: [
        'Call 911 immediately',
        'Have the person sit down and rest',
        'Give aspirin if not allergic (chew, don\'t swallow)',
        'Monitor breathing and pulse',
        'Be ready to perform CPR if needed'
      ],
      icon: Heart,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Choking',
      steps: [
        'Encourage coughing if person is conscious',
        'Perform back blows (5 sharp blows between shoulder blades)',
        'Try abdominal thrusts (Heimlich maneuver)',
        'Call 911 if object doesn\'t dislodge',
        'Continue until help arrives'
      ],
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Severe Bleeding',
      steps: [
        'Apply direct pressure to wound',
        'Elevate injured area above heart level',
        'Use clean cloth or bandage',
        'Don\'t remove embedded objects',
        'Call 911 for severe bleeding'
      ],
      icon: Activity,
      color: 'from-red-600 to-red-700'
    },
    {
      title: 'Unconsciousness',
      steps: [
        'Check for responsiveness',
        'Call 911 immediately',
        'Check breathing and pulse',
        'Place in recovery position if breathing',
        'Begin CPR if no pulse'
      ],
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleSOS = () => {
    setIsSOSActive(true);
    // Simulate emergency call initiation
    setTimeout(() => {
      setIsSOSActive(false);
    }, 3000);
  };

  const shareLocation = () => {
    setLocationShared(true);
    // Simulate location sharing
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Help</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get immediate assistance in medical emergencies. Learn first-aid techniques and understand your rights as a Good Samaritan.
          </p>
        </div>

        {/* SOS Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-red-500 to-red-600">
            <CardContent className="p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Emergency SOS</h2>
              <p className="text-red-100 mb-6">
                Press and hold the SOS button for immediate emergency assistance
              </p>
              
              <div className="relative mb-6">
                <Button
                  size="lg"
                  onClick={handleSOS}
                  disabled={isSOSActive}
                  className={`w-32 h-32 rounded-full text-2xl font-bold transition-all ${
                    isSOSActive 
                      ? 'bg-white text-red-500 animate-pulse' 
                      : 'bg-white text-red-500 hover:bg-red-50 hover:scale-105'
                  }`}
                >
                  {isSOSActive ? (
                    <div className="flex flex-col items-center">
                      <Zap className="h-8 w-8 mb-1" />
                      <span className="text-sm">Calling...</span>
                    </div>
                  ) : (
                    'SOS'
                  )}
                </Button>
                {isSOSActive && (
                  <div className="absolute inset-0 rounded-full border-4 border-white opacity-50 animate-ping"></div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <Button
                  variant="outline"
                  onClick={shareLocation}
                  className="text-white border-white hover:bg-white hover:text-red-500"
                  disabled={locationShared}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {locationShared ? 'Location Shared' : 'Share Location'}
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-red-500"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call 911
                </Button>
              </div>

              {isSOSActive && (
                <div className="mt-4 p-3 bg-white/20 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Emergency services will be contacted in 10 seconds...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* Emergency Numbers */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-red-500" />
              Emergency Numbers
            </h2>
            <div className="space-y-3">
              {emergencyNumbers.map((emergency, index) => (
                <Card key={index} className="border-0 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{emergency.service}</h3>
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        {emergency.number}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{emergency.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-orange-500" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Card className="border-0 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Ambulance className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Find Nearest Hospital</h3>
                      <p className="text-sm text-gray-600">Locate emergency services nearby</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Emergency Contacts</h3>
                      <p className="text-sm text-gray-600">Manage your emergency contacts</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Heart className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Medical Information</h3>
                      <p className="text-sm text-gray-600">Access medical history & allergies</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Emergency Image */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-500" />
              Emergency Response
            </h2>
            <Card className="border-0">
              <CardContent className="p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1721329567375-204a9a451f9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBtZWRpY2FsJTIwaGVscHxlbnwxfHx8fDE3NTg5NTI1NDh8MA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral"
                    alt="Emergency medical response"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Trained emergency responders</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24/7 availability</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>GPS location tracking</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* First Aid Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Essential First Aid Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {firstAidTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="border-0 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${tip.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span>{tip.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {tip.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start space-x-3 text-sm">
                          <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                            {stepIndex + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Good Samaritan Law */}
        <section>
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-green-50">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Good Samaritan Law</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Understanding your legal protection when helping others in emergency situations
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Legal Protection</h3>
                  <p className="text-sm text-gray-600">
                    You're protected from lawsuits when providing emergency aid in good faith
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Key Requirements</h3>
                  <p className="text-sm text-gray-600">
                    Act reasonably, don't exceed your training, and don't abandon care once started
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                    <Heart className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Moral Duty</h3>
                  <p className="text-sm text-gray-600">
                    While not legally required, helping others in need is encouraged and protected
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="text-center">
                <Button 
                  onClick={() => onPageChange('education')}
                  className="bg-[var(--healthcare-blue)] hover:bg-[var(--healthcare-blue-dark)]"
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Learn More About First Aid
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}