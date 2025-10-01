'use server';

/**
 * @fileOverview An AI agent to simulate fund distribution between farmers and consumers.
 *
 * - simulateFundDistribution - Simulates fund distribution based on profit split.
 * - SimulateFundDistributionInput - The input type for the simulateFundDistribution function.
 * - SimulateFundDistributionOutput - The return type for the simulateFundDistribution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateFundDistributionInputSchema = z.object({
  projectId: z.string().describe('The ID of the project to simulate fund distribution for.'),
  totalProfit: z.number().describe('The total profit to be distributed.'),
});
export type SimulateFundDistributionInput = z.infer<typeof SimulateFundDistributionInputSchema>;

const SimulateFundDistributionOutputSchema = z.object({
  farmerPayout: z.number().describe('The amount the farmer will receive.'),
  consumerPayouts: z
    .array(z.object({consumerId: z.string(), amount: z.number()}))
    .describe('The amounts each consumer will receive.'),
});
export type SimulateFundDistributionOutput = z.infer<typeof SimulateFundDistributionOutputSchema>;

export async function simulateFundDistribution(
  input: SimulateFundDistributionInput
): Promise<SimulateFundDistributionOutput> {
  return simulateFundDistributionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateFundDistributionPrompt',
  input: {schema: SimulateFundDistributionInputSchema},
  output: {schema: SimulateFundDistributionOutputSchema},
  prompt: `You are an AI assistant helping to simulate the distribution of funds for an AgriCrowd project.

  Given the project ID: {{{projectId}}} and the total profit: {{{totalProfit}}},
  calculate the farmer's payout and the individual consumer payouts based on the profit split
  defined in the project. The project details, including the profitSplit, are stored in Firestore.

  Return the results in the following JSON format:
  {
    "farmerPayout": number,
    "consumerPayouts": [{
      "consumerId": string,
      "amount": number
    }]
  }`,
});

const simulateFundDistributionFlow = ai.defineFlow(
  {
    name: 'simulateFundDistributionFlow',
    inputSchema: SimulateFundDistributionInputSchema,
    outputSchema: SimulateFundDistributionOutputSchema,
  },
  async input => {
    // TODO: Fetch project details from Firestore to get the profitSplit and consumer investments.
    // For now, using mock data.
    const profitSplit = 0.3; // Example: 30% for the farmer, 70% for consumers
    const farmerPayout = input.totalProfit * profitSplit;

    // Mock consumer investment data.
    const consumerInvestments = [
      {consumerId: 'consumer1', investment: 500},
      {consumerId: 'consumer2', investment: 300},
      {consumerId: 'consumer3', investment: 200},
    ];

    const totalInvestment = consumerInvestments.reduce((sum, investment) => sum + investment.investment, 0);
    const consumerPayouts = consumerInvestments.map(investment => {
      const proportion = investment.investment / totalInvestment;
      return {consumerId: investment.consumerId, amount: (input.totalProfit * (1 - profitSplit)) * proportion};
    });

    // const {output} = await prompt(input);
    // return output!;
    return {
      farmerPayout: farmerPayout,
      consumerPayouts: consumerPayouts,
    };
  }
);
