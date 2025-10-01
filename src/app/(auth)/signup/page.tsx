import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Tractor } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <>
      <div className="grid gap-4">
          <Link href="/signup/investor">
            <Card className="hover:bg-accent hover:shadow-lg transition-all">
                <CardHeader className="flex-row items-center gap-4">
                    <Leaf className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle className="font-headline text-lg">Sign up as an Investor</CardTitle>
                        <CardDescription>Fund projects and grow with nature.</CardDescription>
                    </div>
                </CardHeader>
            </Card>
          </Link>
           <Link href="/signup/farmer">
            <Card className="hover:bg-accent hover:shadow-lg transition-all">
                <CardHeader className="flex-row items-center gap-4">
                    <Tractor className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle className="font-headline text-lg">Sign up as a Farmer</CardTitle>
                        <CardDescription>Get funding for your agricultural projects.</CardDescription>
                    </div>
                </CardHeader>
            </Card>
          </Link>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </>
  );
}
