'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { 
  MapPin, 
  Calendar, 
  TrendingUp, 
  User, 
  ArrowLeft, 
  Phone, 
  Mail,
  Award,
  Sprout,
  DollarSign,
  Clock,
  Star
} from 'lucide-react';
import Image from 'next/image';
import { Farmer } from './FarmerCard';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface FarmerProfileProps {
  farmer: Farmer;
  onBack: () => void;
  onInvest: (amount: number) => void;
}

export function FarmerProfile({ farmer, onBack, onInvest }: FarmerProfileProps) {
  const [investAmount, setInvestAmount] = useState<string>('');
  const fundingProgress = (farmer.currentFunding / farmer.requiredFunding) * 100;
  const remainingAmount = farmer.requiredFunding - farmer.currentFunding;

  const handleInvest = () => {
    const amount = parseFloat(investAmount);
    if (amount > 0 && amount <= remainingAmount) {
      onInvest(amount);
      setInvestAmount('');
    }
  };

  const milestones = [
    { phase: 'Land Preparation', status: 'completed', date: 'Oct 2024' },
    { phase: 'Seed Sowing', status: 'completed', date: 'Nov 2024' },
    { phase: 'Crop Monitoring', status: 'current', date: 'Dec 2024 - Feb 2025' },
    { phase: 'Harvest & Sale', status: 'upcoming', date: 'Mar 2025' },
    { phase: 'Returns Distribution', status: 'upcoming', date: 'Apr 2025' }
  ];

  const feedback = [
    {
      id: '1',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Rajesh is an incredibly dedicated farmer. The project updates were timely, and the final produce was of excellent quality. Highly recommended!'
    },
    {
      id: '2',
      name: 'Amit Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 4,
      date: '1 month ago',
      comment: 'A very transparent and well-managed project. The ROI was as expected. I would have liked more frequent photo updates, but overall a great experience.'
    },
     {
      id: '3',
      name: 'Sunita Devi',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 5,
      date: '3 months ago',
      comment: 'Fantastic experience from start to finish. The use of modern technology was impressive, and the final returns exceeded my expectations. Will invest again!'
    }
  ];


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Farmers
        </Button>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Farmers</span>
          <span>/</span>
          <span className="text-gray-900">{farmer.name}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 relative">
                  <Image
                    src={farmer.avatar}
                    alt={farmer.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{farmer.name}</h1>
                    <Badge className="bg-green-600 text-white">{farmer.cropType}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{farmer.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{farmer.experience}+ years experience</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600">{farmer.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Farm Size</div>
                    <div className="font-medium text-gray-900">{farmer.farmSize}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Crop Type</div>
                    <div className="font-medium text-gray-900">{farmer.cropType}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Timeline</div>
                    <div className="font-medium text-gray-900">{farmer.timeline}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Expected ROI</div>
                    <div className="font-medium text-green-600">{farmer.expectedROI}%</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Crop Images */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Crop Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden h-48">
                <Image
                  src={farmer.cropImage}
                  alt="Current crop status"
                  fill
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-900">Current Status</div>
                    <div className="text-xs text-gray-600">Crop monitoring phase - 60% growth</div>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden h-48">
                <Image
                  src="https://images.unsplash.com/photo-1661369604211-357adfcef6bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3aGVhdCUyMGNyb3BzJTIwaGFydmVzdCUyMGdvbGRlbnxlbnwxfHx8fDE3NTkzMTU3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Expected harvest"
                  fill
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-900">Expected Harvest</div>
                    <div className="text-xs text-gray-600">Projected yield - March 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Project Timeline */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline</h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                    milestone.status === 'completed' 
                      ? 'bg-green-500' 
                      : milestone.status === 'current'
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        milestone.status === 'completed' 
                          ? 'text-green-700' 
                          : milestone.status === 'current'
                          ? 'text-blue-700'
                          : 'text-gray-600'
                      }`}>
                        {milestone.phase}
                      </span>
                      <span className="text-sm text-gray-500">{milestone.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Investor Feedback */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Investor Feedback</h2>
            <div className="space-y-6">
              {feedback.map((fb) => (
                <div key={fb.id} className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={fb.avatar} alt={fb.name} />
                    <AvatarFallback>{fb.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{fb.name}</div>
                        <div className="text-xs text-gray-500">{fb.date}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < fb.rating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{fb.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Investment Panel */}
        <div className="space-y-6">
          {/* Funding Progress */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  ₹{farmer.currentFunding.toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-gray-500">
                  of ₹{farmer.requiredFunding.toLocaleString('en-IN')} goal
                </div>
              </div>
              
              <Progress value={fundingProgress} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{Math.round(fundingProgress)}%</div>
                  <div className="text-gray-500">Funded</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">45</div>
                  <div className="text-gray-500">Investors</div>
                </div>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-600">₹{remainingAmount.toLocaleString('en-IN')}</div>
                <div className="text-sm text-green-600">still needed</div>
              </div>
            </div>
          </Card>

          {/* Investment Form */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Make an Investment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount (₹)
                </label>
                <Input
                  type="number"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="100"
                  max={remainingAmount}
                />
                <div className="text-xs text-gray-500 mt-1">
                  Minimum: ₹100 | Maximum: ₹{remainingAmount.toLocaleString('en-IN')}
                </div>
              </div>
              
              {investAmount && parseFloat(investAmount) > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg text-sm">
                  <div className="flex justify-between">
                    <span>Investment:</span>
                    <span>₹{parseFloat(investAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Returns ({farmer.expectedROI}%):</span>
                    <span className="text-green-600">
                      ₹{(parseFloat(investAmount) * (1 + farmer.expectedROI / 100)).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              )}
              
              <Button
                onClick={handleInvest}
                disabled={!investAmount || parseFloat(investAmount) <= 0 || parseFloat(investAmount) > remainingAmount}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Invest Now
              </Button>
            </div>
          </Card>

          {/* Key Metrics */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Key Metrics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Expected ROI</span>
                </div>
                <span className="font-medium text-green-600">{farmer.expectedROI}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm">Timeline</span>
                </div>
                <span className="font-medium">{farmer.timeline}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Risk Level</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Low</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
