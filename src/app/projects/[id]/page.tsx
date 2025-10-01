import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { mockData } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Percent, Target } from 'lucide-react';

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = mockData.projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const fundingPercentage = (project.raisedAmount / project.fundingGoal) * 100;

  const stats = [
    { icon: <Target className="h-6 w-6 text-primary"/>, label: "Funding Goal", value: `$${project.fundingGoal.toLocaleString()}`},
    { icon: <DollarSign className="h-6 w-6 text-primary"/>, label: "Raised", value: `$${project.raisedAmount.toLocaleString()}`},
    { icon: <Percent className="h-6 w-6 text-primary"/>, label: "Farmer's Split", value: `${project.profitSplit * 100}%`},
    { icon: <Calendar className="h-6 w-6 text-primary"/>, label: "Started On", value: new Date(project.createdAt).toLocaleDateString()},
  ]

  return (
    <div className="container mx-auto max-w-6xl py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div className='relative w-full h-96 rounded-lg overflow-hidden shadow-lg'>
             <Image
                src={project.imageUrl}
                alt={project.description}
                data-ai-hint={project.imageHint}
                fill
                className="object-cover"
              />
              <div className='absolute top-4 left-4'>
                <Badge variant={project.status === 'Funding' ? 'default' : 'secondary'}>{project.status}</Badge>
              </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold font-headline mb-2">{project.cropName}</h1>
            <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={project.farmer?.avatarUrl} />
                        <AvatarFallback>{project.farmer?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{project.farmer?.name}</span>
                </div>
            </div>
            <p className="text-lg font-body text-foreground/80">{project.description}</p>
          </div>

          <Card>
            <CardHeader>
                <CardTitle className='font-headline'>Project Statistics</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
                {stats.map(stat => (
                    <div key={stat.label} className='flex flex-col items-center text-center gap-2 p-4 bg-card rounded-lg'>
                        {stat.icon}
                        <p className='text-2xl font-bold font-headline'>{stat.value}</p>
                        <p className='text-sm text-muted-foreground'>{stat.label}</p>
                    </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className='font-headline'>Updates from the Farm</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-muted-foreground'>No updates yet. Check back soon!</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className='font-headline'>Fund this Project</CardTitle>
              <CardDescription>Your investment directly supports the farmer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                  <Progress value={fundingPercentage} className="w-full h-3 mb-2" />
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-primary">
                      {fundingPercentage.toFixed(0)}% funded
                    </span>
                  </div>
                </div>

                <Separator />
                
                {project.status === 'Funding' ? (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="investment-amount">Investment Amount ($)</Label>
                        <Input id="investment-amount" type="number" placeholder="e.g., 100" />
                    </div>
                    <Button className="w-full" size="lg">Invest Now</Button>
                    <p className='text-xs text-muted-foreground text-center'>You are contributing to a sustainable future.</p>
                </div>
                ) : (
                <div className='text-center p-4 bg-muted rounded-lg'>
                    <p className='font-medium'>{project.status === 'InProgress' ? 'Funding for this project is closed.' : 'This project is complete.'}</p>
                    <p className='text-sm text-muted-foreground'>{project.status === 'InProgress' ? 'Check back for updates!' : 'Thank you for your support!'}</p>
                </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
