import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockData } from '@/lib/mock-data';
import { Check, X } from 'lucide-react';
import SimulationTool from './components/simulation-tool';

export default function AdminDashboardPage() {
    // Mocking pending projects, in reality this would be a DB query
    const pendingProjects = mockData.projects.filter(p => p.status === 'Pending').concat([
        {...mockData.projects[0], status: 'Pending', id: 'proj-pending-1'},
        {...mockData.projects[2], status: 'Pending', id: 'proj-pending-2', cropName: "Organic Carrots"}
    ]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
                <p className="text-muted-foreground">Oversee platform activities and manage projects.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className='font-headline'>Pending Project Approvals</CardTitle>
                    <CardDescription>Review and approve new projects submitted by farmers.</CardDescription>
                </CardHeader>
                <CardContent>
                    {pendingProjects.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Crop Name</TableHead>
                                    <TableHead>Farmer</TableHead>
                                    <TableHead>Funding Goal</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingProjects.map(project => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">{project.cropName}</TableCell>
                                        <TableCell>{project.farmer?.name}</TableCell>
                                        <TableCell>${project.fundingGoal.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No pending projects to review.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <SimulationTool />
            
        </div>
    );
}
