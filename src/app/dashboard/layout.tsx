// This should be a client component to handle user roles and dynamic sidebar content
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';
import { mockData } from '@/lib/mock-data';
import { Badge, BarChart, CircleUser, DollarSign, Leaf, LogOut, Shield, ShoppingCart, Tractor } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // In a real app, this would come from an auth context
  const user = mockData.getCurrentUser('Admin'); // Change role: 'Farmer', 'Consumer', 'Admin'

  const getNavItems = (role: 'Farmer' | 'Consumer' | 'Admin') => {
    switch (role) {
      case 'Farmer':
        return [
          { href: '/dashboard/farmer', label: 'My Projects', icon: <Tractor /> },
          { href: '/dashboard/farmer/earnings', label: 'Earnings', icon: <DollarSign /> },
        ];
      case 'Consumer':
        return [
          { href: '/dashboard/consumer', label: 'My Investments', icon: <Leaf /> },
          { href: '/dashboard/consumer/wallet', label: 'Wallet', icon: <ShoppingCart /> },
        ];
      case 'Admin':
        return [
          { href: '/dashboard/admin', label: 'Approve Projects', icon: <Shield /> },
          { href: '/dashboard/admin/simulation', label: 'Simulation Tool', icon: <BarChart /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems(user.role);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className='flex items-center gap-3 p-2 rounded-md bg-sidebar-accent'>
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='overflow-hidden group-data-[collapsible=icon]:hidden'>
                    <p className='font-semibold truncate'>{user.name}</p>
                    <p className='text-xs text-muted-foreground truncate'>{user.role}</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto group-data-[collapsible=icon]:hidden">
                    <LogOut className='h-5 w-5' />
                </Button>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b md:justify-end">
            <div className="md:hidden">
                <SidebarTrigger />
            </div>
            {/* You can add a user menu or other header items here for mobile */}
        </header>
        <div className="p-4 md:p-8">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
