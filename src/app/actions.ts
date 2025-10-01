'use server';

import {
  simulateFundDistribution,
  type SimulateFundDistributionInput,
  type SimulateFundDistributionOutput,
} from '@/ai/flows/simulate-fund-distribution';
import { z } from 'zod';
import { mockData } from '@/lib/mock-data';

const SimulationSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required.'),
  totalProfit: z.coerce.number().positive('Total profit must be a positive number.'),
});

export async function runSimulation(
  formData: FormData
): Promise<{ success: boolean; data: SimulateFundDistributionOutput | null; error: string | null }> {

  const validatedFields = SimulationSchema.safeParse({
    projectId: formData.get('projectId'),
    totalProfit: formData.get('totalProfit'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      data: null,
      error: validatedFields.error.flatten().fieldErrors.totalProfit?.[0] || 'Invalid input.',
    };
  }

  const { projectId, totalProfit } = validatedFields.data;
  
  const projectExists = mockData.projects.some(p => p.id === projectId);
  if (!projectExists) {
      return { success: false, data: null, error: `Project with ID "${projectId}" not found.` };
  }

  try {
    const result = await simulateFundDistribution({ projectId, totalProfit });
    return { success: true, data: result, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return { success: false, data: null, error };
  }
}
