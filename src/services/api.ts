import axios from 'axios';
import { FlowDefinition, FlowResponse, DeploymentStatus } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const saveFlow = async (flow: FlowDefinition): Promise<FlowResponse> => {
  const response = await api.post<FlowResponse>('/flows', flow);
  return response.data;
};

export const deployFlow = async (flowId: string): Promise<FlowResponse> => {
  const response = await api.post<FlowResponse>(`/flows/${flowId}/deploy`);
  return response.data;
};

export const getFlowStatus = async (flowId: string): Promise<DeploymentStatus> => {
  const response = await api.get<DeploymentStatus>(`/flows/${flowId}/status`);
  return response.data;
};

export const getFlowById = async (flowId: string): Promise<FlowResponse> => {
  const response = await api.get<FlowResponse>(`/flows/${flowId}`);
  return response.data;
};

export const updateFlow = async (flowId: string, flow: Partial<FlowDefinition>): Promise<FlowResponse> => {
  const response = await api.patch<FlowResponse>(`/flows/${flowId}`, flow);
  return response.data;
};

export const listFlows = async (): Promise<FlowResponse[]> => {
  const response = await api.get<FlowResponse[]>('/flows');
  return response.data;
};
