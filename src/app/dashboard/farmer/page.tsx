import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockData } from '@/lib/mock-data';
import { Project } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

const FarmerProjectCard = ({ project }: { project: Project }) => {
    const fundingPercentage = (project.raisedAmount / project.fundingGoal) * 100;
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-start'>
                    <CardTitle className='font-headline'>{project.cropName}</CardTitle>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${project.status === 'Funding' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{project.status}</span>
                </div>
                <CardDescription>Created on {new Date(project.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='space-y-2'>
                    <Progress value={fundingPercentage} />
                    <div className="flex justify-between text-sm">
                        <span className="font-bold text-primary">
                            ${project.raisedAmount.toLocaleString()} raised
                        </span>
                        <span className="text-muted-foreground">
                            Goal: ${project.fundingGoal.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="secondary" className='w-full'>
                    <Link href={`/projects/${project.id}`}>Manage Project</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function FarmerDashboardPage() {
    // In a real app, you'd fetch projects for the currently logged-in farmer.
    const farmerId = 'farmer1';
    const farmerProjects = mockData.projects.filter(p => p.farmerId === farmerId);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline">My Projects</h1>
                    <p className="text-muted-foreground">Manage your funding campaigns and update your investors.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Project
                </Button>
            </div>

            {farmerProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {farmerProjects.map(project => (
                        <FarmerProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-dashed border-2 rounded-lg">
                    <h2 className="text-xl font-semibold">No projects yet!</h2>
                    <p className="text-muted-foreground mt-2">Ready to grow? Start your first funding campaign.</p>
                    <Button className="mt-4">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Project
                    </Button>
                </div>
            )}
        </div>
    );
}
