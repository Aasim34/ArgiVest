'use client';
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { BrowseFarmers } from '../components/BrowseFarmers';
import { FarmerProfile } from '../components/FarmerProfile';
import { InvestmentDashboard } from '../components/InvestmentDashboard';
import { FarmerDashboard } from '../components/FarmerDashboard';
import { Toaster } from '../components/ui/sonner';
import type { Farmer } from '../components/FarmerCard';
import { toast } from 'sonner';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userType, setUserType] = useState<'consumer' | 'farmer'>('consumer');
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  // Mock data for farmers
  const [farmers, setFarmers] = useState<Farmer[]>([
    {
      id: '1',
      name: 'Rajesh Patel',
      location: 'Gujarat, India',
      avatar: 'https://images.unsplash.com/photo-1595956481935-a9e254951d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBwb3J0cmFpdCUyMGNyb3BzfGVufDF8fHx8MTc1OTMxNTczN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      cropType: 'Wheat',
      requiredFunding: 150000,
      currentFunding: 90000,
      expectedROI: 18,
      timeline: '6 months',
      description: 'Experienced wheat farmer looking to expand cultivation using modern irrigation techniques. Planning to increase yield by 30% with sustainable farming practices.',
      experience: 15,
      farmSize: '5 acres',
      cropImage: 'https://images.unsplash.com/photo-1661369604211-357adfcef6bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3aGVhdCUyMGNyb3BzJTIwaGFydmVzdCUyMGdvbGRlbnxlbnwxfHx8fDE3NTkzMTU3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '2',
      name: 'Sunita Sharma',
      location: 'Punjab, India',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      cropType: 'Rice',
      requiredFunding: 200000,
      currentFunding: 120000,
      expectedROI: 22,
      timeline: '8 months',
      description: 'Organic rice cultivation specialist focusing on premium basmati varieties. Implementing drip irrigation and organic fertilizers for better quality produce.',
      experience: 12,
      farmSize: '8 acres',
      cropImage: 'https://images.unsplash.com/photo-1630600967074-3095a8865ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwYWdyaWN1bHR1cmUlMjBjcm9wcyUyMGZpZWxkfGVufDF8fHx8MTc1OTMxNTczNXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '3',
      name: 'Mohan Kumar',
      location: 'Karnataka, India',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      cropType: 'Cotton',
      requiredFunding: 180000,
      currentFunding: 45000,
      expectedROI: 20,
      timeline: '10 months',
      description: 'Third-generation cotton farmer adopting precision agriculture techniques. Plans to reduce water usage by 40% while maintaining high-quality fiber production.',
      experience: 20,
      farmSize: '12 acres',
      cropImage: 'https://images.unsplash.com/photo-1744726010540-bf318d4a691f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGludmVzdG1lbnQlMjBtb25leSUyMGdyb3d0aHxlbnwxfHx8fDE3NTkzMTU3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '4',
      name: 'Priya Devi',
      location: 'Uttar Pradesh, India',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b67c?w=150',
      cropType: 'Sugarcane',
      requiredFunding: 250000,
      currentFunding: 180000,
      expectedROI: 25,
      timeline: '12 months',
      description: 'Progressive sugarcane farmer implementing mechanization and modern processing techniques. Aiming for direct market sales to increase profitability.',
      experience: 8,
      farmSize: '10 acres',
      cropImage: 'https://images.unsplash.com/photo-1630600967074-3095a8865ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwYWdyaWN1bHR1cmUlMjBjcm9wcyUyMGZpZWxkfGVufDF8fHx8MTc1OTMxNTczNXww&ixlibrb-4.1.0&q=80&w=1080'
    },
    {
      id: '5',
      name: 'Ashok Singh',
      location: 'Madhya Pradesh, India',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      cropType: 'Soybean',
      requiredFunding: 120000,
      currentFunding: 30000,
      expectedROI: 16,
      timeline: '5 months',
      description: 'Young farmer introducing innovative soybean varieties with higher protein content. Focus on sustainable practices and direct-to-processor sales.',
      experience: 6,
      farmSize: '6 acres',
      cropImage: 'https://images.unsplash.com/photo-1661369604211-357adfcef6bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3aGVhdCUyMGNyb3BzJTIwaGFydmVzdCUyMGdvbGRlbnxlbnwxfHx8fDE3NTkzMTU3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '6',
      name: 'Lakshmi Reddy',
      location: 'Andhra Pradesh, India',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      cropType: 'Chili',
      requiredFunding: 100000,
      currentFunding: 75000,
      expectedROI: 28,
      timeline: '7 months',
      description: 'Spice cultivation expert specializing in high-quality red chilies. Implementing organic methods and establishing direct export channels.',
      experience: 10,
      farmSize: '3 acres',
      cropImage: 'https://images.unsplash.com/photo-1744726010540-bf318d4a691f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGludmVzdG1lbnQlMjBtb25leSUyMGdyb3d0aHxlbnwxfHx8fDE3NTkzMTU3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ]);

  // Mock investment data
  const mockInvestments = [
    {
      id: '1',
      farmerName: 'Rajesh Patel',
      farmerAvatar: 'https://images.unsplash.com/photo-1595956481935-a9e254951d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBwb3J0cmFpdCUyMGNyb3BzfGVufDF8fHx8MTc1OTMxNTczN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      cropType: 'Wheat',
      investedAmount: 25000,
      currentValue: 28500,
      expectedROI: 18,
      status: 'active' as const,
      timeline: '4 months remaining',
      progress: 65,
      lastUpdate: '2 days ago'
    },
    {
      id: '2',
      farmerName: 'Sunita Sharma',
      farmerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      cropType: 'Rice',
      investedAmount: 15000,
      currentValue: 17800,
      expectedROI: 22,
      status: 'harvesting' as const,
      timeline: '2 months remaining',
      progress: 85,
      lastUpdate: '1 week ago'
    }
  ];

  // Mock farmer data
  const mockFarmerData = {
    name: 'Rajesh Patel',
    avatar: 'https://images.unsplash.com/photo-1595956481935-a9e254951d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBwb3J0cmFpdCUyMGNyb3BzfGVufDF8fHx8MTc1OTMxNTczN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Gujarat, India',
    totalFunding: 150000,
    currentFunding: 90000,
    investors: 45,
    completedProjects: 3,
    cropType: 'Wheat',
    farmSize: '5 acres',
    experience: 15
  };

  const handleViewProfile = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setCurrentView('profile');
  };

  const handleInvest = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setCurrentView('profile');
    toast.success(`Ready to invest in ${farmer.name}'s ${farmer.cropType} project!`);
  };

  const handleInvestAmount = (amount: number) => {
    if (selectedFarmer) {
      // Update farmer's current funding
      setFarmers(prev => prev.map(f => 
        f.id === selectedFarmer.id 
          ? { ...f, currentFunding: f.currentFunding + amount }
          : f
      ));
      
      toast.success(`Successfully invested ₹${amount.toLocaleString('en-IN')} in ${selectedFarmer.name}'s project!`);
      
      // Navigate back to farmers list after investment
      setTimeout(() => {
        setCurrentView('farmers');
        setSelectedFarmer(null);
      }, 2000);
    }
  };

  const handleBackToFarmers = () => {
    setSelectedFarmer(null);
    setCurrentView('farmers');
  };

  // Auto-navigate based on user type change
  const handleUserTypeChange = (newUserType: 'consumer' | 'farmer') => {
    setUserType(newUserType);
    if (newUserType === 'farmer') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('home');
    }
  };

  const renderContent = () => {
    if (userType === 'consumer') {
      switch (currentView) {
        case 'home':
          return <HeroSection setCurrentView={setCurrentView} />;
        case 'farmers':
          return (
            <BrowseFarmers
              farmers={farmers}
              onViewProfile={handleViewProfile}
              onInvest={handleInvest}
            />
          );
        case 'profile':
          return selectedFarmer ? (
            <FarmerProfile
              farmer={selectedFarmer}
              onBack={handleBackToFarmers}
              onInvest={handleInvestAmount}
            />
          ) : (
            <BrowseFarmers
              farmers={farmers}
              onViewProfile={handleViewProfile}
              onInvest={handleInvest}
            />
          );
        case 'investments':
          return <InvestmentDashboard investments={mockInvestments} />;
        default:
          return <HeroSection setCurrentView={setCurrentView} />;
      }
    } else {
      // Farmer views
      switch (currentView) {
        case 'dashboard':
          return <FarmerDashboard farmerData={mockFarmerData} />;
        case 'funding':
        case 'updates':
        case 'earnings':
          return <FarmerDashboard farmerData={mockFarmerData} />;
        default:
          return <FarmerDashboard farmerData={mockFarmerData} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        userType={userType}
        setUserType={handleUserTypeChange}
      />
      
      <main className="min-h-[calc(100vh-64px)]">
        {renderContent()}
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}
