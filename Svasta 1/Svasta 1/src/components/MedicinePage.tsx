import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  Upload, 
  Pill, 
  ShoppingCart,
  Star,
  Clock,
  Truck,
  Shield,
  Filter,
  Plus,
  Minus
} from 'lucide-react';

interface MedicinePageProps {
  onPageChange: (page: string) => void;
}

export default function MedicinePage({ onPageChange }: MedicinePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const categories = [
    { name: 'All', count: 150 },
    { name: 'Pain Relief', count: 25 },
    { name: 'Vitamins', count: 30 },
    { name: 'Antibiotics', count: 15 },
    { name: 'Heart Health', count: 20 },
    { name: 'Diabetes', count: 18 }
  ];

  const medicines = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      brand: 'Generic',
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.5,
      reviews: 128,
      category: 'Pain Relief',
      prescription: false,
      inStock: true,
      fastDelivery: true,
      description: 'Effective pain relief and fever reducer'
    },
    {
      id: '2',
      name: 'Vitamin D3 1000 IU',
      brand: 'HealthPlus',
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.8,
      reviews: 95,
      category: 'Vitamins',
      prescription: false,
      inStock: true,
      fastDelivery: true,
      description: 'Essential vitamin for bone health'
    },
    {
      id: '3',
      name: 'Amoxicillin 250mg',
      brand: 'PharmaCorp',
      price: 18.50,
      originalPrice: 22.00,
      rating: 4.3,
      reviews: 67,
      category: 'Antibiotics',
      prescription: true,
      inStock: true,
      fastDelivery: false,
      description: 'Antibiotic for bacterial infections'
    },
    {
      id: '4',
      name: 'Omega-3 Fish Oil',
      brand: 'NaturalHealth',
      price: 32.99,
      originalPrice: 39.99,
      rating: 4.6,
      reviews: 143,
      category: 'Heart Health',
      prescription: false,
      inStock: true,
      fastDelivery: true,
      description: 'Supports heart and brain health'
    },
    {
      id: '5',
      name: 'Metformin 500mg',
      brand: 'DiabCare',
      price: 45.99,
      originalPrice: 52.99,
      rating: 4.4,
      reviews: 89,
      category: 'Diabetes',
      prescription: true,
      inStock: false,
      fastDelivery: false,
      description: 'Blood sugar control medication'
    },
    {
      id: '6',
      name: 'Multivitamin Complex',
      brand: 'VitalLife',
      price: 28.99,
      originalPrice: 34.99,
      rating: 4.7,
      reviews: 201,
      category: 'Vitamins',
      prescription: false,
      inStock: true,
      fastDelivery: true,
      description: 'Complete daily vitamin supplement'
    }
  ];

  const updateCart = (medicineId: string, change: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      const currentAmount = newCart[medicineId] || 0;
      const newAmount = Math.max(0, currentAmount + change);
      
      if (newAmount === 0) {
        delete newCart[medicineId];
      } else {
        newCart[medicineId] = newAmount;
      }
      
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [id, count]) => {
      const medicine = medicines.find(m => m.id === id);
      return sum + (medicine?.price || 0) * count;
    }, 0);
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--healthcare-gray-light)]">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Medicine</h1>
          <p className="text-gray-600">Find and order your medicines with fast, reliable delivery</p>
        </div>

        {/* Search and Upload */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 border-0">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search medicines, brands, or categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <Button variant="outline" size="lg" className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filter</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-[var(--healthcare-blue)] to-[var(--healthcare-green)]">
            <CardContent className="p-6 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <Upload className="h-6 w-6" />
                <span className="font-semibold">Upload Prescription</span>
              </div>
              <p className="text-sm text-blue-100 mb-4">
                Upload your prescription for accurate medicine recommendations
              </p>
              <Button variant="secondary" size="sm" className="text-[var(--healthcare-blue)]">
                Choose File
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Sidebar - Categories */}
          <div className="space-y-6">
            <Card className="border-0">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-between h-auto py-3 px-3"
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

            {/* Cart Summary */}
            {getTotalItems() > 0 && (
              <Card className="border-0 sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart ({getTotalItems()})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3 mb-4">
                    {Object.entries(cart).map(([id, count]) => {
                      const medicine = medicines.find(m => m.id === id);
                      if (!medicine) return null;
                      return (
                        <div key={id} className="flex justify-between items-center text-sm">
                          <span className="truncate mr-2">{medicine.name}</span>
                          <span>${(medicine.price * count).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center mt-3 font-semibold">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button className="w-full mt-4 bg-[var(--healthcare-green)] hover:bg-[var(--healthcare-green-dark)]">
                    Checkout
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content - Medicine List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Showing {filteredMedicines.length} medicines</span>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-[var(--healthcare-green)]" />
                  <span>Verified medicines only</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="border-0 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Medicine Image */}
                    <div className="aspect-square bg-gradient-to-br from-[var(--healthcare-blue-light)] to-[var(--healthcare-green-light)] rounded-lg mb-4 flex items-center justify-center">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RldGhvc2NvcGUlMjBwaWxsc3xlbnwxfHx8fDE3NTg5NTI1NDV8MA&ixlib=rb-4.1.0&q=80&w=300&utm_source=figma&utm_medium=referral"
                        alt={medicine.name}
                        className="w-20 h-20 object-contain"
                      />
                    </div>

                    {/* Medicine Info */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                            {medicine.name}
                          </h3>
                          {medicine.prescription && (
                            <Badge variant="outline" className="text-xs ml-2">
                              Rx
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{medicine.brand}</p>
                        <p className="text-xs text-gray-500 mt-1">{medicine.description}</p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600 ml-1">
                            {medicine.rating} ({medicine.reviews})
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs ml-auto">
                          {medicine.category}
                        </Badge>
                      </div>

                      {/* Features */}
                      <div className="flex items-center space-x-3 text-xs text-gray-600">
                        {medicine.fastDelivery && (
                          <div className="flex items-center space-x-1">
                            <Truck className="h-3 w-3 text-[var(--healthcare-green)]" />
                            <span>Fast delivery</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>2-day delivery</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">
                              ${medicine.price}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${medicine.originalPrice}
                            </span>
                          </div>
                          <div className="text-xs text-[var(--healthcare-green)]">
                            Save ${(medicine.originalPrice - medicine.price).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Add to Cart */}
                      <div className="pt-2">
                        {medicine.inStock ? (
                          cart[medicine.id] ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCart(medicine.id, -1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-sm font-medium px-2">
                                  {cart[medicine.id]}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCart(medicine.id, 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <span className="text-xs text-gray-600">
                                ${(medicine.price * cart[medicine.id]).toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => updateCart(medicine.id, 1)}
                              className="w-full bg-[var(--healthcare-blue)] hover:bg-[var(--healthcare-blue-dark)]"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          )
                        ) : (
                          <Button size="sm" variant="outline" disabled className="w-full">
                            Out of Stock
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}