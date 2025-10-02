'use client';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Upload, 
  Camera, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  MapPin,
  Sprout,
  PieChart,
  Plus,
  Edit,
  Star,
  MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface FarmerDashboardProps {
  farmerData: {
    name: string;
    avatar: string;
    location: string;
    totalFunding: number;
    currentFunding: number;
    investors: number;
    completedProjects: number;
    cropType: string;
    farmSize: string;
    experience: number;
  };
}

export function FarmerDashboard({ farmerData }: FarmerDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newUpdate, setNewUpdate] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);
  
  const fundingProgress = (farmerData.currentFunding / farmerData.totalFunding) * 100;
  const remainingAmount = farmerData.totalFunding - farmerData.currentFunding;

  const recentUpdates = [
    {
      id: 1,
      date: '2024-12-15',
      content: 'Crop monitoring phase completed successfully. Growth rate is 15% above expected.',
      images: 2
    },
    {
      id: 2,
      date: '2024-12-10',
      content: 'Irrigation system installed and tested. Water efficiency improved by 30%.',
      images: 3
    },
    {
      id: 3,
      date: '2024-12-05',
      content: 'Seed sowing completed across 5 acres. Weather conditions are favorable.',
      images: 1
    }
  ];

  const contributors = [
    { name: 'Rahul Sharma', amount: 25000, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { name: 'Priya Patel', amount: 20000, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b67c?w=150' },
    { name: 'Amit Kumar', amount: 15000, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
    { name: 'Sunita Devi', amount: 10000, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
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
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 relative">
              <Image
                src={farmerData.avatar}
                alt={farmerData.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {farmerData.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{farmerData.location}</span>
                <span>•</span>
                <span>{farmerData.experience}+ years experience</span>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
      </div>
      
      {isEditing && (
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Edit Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={farmerData.name} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={farmerData.location} />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" defaultValue={farmerData.experience} />
            </div>
            <div>
              <Label htmlFor="farmSize">Farm Size</Label>
              <Input id="farmSize" defaultValue={farmerData.farmSize} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="avatar">Profile Picture URL</Label>
              <Input id="avatar" defaultValue={farmerData.avatar} />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={() => setIsEditing(false)} className="bg-green-600 hover:bg-green-700 text-white">Save Changes</Button>
          </div>
        </Card>
      )}


      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ₹{farmerData.currentFunding.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-gray-500">Current Funding</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{farmerData.investors}</div>
              <div className="text-sm text-gray-500">Active Investors</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{farmerData.completedProjects}</div>
              <div className="text-sm text-gray-500">Completed Projects</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{farmerData.farmSize}</div>
              <div className="text-sm text-gray-500">Farm Size</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Project Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Current Project: {farmerData.cropType}</h2>
              <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Funding Progress</span>
                <span className="font-medium">
                  ₹{farmerData.currentFunding.toLocaleString('en-IN')} / ₹{farmerData.totalFunding.toLocaleString('en-IN')}
                </span>
              </div>
              <Progress value={fundingProgress} className="h-3" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{Math.round(fundingProgress)}% funded</span>
                <span>₹{remainingAmount.toLocaleString('en-IN')} remaining</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div>
                <div className="text-sm text-gray-500">Crop Type</div>
                <div className="font-medium">{farmerData.cropType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Farm Size</div>
                <div className="font-medium">{farmerData.farmSize}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Timeline</div>
                <div className="font-medium">6 months</div>
              </div>
            </div>
          </Card>

          {/* Updates Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Project Updates</h2>
              <Button size="sm" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4" />
                Add Update
              </Button>
            </div>

            {/* Add New Update */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="update" className="text-sm font-medium text-gray-700 mb-2 block">
                Share progress with your investors
              </Label>
              <Textarea
                id="update"
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
                placeholder="Describe the latest progress, challenges, or milestones..."
                className="mb-3"
                rows={3}
              />
              <div className="flex items-center gap-3">
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Add Photos
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Files
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white ml-auto">
                  Post Update
                </Button>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <div key={update.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{update.date}</span>
                    <Badge variant="secondary" className="text-xs">
                      {update.images} photos
                    </Badge>
                  </div>
                  <p className="text-gray-700">{update.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Camera className="w-4 h-4" />
                Upload Crop Photos
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <PieChart className="w-4 h-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Calendar className="w-4 h-4" />
                Schedule Update
              </Button>
            </div>
          </Card>
          
          {/* Investor Feedback Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              Investor Feedback
            </h3>
            <div className="space-y-4 mb-6">
              {feedback.slice(0, 2).map((fb) => (
                <div key={fb.id} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={fb.avatar} alt={fb.name} />
                    <AvatarFallback>{fb.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{fb.name}</div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < fb.rating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{fb.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Feedback
            </Button>
            
            <div className="border-t border-gray-100 my-6"></div>

            <h4 className="font-medium text-gray-900 mb-4">Leave Feedback</h4>
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Rating</Label>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <button key={i} onClick={() => setFeedbackRating(i + 1)}>
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          i < feedbackRating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-gray-300 hover:text-amber-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="feedback-comment" className="text-sm">Comment</Label>
                <Textarea
                  id="feedback-comment"
                  placeholder="Share your experience..."
                  className="mt-2"
                  rows={3}
                />
              </div>
              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                Submit Feedback
              </Button>
            </div>
          </Card>


          {/* Top Contributors */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Top Contributors</h3>
            <div className="space-y-3">
              {contributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    <Image
                      src={contributor.avatar}
                      alt={contributor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {contributor.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      ₹{contributor.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Investors
            </Button>
          </Card>

          {/* Earnings Summary */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Earnings Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Project</span>
                <span className="font-medium">₹{farmerData.currentFunding.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Previous Projects</span>
                <span className="font-medium">₹3,45,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Platform Fee (5%)</span>
                <span className="font-medium text-red-600">-₹17,250</span>
              </div>
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Total Earnings</span>
                  <span className="font-bold text-green-600">₹4,27,750</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Milestones */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upcoming Milestones</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">Crop Monitoring Review</div>
                  <div className="text-gray-500">Due in 5 days</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">Harvest Preparation</div>
                  <div className="text-gray-500">Due in 2 weeks</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">Expected Harvest</div>
                  <div className="text-gray-500">Due in 6 weeks</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
