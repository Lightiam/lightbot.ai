import { http, HttpResponse } from 'msw';
import type { FlowDefinition, FlowResponse } from '../types';
import { DEFAULT_LEAD_FLOW } from '../components/FlowBuilder/types';

export const handlers = [
  http.get('/api/flows/:id/status', async () => {
    const response = {
      status: 'deployed',
      message: 'Flow deployed successfully',
      deployedAt: new Date().toISOString(),
      deploymentUrl: 'https://example.com/flows/test-flow-1'
    };
    await new Promise(resolve => setTimeout(resolve, 500));
    return HttpResponse.json(response);
  }),
  http.get('/api/flows/:id', async ({ params }) => {
    const response: FlowResponse = {
      id: params.id as string,
      name: 'Test Flow',
      description: 'Testing flow persistence',
      nodes: DEFAULT_LEAD_FLOW,
      edges: [],
      version: 1,
      status: 'deployed',
      updatedAt: new Date().toISOString()
    };
    await new Promise(resolve => setTimeout(resolve, 500));
    return HttpResponse.json(response);
  }),

  http.post('/api/flows', async ({ request }) => {
    const flow = await request.json() as FlowDefinition;
    const response: FlowResponse = {
      ...flow,
      id: 'test-flow-1',
      version: 1,
      updatedAt: new Date().toISOString(),
      status: 'draft'
    };
    await new Promise(resolve => setTimeout(resolve, 1000));
    return HttpResponse.json(response);
  }),

  http.post('/api/flows/:id/deploy', async ({ params }) => {
    const { id } = params;
    const response: FlowResponse = {
      id: id as string,
      name: 'Test Flow',
      description: 'Testing deploy functionality',
      nodes: [],
      edges: [],
      version: 2,
      status: 'deployed',
      updatedAt: new Date().toISOString()
    };
    await new Promise(resolve => setTimeout(resolve, 1000));
    return HttpResponse.json(response);
  })
];
