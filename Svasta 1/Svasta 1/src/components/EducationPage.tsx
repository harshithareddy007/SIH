import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  GraduationCap, 
  BookOpen, 
  Play,
  Clock,
  Users,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  Heart,
  Shield,
  Brain,
  Zap,
  Award,
  Target
} from 'lucide-react';

interface EducationPageProps {
  onPageChange: (page: string) => void;
}

export default function EducationPage({ onPageChange }: EducationPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const userProgress = {
    completedCourses: 3,
    totalCourses: 12,
    points: 450,
    level: 'Health Advocate',
    badges: ['First Aid Basic', 'CPR Certified', 'Health Rights']
  };

  const categories = [
    { name: 'All', count: 24 },
    { name: 'First Aid', count: 8 },
    { name: 'Health Rights', count: 6 },
    { name: 'Disease Prevention', count: 5 },
    { name: 'Mental Health', count: 3 },
    { name: 'Nutrition', count: 2 }
  ];

  const courses = [
    {
      id: '1',
      title: 'Basic First Aid & CPR',
      category: 'First Aid',
      description: 'Learn essential life-saving techniques including CPR, choking response, and wound care.',
      duration: '2 hours',
      difficulty: 'Beginner',
      rating: 4.9,
      students: 1247,
      progress: 100,
      completed: true,
      badge: 'First Aid Basic',
      icon: Heart,
      color: 'from-red-500 to-red-600'
    },
    {
      id: '2',
      title: 'Understanding Patient Rights',
      category: 'Health Rights',
      description: 'Know your rights as a patient and how to advocate for quality healthcare.',
      duration: '1.5 hours',
      difficulty: 'Beginner',
      rating: 4.7,
      students: 892,
      progress: 75,
      completed: false,
      badge: 'Health Rights Advocate',
      icon: Shield,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: '3',
      title: 'Mental Health First Aid',
      category: 'Mental Health',
      description: 'Recognize mental health crises and provide appropriate initial support.',
      duration: '3 hours',
      difficulty: 'Intermediate',
      rating: 4.8,
      students: 654,
      progress: 0,
      completed: false,
      badge: 'Mental Health Support',
      icon: Brain,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: '4',
      title: 'Emergency Response Planning',
      category: 'First Aid',
      description: 'Create and implement emergency response plans for various situations.',
      duration: '2.5 hours',
      difficulty: 'Advanced',
      rating: 4.6,
      students: 423,
      progress: 30,
      completed: false,
      badge: 'Emergency Planner',
      icon: Zap,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: '5',
      title: 'Nutrition and Wellness',
      category: 'Nutrition',
      description: 'Understand basic nutrition principles for maintaining optimal health.',
      duration: '2 hours',
      difficulty: 'Beginner',
      rating: 4.5,
      students: 789,
      progress: 0,
      completed: false,
      badge: 'Nutrition Guru',
      icon: Target,
      color: 'from-green-500 to-green-600'
    },
    {
      id: '6',
      title: 'Disease Prevention Strategies',
      category: 'Disease Prevention',
      description: 'Learn evidence-based approaches to preventing common diseases.',
      duration: '1.5 hours',
      difficulty: 'Intermediate',
      rating: 4.7,
      students: 567,
      progress: 60,
      completed: false,
      badge: 'Prevention Expert',
      icon: Shield,
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Complete your first course', achieved: true },
    { name: 'Knowledge Seeker', description: 'Complete 3 courses', achieved: true },
    { name: 'Health Advocate', description: 'Complete 5 courses', achieved: false },
    { name: 'Expert Helper', description: 'Complete 10 courses', achieved: false }
  ];

  const filteredCourses = courses.filter(course => 
    selectedCategory === 'All' || course.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[var(--healthcare-gray-light)]">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Education & Awareness</h1>
          <p className="text-gray-600">Empower yourself with knowledge about health and legal rights</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* User Progress */}
            <Card className="border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Courses Completed</span>
                    <span>{userProgress.completedCourses}/{userProgress.totalCourses}</span>
                  </div>
                  <Progress value={(userProgress.completedCourses / userProgress.totalCourses) * 100} />
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--healthcare-blue)]">{userProgress.points}</div>
                  <div className="text-sm text-gray-600">Learning Points</div>
                </div>
                
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-[var(--healthcare-blue)] to-[var(--healthcare-green)] text-white">
                    {userProgress.level}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Earned Badges</h4>
                  <div className="space-y-1">
                    {userProgress.badges.map((badge, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <Award className="h-3 w-3 text-yellow-500" />
                        <span className="text-gray-600">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border-0">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant={selectedCategory === category.name ? "default" : "ghost"}
                      className="w-full justify-between h-auto py-3 px-3"
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg ${
                    achievement.achieved ? 'bg-green-50' : 'bg-gray-50'
                  }`}>
                    {achievement.achieved ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                    )}
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${
                        achievement.achieved ? 'text-green-900' : 'text-gray-600'
                      }`}>
                        {achievement.name}
                      </div>
                      <div className="text-xs text-gray-500">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Stats Row */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-[var(--healthcare-blue)]">24</div>
                  <div className="text-sm text-gray-600">Total Courses</div>
                </CardContent>
              </Card>
              <Card className="border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-[var(--healthcare-green)]">5,400+</div>
                  <div className="text-sm text-gray-600">Active Learners</div>
                </CardContent>
              </Card>
              <Card className="border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-[var(--healthcare-red)]">98%</div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Course Tabs */}
            <Tabs defaultValue="courses" className="space-y-6">
              <TabsList>
                <TabsTrigger value="courses">All Courses</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {filteredCourses.length} courses 
                    {selectedCategory !== 'All' && (
                      <span className="ml-1">in {selectedCategory}</span>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => {
                    const Icon = course.icon;
                    return (
                      <Card key={course.id} className="border-0 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4 mb-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${course.color}`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 leading-tight">{course.title}</h3>
                                {course.completed && (
                                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                                )}
                              </div>
                              <Badge variant="outline" className="text-xs mb-2">
                                {course.category}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-4">{course.description}</p>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                                  <span>{course.students}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{course.rating}</span>
                              </div>
                            </div>

                            {course.progress > 0 && (
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Progress</span>
                                  <span className="font-medium">{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} />
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-2">
                              <Badge variant="secondary" className="text-xs">
                                {course.difficulty}
                              </Badge>
                              {course.completed ? (
                                <div className="flex items-center space-x-2 text-sm text-green-600">
                                  <Trophy className="h-4 w-4" />
                                  <span>Completed</span>
                                </div>
                              ) : course.progress > 0 ? (
                                <Button size="sm" variant="outline">
                                  <Play className="h-4 w-4 mr-2" />
                                  Continue
                                </Button>
                              ) : (
                                <Button size="sm" className="bg-[var(--healthcare-blue)] hover:bg-[var(--healthcare-blue-dark)]">
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  Start Course
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="in-progress">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredCourses.filter(course => course.progress > 0 && !course.completed).map((course) => {
                    const Icon = course.icon;
                    return (
                      <Card key={course.id} className="border-0">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${course.color}`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{course.title}</h3>
                              <p className="text-sm text-gray-600">{course.progress}% complete</p>
                            </div>
                          </div>
                          <Progress value={course.progress} className="mb-4" />
                          <Button size="sm" className="w-full">
                            <Play className="h-4 w-4 mr-2" />
                            Continue Learning
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredCourses.filter(course => course.completed).map((course) => {
                    const Icon = course.icon;
                    return (
                      <Card key={course.id} className="border-0 bg-green-50">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${course.color}`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{course.title}</h3>
                              <div className="flex items-center space-x-2 text-sm text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span>Completed</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-green-100 text-green-800">
                              <Award className="h-3 w-3 mr-1" />
                              {course.badge}
                            </Badge>
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}