import { Button } from './ui/button';
import { TrendingUp, Users, Shield, Sprout } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
  setCurrentView: (view: string) => void;
}

export function HeroSection({ setCurrentView }: HeroSectionProps) {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-amber-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <Sprout className="w-4 h-4" />
                <span className="text-sm font-medium">Invest in Agriculture's Future</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-green-600">Invest in Farmers,</span>
                <br />
                Grow with Nature
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg">
                Connect directly with farmers, support sustainable agriculture, and earn returns while making a positive impact on rural communities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setCurrentView('farmers')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
                size="lg"
              >
                Start Investing
              </Button>
              <Button 
                variant="outline" 
                className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-3 rounded-xl"
                size="lg"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1,200+</div>
                <div className="text-sm text-gray-600">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹45L+</div>
                <div className="text-sm text-gray-600">Funds Raised</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">18%</div>
                <div className="text-sm text-gray-600">Avg Returns</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 lg:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1630600967074-3095a8865ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwYWdyaWN1bHR1cmUlMjBjcm9wcyUyMGZpZWxkfGVufDF8fHx8MTc1OTMxNTczNXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Farmers working in agricultural field"
                fill
                className="object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute top-6 right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">ROI Growth</div>
                    <div className="text-xs text-gray-500">+15.2% this month</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">5,000+ Investors</div>
                    <div className="text-xs text-gray-500">Supporting farmers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Investments</h3>
                <p className="text-sm text-gray-600">Bank-grade security for all transactions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Transparent Returns</h3>
                <p className="text-sm text-gray-600">Real-time tracking of your investments</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Community Impact</h3>
                <p className="text-sm text-gray-600">Direct support to rural communities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
