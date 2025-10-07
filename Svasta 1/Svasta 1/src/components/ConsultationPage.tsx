import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Star, 
  Calendar, 
  Clock,
  Video,
  MessageCircle,
  MapPin,
  CheckCircle,
  Filter,
  Heart,
  Brain,
  Eye,
  Bone,
  Stethoscope
} from 'lucide-react';

interface ConsultationPageProps {
  onPageChange: (page: string) => void;
}

export default function ConsultationPage({ onPageChange }: ConsultationPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = [
    { name: 'All', icon: Stethoscope, count: 45 },
    { name: 'Cardiology', icon: Heart, count: 8 },
    { name: 'Neurology', icon: Brain, count: 6 },
    { name: 'Ophthalmology', icon: Eye, count: 7 },
    { name: 'Orthopedics', icon: Bone, count: 9 },
    { name: 'General Medicine', icon: Stethoscope, count: 15 }
  ];

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      rating: 4.9,
      reviews: 127,
      experience: '15 years',
      location: 'New York Medical Center',
      languages: ['English', 'Spanish'],
      consultationFee: 150,
      nextAvailable: 'Today, 2:30 PM',
      image: '/api/placeholder/120/120',
      verified: true,
      videoConsult: true,
      chatConsult: true,
      inPerson: true,
      education: 'MD from Harvard Medical School',
      about: 'Specialized in interventional cardiology with expertise in complex cardiac procedures.'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      rating: 4.8,
      reviews: 89,
      experience: '12 years',
      location: 'Brain & Spine Institute',
      languages: ['English', 'Mandarin'],
      consultationFee: 175,
      nextAvailable: 'Tomorrow, 10:00 AM',
      image: '/api/placeholder/120/120',
      verified: true,
      videoConsult: true,
      chatConsult: false,
      inPerson: true,
      education: 'MD from Johns Hopkins',
      about: 'Expert in treating neurological disorders and brain-related conditions.'
    },
    {
      id: '3',
      name: 'Dr. Emily Johnson',
      specialty: 'General Medicine',
      rating: 4.7,
      reviews: 203,
      experience: '8 years',
      location: 'Community Health Center',
      languages: ['English'],
      consultationFee: 100,
      nextAvailable: 'Today, 4:00 PM',
      image: '/api/placeholder/120/120',
      verified: true,
      videoConsult: true,
      chatConsult: true,
      inPerson: true,
      education: 'MD from UCLA',
      about: 'Primary care physician with focus on preventive medicine and family health.'
    },
    {
      id: '4',
      name: 'Dr. James Rodriguez',
      specialty: 'Orthopedics',
      rating: 4.9,
      reviews: 156,
      experience: '18 years',
      location: 'Sports Medicine Clinic',
      languages: ['English', 'Spanish'],
      consultationFee: 200,
      nextAvailable: 'Monday, 9:00 AM',
      image: '/api/placeholder/120/120',
      verified: true,
      videoConsult: false,
      chatConsult: true,
      inPerson: true,
      education: 'MD from Stanford Medical',
      about: 'Orthopedic surgeon specializing in sports injuries and joint replacement.'
    },
    {
      id: '5',
      name: 'Dr. Lisa Thompson',
      specialty: 'Ophthalmology',
      rating: 4.8,
      reviews: 94,
      experience: '10 years',
      location: 'Vision Care Center',
      languages: ['English', 'French'],
      consultationFee: 125,
      nextAvailable: 'Today, 6:30 PM',
      image: '/api/placeholder/120/120',
      verified: true,
      videoConsult: true,
      chatConsult: false,
      inPerson: true,
      education: 'MD from Yale Medical School',
      about: 'Eye specialist with expertise in retinal diseases and laser surgery.'
    },
    {
      id: '6',
      name: 'Dr. Robert Kim',
      specialty: 'Cardiology',
      rating: 4.6,
      reviews: 78,
      experience: '14 years',
      location: 'Heart Care Institute',
      languages: ['English', 'Korean'],
      consultationFee: 160,
      nextAvailable: 'Tomorrow, 11:30 AM',
      image: '/api/placeholder/120/120',
      verified: true,
      videoConsult: true,
      chatConsult: true,
      inPerson: false,
      education: 'MD from Mayo Clinic',
      about: 'Cardiologist focused on preventive cardiology and heart disease management.'
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-[var(--healthcare-gray-light)]">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Consultation</h1>
          <p className="text-gray-600">Connect with certified doctors for expert healthcare advice</p>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search doctors by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <Button variant="outline" size="lg" className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>More Filters</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Sidebar - Specialties */}
          <div className="space-y-6">
            <Card className="border-0">
              <CardHeader>
                <CardTitle className="text-lg">Specialties</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-2">
                  {specialties.map((specialty, index) => {
                    const Icon = specialty.icon;
                    return (
                      <Button
                        key={index}
                        variant={selectedSpecialty === specialty.name ? "default" : "ghost"}
                        className="w-full justify-start h-auto py-3 px-3"
                        onClick={() => setSelectedSpecialty(specialty.name)}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span>{specialty.name}</span>
                            <Badge variant="secondary" className="text-xs ml-2">
                              {specialty.count}
                            </Badge>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 bg-gradient-to-r from-[var(--healthcare-blue)] to-[var(--healthcare-green)]">
              <CardContent className="p-6 text-white">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-blue-100">Verified Doctors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-blue-100">Patient Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-blue-100">Support Available</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Doctor List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Showing {filteredDoctors.length} doctors
                {selectedSpecialty !== 'All' && (
                  <span className="ml-1">in {selectedSpecialty}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-[var(--healthcare-green)]" />
                <span>All doctors are verified</span>
              </div>
            </div>

            <div className="space-y-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="border-0 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6">
                      
                      {/* Doctor Info */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={doctor.image} />
                            <AvatarFallback className="bg-[var(--healthcare-blue)] text-white">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                              {doctor.verified && (
                                <CheckCircle className="h-4 w-4 text-[var(--healthcare-green)]" />
                              )}
                            </div>
                            <p className="text-[var(--healthcare-blue)] font-medium mb-1">{doctor.specialty}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{doctor.rating} ({doctor.reviews} reviews)</span>
                              </div>
                              <span>{doctor.experience} experience</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{doctor.location}</span>
                          </div>
                          <div>
                            <span className="font-medium">Education:</span> {doctor.education}
                          </div>
                          <div>
                            <span className="font-medium">Languages:</span> {doctor.languages.join(', ')}
                          </div>
                          <p className="text-gray-700 mt-2">{doctor.about}</p>
                        </div>
                      </div>

                      {/* Consultation Options */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Consultation Types</h4>
                          <div className="space-y-2">
                            {doctor.videoConsult && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Video className="h-4 w-4 text-[var(--healthcare-blue)]" />
                                <span>Video Call</span>
                              </div>
                            )}
                            {doctor.chatConsult && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <MessageCircle className="h-4 w-4 text-[var(--healthcare-green)]" />
                                <span>Chat</span>
                              </div>
                            )}
                            {doctor.inPerson && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4 text-[var(--healthcare-gray)]" />
                                <span>In-Person</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <Clock className="h-4 w-4" />
                            <span>Next Available:</span>
                          </div>
                          <p className="text-sm font-medium text-[var(--healthcare-blue)]">
                            {doctor.nextAvailable}
                          </p>
                        </div>
                      </div>

                      {/* Booking */}
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            ₹{doctor.consultationFee}
                          </div>
                          <div className="text-sm text-gray-600">consultation</div>
                        </div>

                        <Tabs defaultValue="video" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="video" disabled={!doctor.videoConsult}>
                              Video
                            </TabsTrigger>
                            <TabsTrigger value="chat" disabled={!doctor.chatConsult}>
                              Chat
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="video" className="mt-4">
                            <Button className="w-full bg-[var(--healthcare-blue)] hover:bg-[var(--healthcare-blue-dark)]">
                              <Video className="h-4 w-4 mr-2" />
                              Book Video Call
                            </Button>
                          </TabsContent>
                          <TabsContent value="chat" className="mt-4">
                            <Button className="w-full bg-[var(--healthcare-green)] hover:bg-[var(--healthcare-green-dark)]">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Start Chat
                            </Button>
                          </TabsContent>
                        </Tabs>

                        {doctor.inPerson && (
                          <Button variant="outline" className="w-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            Book In-Person
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <Card className="border-0">
                <CardContent className="p-12 text-center">
                  <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or browse all specialties.
                  </p>
                  <Button onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialty('All');
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}