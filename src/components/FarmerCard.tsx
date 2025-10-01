import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { MapPin, Calendar, TrendingUp, User } from 'lucide-react';
import Image from 'next/image';

export interface Farmer {
  id: string;
  name: string;
  location: string;
  avatar: string;
  cropType: string;
  requiredFunding: number;
  currentFunding: number;
  expectedROI: number;
  timeline: string;
  description: string;
  experience: number;
  farmSize: string;
  cropImage: string;
}

interface FarmerCardProps {
  farmer: Farmer;
  onViewProfile: (farmer: Farmer) => void;
  onInvest: (farmer: Farmer) => void;
}

export function FarmerCard({ farmer, onViewProfile, onInvest }: FarmerCardProps) {
  const fundingProgress = (farmer.currentFunding / farmer.requiredFunding) * 100;
  const remainingAmount = farmer.requiredFunding - farmer.currentFunding;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Crop Image */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={farmer.cropImage}
          alt={`${farmer.cropType} farming`}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-green-600 text-white">
            {farmer.cropType}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-700">
            {farmer.experience}+ years exp
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Farmer Info */}
        <div className="flex items-start gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={farmer.avatar}
              alt={farmer.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{farmer.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{farmer.location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{farmer.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Farm Size</div>
            <div className="font-medium text-gray-900">{farmer.farmSize}</div>
          </div>
          <div>
            <div className="text-gray-500">Timeline</div>
            <div className="font-medium text-gray-900 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {farmer.timeline}
            </div>
          </div>
        </div>

        {/* Funding Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Funding Progress</span>
            <span className="font-medium text-gray-900">
              ₹{farmer.currentFunding.toLocaleString('en-IN')} / ₹{farmer.requiredFunding.toLocaleString('en-IN')}
            </span>
          </div>
          <Progress value={fundingProgress} className="h-2" />
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{Math.round(fundingProgress)}% funded</span>
            <span>₹{remainingAmount.toLocaleString('en-IN')} remaining</span>
          </div>
        </div>

        {/* ROI */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-green-700">
            <TrendingUp className="w-4 h-4" />
            <span>Expected ROI</span>
          </div>
          <span className="font-semibold text-green-600">{farmer.expectedROI}%</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => onViewProfile(farmer)}
            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            View Profile
          </Button>
          <Button
            onClick={() => onInvest(farmer)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={fundingProgress >= 100}
          >
            {fundingProgress >= 100 ? 'Fully Funded' : 'Fund Now'}
          </Button>
        </div>
      </div>
    </div>
  );
}
