import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  Pill, 
  Stethoscope, 
  AlertTriangle, 
  GraduationCap,
  Bell,
  Calendar,
  Clock,
  User,
  Heart,
  Activity,
  MapPin,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  onPageChange: (page: string) => void;
}

export default function Dashboard({ onPageChange }: DashboardProps) {
  const quickActions = [
    {
      icon: Pill,
      title: "Order Medicine",
      description: "Quick medicine delivery",
      color: "from-blue-500 to-blue-600",
      action: () => onPageChange('medicine')
    },
    {
      icon: Stethoscope,
      title: "Consult Doctor",
      description: "Book appointments",
      color: "from-green-500 to-green-600",
      action: () => onPageChange('consultation')
    },
    {
      icon: AlertTriangle,
      title: "SOS Emergency",
      description: "Get immediate help",
      color: "from-red-500 to-red-600",
      action: () => onPageChange('emergency')
    },
    {
      icon: GraduationCap,
      title: "Health Education",
      description: "Learn & grow",
      color: "from-purple-500 to-purple-600",
      action: () => onPageChange('education')
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "Upcoming Appointment",
      message: "Dr. Sarah Wilson - Cardiology",
      time: "Today, 3:00 PM",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      id: 2,
      type: "medicine",
      title: "Medicine Delivered",
      message: "Your prescription has been delivered",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      id: 3,
      type: "health",
      title: "Health Reminder",
      message: "Time for your daily vitamin",
      time: "4 hours ago",
      icon: Heart,
      color: "text-red-600"
    },
    {
      id: 4,
      type: "education",
      title: "New Course Available",
      message: "First Aid Basics - Complete now",
      time: "Yesterday",
      icon: GraduationCap,
      color: "text-purple-600"
    }
  ];

  const recentActivities = [
    { action: "Consulted Dr. John Smith", time: "2 days ago", status: "completed" },
    { action: "Ordered Vitamin D supplements", time: "3 days ago", status: "delivered" },
    { action: "Completed Basic First Aid course", time: "1 week ago", status: "completed" },
  ];

  const healthStats = [
    { label: "Heart Rate", value: "72 bpm", icon: Heart, trend: "normal" },
    { label: "Blood Pressure", value: "120/80", icon: Activity, trend: "good" },
    { label: "Last Checkup", value: "2 weeks ago", icon: Calendar, trend: "due" },
  ];

  return (
    <div className="min-h-screen bg-[var(--healthcare-gray-light)]">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600">Here's your health dashboard overview</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>New York, NY</span>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback className="bg-[var(--healthcare-blue)] text-white">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Quick Actions */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-0" onClick={action.action}>
                      <CardContent className="p-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl mb-4`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>Quick access</span>
                          <ArrowRight className="ml-auto h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Health Overview */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Overview</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {healthStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index} className="border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-lg ${
                            stat.trend === 'good' ? 'bg-green-100' :
                            stat.trend === 'normal' ? 'bg-blue-100' : 'bg-yellow-100'
                          }`}>
                            <Icon className={`h-5 w-5 ${
                              stat.trend === 'good' ? 'text-green-600' :
                              stat.trend === 'normal' ? 'text-blue-600' : 'text-yellow-600'
                            }`} />
                          </div>
                          <Badge variant={stat.trend === 'good' ? 'default' : 'secondary'} className="capitalize">
                            {stat.trend}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <Card className="border-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            activity.status === 'completed' ? 'bg-green-500' : 
                            activity.status === 'delivered' ? 'bg-blue-500' : 'bg-gray-400'
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-4 text-[var(--healthcare-blue)]">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar - Notifications */}
          <div className="space-y-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
              
              <Card className="border-0">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {notifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <div key={notification.id} className="flex space-x-3 pb-4 border-b border-gray-100 last:border-0">
                          <div className={`p-2 rounded-lg bg-gray-100`}>
                            <Icon className={`h-4 w-4 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center mt-2">
                              <Clock className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button variant="ghost" className="w-full mt-4 text-xs text-[var(--healthcare-blue)]">
                    View All Notifications
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Emergency Contact */}
            <Card className="border-0 bg-gradient-to-r from-red-50 to-red-100">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500 rounded-full mb-4">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-red-900 mb-2">Emergency Help</h3>
                <p className="text-sm text-red-700 mb-4">
                  Need immediate medical assistance?
                </p>
                <Button 
                  size="sm" 
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => onPageChange('emergency')}
                >
                  Get Help Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}