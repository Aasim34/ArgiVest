'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Leaf, Tractor } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would have authentication logic here.
    // For now, we'll just redirect to the dashboard.
    router.push('/dashboard');
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>
      <Separator className="my-4" />
      <div className="grid gap-4">
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account? Sign up as...
        </div>
        <Button variant="outline" asChild>
          <Link href="/signup/investor">
            <Leaf className="mr-2 h-4 w-4" />
            Investor
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/signup/farmer">
            <Tractor className="mr-2 h-4 w-4" />
            Farmer
          </Link>
        </Button>
      </div>
    </>
  );
}
