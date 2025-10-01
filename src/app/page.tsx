import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Leaf, Users, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Direct Impact',
    description: 'Directly fund farmers and witness the growth of your investment from seed to harvest.',
    image: PlaceHolderImages.find(p => p.id === 'feature-1'),
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Community Growth',
    description: 'Join a community of conscious consumers and farmers working together for a sustainable future.',
    image: PlaceHolderImages.find(p => p.id === 'feature-2'),
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Shared Success',
    description: 'Participate in the profits of a successful harvest and enjoy the fruits of your support.',
    image: PlaceHolderImages.find(p => p.id === 'feature-3'),
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
              Invest in the Future of Farming
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl font-body">
              AgriVest connects you with local farmers, allowing you to fund their crops and share in the harvest.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Link href="/projects">
                Browse Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-body">How It Works</div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">A New Way to Grow Together</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
                  Our platform makes it simple and transparent to support agriculture and earn returns.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center gap-4">
                  {feature.icon}
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                    <p className="text-muted-foreground font-body">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Ready to Make a Difference?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
                Explore active projects from passionate farmers and start your investment journey today. Your support can cultivate change.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <Link href="/projects">
                  Invest Now
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
