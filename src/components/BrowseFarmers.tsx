'use client';
import { useState, useMemo } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Grid,
  List
} from 'lucide-react';
import { FarmerCard, type Farmer } from './FarmerCard';

interface BrowseFarmersProps {
  farmers: Farmer[];
  onViewProfile: (farmer: Farmer) => void;
  onInvest: (farmer: Farmer) => void;
}

export function BrowseFarmers({ farmers, onViewProfile, onInvest }: BrowseFarmersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('funding');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique crop types and locations for filters
  const cropTypes = useMemo(() => 
    [...new Set(farmers.map(f => f.cropType))], [farmers]
  );
  
  const locations = useMemo(() => 
    [...new Set(farmers.map(f => f.location.split(',')[0]))], [farmers]
  );

  // Filter and sort farmers
  const filteredFarmers = useMemo(() => {
    let filtered = farmers.filter(farmer => {
      const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           farmer.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCrop = selectedCrop === 'all' || farmer.cropType === selectedCrop;
      const matchesLocation = selectedLocation === 'all' || farmer.location.includes(selectedLocation);
      
      return matchesSearch && matchesCrop && matchesLocation;
    });

    // Sort farmers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'funding':
          return (b.requiredFunding - b.currentFunding) - (a.requiredFunding - a.currentFunding);
        case 'roi':
          return b.expectedROI - a.expectedROI;
        case 'timeline':
          return a.timeline.localeCompare(b.timeline);
        case 'progress':
          return ((b.currentFunding / b.requiredFunding) * 100) - ((a.currentFunding / a.requiredFunding) * 100);
        default:
          return 0;
      }
    });

    return filtered;
  }, [farmers, searchTerm, selectedCrop, selectedLocation, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Browse Farmers</h1>
        <p className="text-gray-600">
          Discover and invest in agricultural projects across India
        </p>
      </div>

      {/* Filters & Search */}
      <Card className="p-6 mb-8">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search farmers, crops, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Crop Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Crop:</span>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="all">All Crops</option>
                {cropTypes.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Location:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="funding">Funding Needed</option>
                <option value="roi">Expected ROI</option>
                <option value="timeline">Timeline</option>
                <option value="progress">Funding Progress</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 ml-auto">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{filteredFarmers.length}</div>
          <div className="text-sm text-gray-500">Farmers Found</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            ₹{filteredFarmers.reduce((sum, f) => sum + (f.requiredFunding - f.currentFunding), 0).toLocaleString('en-IN')}
          </div>
          <div className="text-sm text-gray-500">Total Funding Needed</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(filteredFarmers.reduce((sum, f) => sum + f.expectedROI, 0) / filteredFarmers.length || 0)}%
          </div>
          <div className="text-sm text-gray-500">Avg Expected ROI</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">{cropTypes.length}</div>
          <div className="text-sm text-gray-500">Crop Varieties</div>
        </div>
      </div>

      {/* Results */}
      {filteredFarmers.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No farmers found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCrop('all');
              setSelectedLocation('all');
            }}
          >
            Clear Filters
          </Button>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredFarmers.map((farmer) => (
            viewMode === 'grid' ? (
              <FarmerCard
                key={farmer.id}
                farmer={farmer}
                onViewProfile={onViewProfile}
                onInvest={onInvest}
              />
            ) : (
              <Card key={farmer.id} className="p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{farmer.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{farmer.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{farmer.timeline}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-green-100 text-green-700">{farmer.cropType}</Badge>
                        <Badge variant="secondary">{farmer.experience}+ years</Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-2">{farmer.description}</p>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Required</div>
                        <div className="font-medium">₹{farmer.requiredFunding.toLocaleString('en-IN')}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Funded</div>
                        <div className="font-medium">₹{farmer.currentFunding.toLocaleString('en-IN')}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Progress</div>
                        <div className="font-medium">{Math.round((farmer.currentFunding / farmer.requiredFunding) * 100)}%</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Expected ROI</div>
                        <div className="font-medium text-green-600">{farmer.expectedROI}%</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewProfile(farmer)}
                      >
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onInvest(farmer)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Fund Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          ))}
        </div>
      )}

      {/* Load More (placeholder) */}
      {filteredFarmers.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Farmers
          </Button>
        </div>
      )}
    </div>
  );
}
