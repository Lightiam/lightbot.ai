import { Node, Edge } from 'reactflow';

export interface FlowDefinition {
  id?: string;
  name: string;
  description?: string;
  nodes: Node[];
  edges: Edge[];
  version?: number;
  status?: 'draft' | 'deployed' | 'failed';
  updatedAt?: string;
}

export interface FlowResponse extends FlowDefinition {
  id: string;
  version: number;
  updatedAt: string;
}

export type FlowStatus = 'draft' | 'deployed' | 'failed';

export interface DeploymentStatus {
  status: FlowStatus;
  message?: string;
  deployedAt?: string;
  deploymentUrl?: string;
}
