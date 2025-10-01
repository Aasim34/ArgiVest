import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/components/app-provider';

export const metadata: Metadata = {
  title: 'AgriCrowd',
  description: 'Invest in Farmers, Grow with Nature',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
          <AppProvider>
            {children}
          </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
