'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { mockData } from '@/lib/mock-data';
import { BarChart, Loader2, User, Users } from 'lucide-react';
import { useState, useTransition } from 'react';
import { runSimulation } from '@/app/actions';
import type { SimulateFundDistributionOutput } from '@/ai/flows/simulate-fund-distribution';

export default function SimulationTool() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<SimulateFundDistributionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (formData: FormData) => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      const response = await runSimulation(formData);
      if (response.success) {
        setResult(response.data);
        toast({
            title: 'Simulation Complete',
            description: 'Fund distribution calculated successfully.',
        })
      } else {
        setError(response.error);
        toast({
            variant: 'destructive',
            title: 'Simulation Failed',
            description: response.error,
        })
      }
    });
  };

  return (
    <Card>
      <form action={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <BarChart />
            Fund Distribution Simulation
          </CardTitle>
          <CardDescription>
            Use this AI tool to simulate profit distribution for a completed project.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="projectId">Project</Label>
             <Select name="projectId" required>
                <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                    {mockData.projects.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.cropName} ({p.id})</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalProfit">Total Profit ($)</Label>
            <Input name="totalProfit" type="number" placeholder="e.g. 10000" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Run Simulation
          </Button>
        </CardFooter>
      </form>
      
      {result && (
        <CardContent>
            <h3 className='text-lg font-semibold font-headline mb-4'>Simulation Results</h3>
            <div className='grid md:grid-cols-2 gap-4 mb-6'>
                <Card className='bg-green-50 dark:bg-green-900/20'>
                    <CardHeader className='flex-row items-center gap-4 space-y-0'>
                        <User className='h-8 w-8 text-green-600'/>
                        <div>
                            <CardDescription>Farmer Payout</CardDescription>
                            <CardTitle className='text-2xl text-green-700 dark:text-green-500'>${result.farmerPayout.toFixed(2)}</CardTitle>
                        </div>
                    </CardHeader>
                </Card>
                 <Card className='bg-blue-50 dark:bg-blue-900/20'>
                    <CardHeader className='flex-row items-center gap-4 space-y-0'>
                        <Users className='h-8 w-8 text-blue-600'/>
                        <div>
                            <CardDescription>Total Consumer Payout</CardDescription>
                            <CardTitle className='text-2xl text-blue-700 dark:text-blue-500'>${result.consumerPayouts.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}</CardTitle>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <p className='font-semibold mb-2'>Consumer Payout Breakdown:</p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Consumer ID</TableHead>
                        <TableHead className='text-right'>Payout Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {result.consumerPayouts.map(payout => (
                        <TableRow key={payout.consumerId}>
                            <TableCell>{payout.consumerId}</TableCell>
                            <TableCell className='text-right font-medium'>${payout.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      )}
    </Card>
  );
}
