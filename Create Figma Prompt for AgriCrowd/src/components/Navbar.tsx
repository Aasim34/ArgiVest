import { useState } from 'react';
import { Button } from './ui/button';
import { User, Home, Users, TrendingUp, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  userType: 'consumer' | 'farmer';
  setUserType: (type: 'consumer' | 'farmer') => void;
}

export function Navbar({ currentView, setCurrentView, userType, setUserType }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = userType === 'consumer' 
    ? [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'farmers', label: 'Farmers', icon: Users },
        { id: 'investments', label: 'My Investments', icon: TrendingUp },
        { id: 'profile', label: 'Profile', icon: User },
      ]
    : [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'funding', label: 'Funding Status', icon: TrendingUp },
        { id: 'updates', label: 'Updates', icon: Users },
        { id: 'earnings', label: 'Earnings', icon: User },
      ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">AgriCrowd</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Type Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setUserType('consumer')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  userType === 'consumer'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                Investor
              </button>
              <button
                onClick={() => setUserType('farmer')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  userType === 'farmer'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                Farmer
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
              
              {/* Mobile User Type Toggle */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => {
                      setUserType('consumer');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 rounded-md transition-colors ${
                      userType === 'consumer'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Investor
                  </button>
                  <button
                    onClick={() => {
                      setUserType('farmer');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 rounded-md transition-colors ${
                      userType === 'farmer'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Farmer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}