import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Sprout,
  Eye,
  Download,
  PieChart
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Investment {
  id: string;
  farmerName: string;
  farmerAvatar: string;
  cropType: string;
  investedAmount: number;
  currentValue: number;
  expectedROI: number;
  status: 'active' | 'completed' | 'harvesting';
  timeline: string;
  progress: number;
  lastUpdate: string;
}

interface InvestmentDashboardProps {
  investments: Investment[];
}

export function InvestmentDashboard({ investments }: InvestmentDashboardProps) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.investedAmount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturns = totalCurrentValue - totalInvested;
  const overallROI = totalInvested > 0 ? ((totalReturns / totalInvested) * 100) : 0;

  const activeInvestments = investments.filter(inv => inv.status === 'active').length;
  const completedInvestments = investments.filter(inv => inv.status === 'completed').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Investment Dashboard</h1>
        <p className="text-gray-600">Track your agricultural investments and returns</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ₹{totalInvested.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-gray-500">Total Invested</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ₹{totalCurrentValue.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-gray-500">Current Value</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <PieChart className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">
                +{overallROI.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">Overall ROI</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{activeInvestments}</div>
              <div className="text-sm text-gray-500">Active Investments</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Portfolio Summary */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Portfolio Summary</h2>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedInvestments}</div>
            <div className="text-sm text-green-700">Completed Projects</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{activeInvestments}</div>
            <div className="text-sm text-blue-700">Active Projects</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">
              ₹{totalReturns > 0 ? totalReturns.toLocaleString('en-IN') : '0'}
            </div>
            <div className="text-sm text-amber-700">Total Returns</div>
          </div>
        </div>
      </Card>

      {/* Investment List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Your Investments</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Active</Button>
            <Button variant="outline" size="sm">Completed</Button>
          </div>
        </div>

        <div className="space-y-4">
          {investments.map((investment) => (
            <div key={investment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                {/* Farmer Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <ImageWithFallback
                    src={investment.farmerAvatar}
                    alt={investment.farmerName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Investment Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{investment.farmerName}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700">{investment.cropType}</Badge>
                        <Badge 
                          variant="secondary"
                          className={
                            investment.status === 'completed' 
                              ? 'bg-green-100 text-green-700'
                              : investment.status === 'harvesting'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }
                        >
                          {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-gray-500">Invested</div>
                      <div className="font-medium">₹{investment.investedAmount.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Current Value</div>
                      <div className="font-medium">₹{investment.currentValue.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Expected ROI</div>
                      <div className="font-medium text-green-600">+{investment.expectedROI}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Timeline</div>
                      <div className="font-medium">{investment.timeline}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Project Progress</span>
                      <span>{investment.progress}% complete</span>
                    </div>
                    <Progress value={investment.progress} className="h-2" />
                    <div className="text-xs text-gray-500">
                      Last update: {investment.lastUpdate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {investments.length === 0 && (
          <div className="text-center py-12">
            <Sprout className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No investments yet</h3>
            <p className="text-gray-500 mb-4">Start investing in farmers to see your portfolio here</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Browse Farmers
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}