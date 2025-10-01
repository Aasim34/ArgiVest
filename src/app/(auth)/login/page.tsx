import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Leaf, Tractor } from 'lucide-react';
import Link from 'next/link';

function GoogleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="21.17" y1="8" x2="12" y2="8" />
            <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
            <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
        </svg>
    )
}

export default function LoginPage() {
  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          <GoogleIcon />
          Login with Google
        </Button>
      </div>
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
