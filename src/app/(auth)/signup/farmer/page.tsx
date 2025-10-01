import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function FarmerSignupPage() {
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-2xl font-bold font-headline">Farmer Signup</h1>
        <p className="text-balance text-muted-foreground">
          Create an account to get funding for your projects.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="full-name">Full Name</Label>
          <Input id="full-name" placeholder="Max Robinson" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="aadhar-number">Aadhar Number</Label>
          <Input id="aadhar-number" placeholder="XXXX XXXX XXXX" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pan-number">PAN Number</Label>
          <Input id="pan-number" placeholder="ABCDE1234F" required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="land-area">Land Area (in acres)</Label>
            <Input id="land-area" type="number" placeholder="e.g., 5" required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="address-proof">Address Proof</Label>
            <Input id="address-proof" type="file" required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="land-certificate">Land Certificate</Label>
            <Input id="land-certificate" type="file" required />
        </div>
        <Button type="submit" className="w-full">
          Create Farmer Account
        </Button>
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
