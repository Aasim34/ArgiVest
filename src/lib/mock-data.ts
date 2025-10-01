import { User, Project, Investment, Transaction } from './types';
import { PlaceHolderImages } from './placeholder-images';

const users: User[] = [
  {
    id: 'farmer1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Farmer',
    walletBalance: 1250.0,
    avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-farmer-1')?.imageUrl || '',
  },
  {
    id: 'farmer2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Farmer',
    walletBalance: 3400.0,
    avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-farmer-2')?.imageUrl || '',
  },
  {
    id: 'consumer1',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    role: 'Consumer',
    walletBalance: 500.0,
    avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-consumer-1')?.imageUrl || '',
  },
  {
    id: 'consumer2',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    role: 'Consumer',
    walletBalance: 250.0,
    avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-consumer-2')?.imageUrl || '',
  },
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@agrivest.com',
    role: 'Admin',
    walletBalance: 0,
    avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-admin')?.imageUrl || '',
  },
];

const projects: Project[] = [
  {
    id: 'proj1',
    farmerId: 'farmer1',
    cropName: 'Organic Tomatoes',
    description: 'Funding for a new greenhouse to grow organic tomatoes year-round. Our methods are 100% organic and sustainable.',
    fundingGoal: 5000,
    raisedAmount: 3750,
    profitSplit: 0.4,
    status: 'Funding',
    createdAt: '2023-10-01T10:00:00Z',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-tomato')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-tomato')?.imageHint || '',
  },
  {
    id: 'proj2',
    farmerId: 'farmer2',
    cropName: 'Hydroponic Lettuce',
    description: 'We are expanding our farm with a state-of-the-art hydroponic system for crisp, fresh lettuce.',
    fundingGoal: 7500,
    raisedAmount: 7500,
    profitSplit: 0.35,
    status: 'InProgress',
    createdAt: '2023-09-15T14:30:00Z',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-lettuce')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-lettuce')?.imageHint || '',
  },
  {
    id: 'proj3',
    farmerId: 'farmer1',
    cropName: 'Sweet Corn',
    description: 'Help us plant 10 acres of sweet corn for the summer season. We use traditional farming techniques passed down through generations.',
    fundingGoal: 3000,
    raisedAmount: 1200,
    profitSplit: 0.5,
    status: 'Funding',
    createdAt: '2023-10-20T09:00:00Z',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-corn')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-corn')?.imageHint || '',
  },
  {
    id: 'proj4',
    farmerId: 'farmer2',
    cropName: 'Golden Wheat',
    description: 'This project is for our annual wheat harvest. The funds will be used for new equipment to increase yield.',
    fundingGoal: 10000,
    raisedAmount: 10000,
    profitSplit: 0.3,
    status: 'Complete',
    createdAt: '2023-08-01T12:00:00Z',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-wheat')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-wheat')?.imageHint || '',
  },
];

const investments: Investment[] = [
  { id: 'inv1', projectId: 'proj1', consumerId: 'consumer1', amount: 500, createdAt: '2023-10-02T11:00:00Z' },
  { id: 'inv2', projectId: 'proj1', consumerId: 'consumer2', amount: 1000, createdAt: '2023-10-03T12:00:00Z' },
  { id: 'inv3', projectId: 'proj2', consumerId: 'consumer1', amount: 2000, createdAt: '2023-09-16T15:00:00Z' },
  { id: 'inv4', projectId: 'proj4', consumerId: 'consumer2', amount: 3000, createdAt: '2023-08-05T18:00:00Z' },
];

const transactions: Transaction[] = [
  { id: 'txn1', userId: 'consumer1', type: 'funding', amount: 500, timestamp: '2023-10-02T11:00:00Z' },
  { id: 'txn2', userId: 'consumer2', type: 'funding', amount: 1000, timestamp: '2023-10-03T12:00:00Z' },
  { id: 'txn3', userId: 'consumer1', type: 'funding', amount: 2000, timestamp: '2023-09-16T15:00:00Z' },
  { id: 'txn4', userId: 'consumer2', type: 'funding', amount: 3000, timestamp: '2023-08-05T18:00:00Z' },
  { id: 'txn5', userId: 'farmer2', type: 'payout', amount: 3000, timestamp: '2023-09-20T10:00:00Z' },
  { id: 'txn6', userId: 'consumer2', type: 'payout', amount: 7000, timestamp: '2023-09-20T10:00:00Z' },
];

// Attach farmer details to projects for easy access
projects.forEach(p => {
  p.farmer = users.find(u => u.id === p.farmerId);
});

// Attach project details to investments
investments.forEach(i => {
    i.project = projects.find(p => p.id === i.projectId);
});


export const mockData = {
  users,
  projects,
  investments,
  transactions,
  getCurrentUser: (role: 'Farmer' | 'Consumer' | 'Admin' = 'Consumer') => users.find(u => u.role === role)!,
};
