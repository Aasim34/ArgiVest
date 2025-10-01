'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockData } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';

// This is a client-side redirect component.
// In a real app with server-side auth, you might handle this redirect in middleware.
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd get the user from an auth context.
    // We'll simulate this with a slight delay.
    const timer = setTimeout(() => {
      const user = mockData.getCurrentUser('Admin'); // Change role to test: 'Farmer', 'Consumer', 'Admin'
      
      if (user) {
        switch (user.role) {
          case 'Farmer':
            router.replace('/dashboard/farmer');
            break;
          case 'Consumer':
            router.replace('/dashboard/consumer');
            break;
          case 'Admin':
            router.replace('/dashboard/admin');
            break;
          default:
            router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full p-8">
        <div className="space-y-4 w-full max-w-md">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
    </div>
  );
}
