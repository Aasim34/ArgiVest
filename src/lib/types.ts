export type UserRole = 'Farmer' | 'Consumer' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletBalance: number;
  avatarUrl: string;
}

export type ProjectStatus = 'Funding' | 'InProgress' | 'Complete' | 'Pending';

export interface Project {
  id: string;
  farmerId: string;
  cropName: string;
  description: string;
  fundingGoal: number;
  raisedAmount: number;
  profitSplit: number; // e.g., 0.3 for 30%
  status: ProjectStatus;
  createdAt: string;
  imageUrl: string;
  imageHint: string;
  farmer?: User;
}

export interface Investment {
  id: string;
  projectId: string;
  consumerId: string;
  amount: number;
  createdAt: string;
  project?: Project;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'funding' | 'payout';
  amount: number;
  timestamp: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  mediaUrl: string;
  description: string;
  createdAt: string;
}
