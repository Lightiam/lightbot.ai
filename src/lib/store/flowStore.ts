import { create } from 'zustand';
import { Edge } from 'reactflow';
import { produce } from 'immer';
import type { FlowStatus, FlowResponse, FlowDefinition } from '@/types';
import type { FlowNode } from '@/components/FlowBuilder/types';
import { saveFlow, deployFlow } from '@/services/api';

interface FlowState {
  id?: string;
  name: string;
  description: string;
  nodes: FlowNode[];
  edges: Edge[];
  selectedNode: FlowNode | null;
  version?: number;
  status: FlowStatus;
  isSaving: boolean;
  isDeploying: boolean;
  addNode: (node: FlowNode) => void;
  updateNode: (id: string, data: Partial<FlowNode['data']>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;
  setNodes: (nodes: FlowNode[] | ((nodes: FlowNode[]) => FlowNode[])) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  setSelectedNode: (node: FlowNode | null) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  save: () => Promise<void>;
  deploy: () => Promise<void>;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  name: '',
  description: '',
  nodes: [],
  edges: [],
  selectedNode: null,
  status: 'draft',
  isSaving: false,
  isDeploying: false,
  
  setNodes: (nodes) => set({ nodes: typeof nodes === 'function' ? nodes(get().nodes) : nodes }),
  setEdges: (edges) => set({ edges: typeof edges === 'function' ? edges(get().edges) : edges }),
  setSelectedNode: (node) => set({ selectedNode: node }),

  addNode: (node: FlowNode) =>
    set(
      produce((state) => {
        state.nodes.push(node);
      })
    ),

  updateNode: (id: string, data: Partial<FlowNode['data']>) =>
    set(
      produce((state) => {
        const node = state.nodes.find((n: FlowNode) => n.id === id);
        if (node) {
          Object.assign(node.data, data);
        }
      })
    ),

  removeNode: (id: string) =>
    set(
      produce((state) => {
        state.nodes = state.nodes.filter((n: FlowNode) => n.id !== id);
        state.edges = state.edges.filter(
          (e: Edge) => e.source !== id && e.target !== id
        );
      })
    ),

  addEdge: (edge: Edge) =>
    set(
      produce((state) => {
        state.edges.push(edge);
      })
    ),

  removeEdge: (id: string) =>
    set(
      produce((state) => {
        state.edges = state.edges.filter((e: Edge) => e.id !== id);
      })
    ),

  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),

  save: async () => {
    const state = get();
    set({ isSaving: true });
    try {
      const flowData: FlowDefinition = {
        id: state.id,
        name: state.name,
        description: state.description,
        nodes: state.nodes.map((n) => ({
          ...n,
          data: { ...n.data }
        })),
        edges: state.edges.map((e: Edge) => ({
          ...e,
          data: { ...e.data }
        })),
        version: state.version,
      };
      const response: FlowResponse = await saveFlow(flowData);
      set({
        id: response.id,
        version: response.version,
        status: 'draft',
        isSaving: false,
      });
    } catch (error) {
      set({ isSaving: false });
      throw error;
    }
  },

  deploy: async () => {
    const { id } = get();
    if (!id) throw new Error('Cannot deploy unsaved flow');
    
    set({ isDeploying: true });
    try {
      const response: FlowResponse = await deployFlow(id);
      set({
        version: response.version,
        status: 'deployed',
        isDeploying: false,
      });
    } catch (error) {
      set({ status: 'failed', isDeploying: false });
      throw error;
    }
  },
}));
