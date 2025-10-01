import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockData } from '@/lib/mock-data';
import { Investment } from '@/lib/types';
import { ArrowRight, DollarSign, Sprout } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const InvestmentCard = ({ investment }: { investment: Investment }) => {
    if (!investment.project) return null;
    const fundingPercentage = (investment.project.raisedAmount / investment.project.fundingGoal) * 100;

    return (
        <Card className="overflow-hidden">
             <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Image
                    src={investment.project.imageUrl}
                    alt={investment.project.description}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover w-20 h-20"
                />
                <div className="flex-1">
                    <CardTitle className="font-headline text-xl">{investment.project.cropName}</CardTitle>
                    <CardDescription>by {investment.project.farmer?.name}</CardDescription>
                </div>
             </CardHeader>
             <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center text-sm mb-4">
                    <div className='flex items-center gap-2'>
                        <DollarSign className='h-4 w-4 text-primary' />
                        <div>
                            <p className='text-muted-foreground'>You Invested</p>
                            <p className='font-bold'>${investment.amount.toLocaleString()}</p>
                        </div>
                    </div>
                     <div className='flex items-center gap-2 text-right'>
                        <Sprout className='h-4 w-4 text-primary' />
                        <div>
                            <p className='text-muted-foreground'>Est. Return</p>
                            <p className='font-bold'>${(investment.amount * 1.3).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <Progress value={fundingPercentage} className="h-2" />
                <p className='text-xs text-muted-foreground mt-2 text-right'>{fundingPercentage.toFixed(0)}% Funded</p>
             </CardContent>
             <CardFooter className='bg-muted/50 p-2'>
                <Button asChild variant="ghost" size="sm" className="w-full justify-end">
                    <Link href={`/projects/${investment.projectId}`}>
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
             </CardFooter>
        </Card>
    );
};

export default function ConsumerDashboardPage() {
    // In a real app, fetch investments for the current consumer
    const consumerId = 'consumer1';
    const consumerInvestments = mockData.investments.filter(i => i.consumerId === consumerId);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline">My Investments</h1>
                <p className="text-muted-foreground">Track your portfolio and see your impact grow.</p>
            </div>

            {consumerInvestments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {consumerInvestments.map(investment => (
                        <InvestmentCard key={investment.id} investment={investment} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-dashed border-2 rounded-lg">
                    <h2 className="text-xl font-semibold">You haven&apos;t invested yet.</h2>
                    <p className="text-muted-foreground mt-2">Explore projects and start your investment journey.</p>
                    <Button asChild className="mt-4">
                        <Link href="/projects">
                           Browse Projects
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
