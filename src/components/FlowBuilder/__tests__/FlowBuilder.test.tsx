import { render, screen, fireEvent, act } from '@testing-library/react';
import { ChatBuilder } from '../ChatBuilder';
import { ThemeProvider } from '@/components/providers/theme-provider';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { useFlowStore } from '@/lib/store/flowStore';
import { useFlowActions } from '@/hooks/use-flow-actions';
import type { FlowNode, NodeData } from '../types';
import { NodeType } from '../types';

// Mock modules
vi.mock('@/lib/store/flowStore', () => ({
  useFlowStore: vi.fn()
}));

vi.mock('@/hooks/use-flow-actions', () => ({
  useFlowActions: vi.fn()
}));

describe('FlowBuilder', () => {
  const mockStore = {
    nodes: [] as FlowNode[],
    edges: [],
    selectedNode: null as FlowNode | null,
    isDeploying: false,
    isSaving: false,
    status: 'draft',
    setNodes: vi.fn((nodes) => {
      mockStore.nodes = typeof nodes === 'function' ? nodes(mockStore.nodes) : nodes;
    }),
    setEdges: vi.fn(),
    setSelectedNode: vi.fn((node) => {
      mockStore.selectedNode = node;
    }),
    addNode: vi.fn((node: FlowNode) => {
      mockStore.nodes = [...mockStore.nodes, node];
    }),
    updateNode: vi.fn((id: string, data: Partial<NodeData>) => {
      const node = mockStore.nodes.find(n => n.id === id);
      if (node) {
        Object.assign(node.data, data);
      }
    }),
    removeNode: vi.fn(),
    addEdge: vi.fn(),
    removeEdge: vi.fn(),
    setName: vi.fn(),
    setDescription: vi.fn(),
    save: vi.fn(),
    deploy: vi.fn()
  };

  const mockActions = {
    handleSave: vi.fn(),
    handleDeploy: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFlowStore).mockReturnValue(mockStore);
    vi.mocked(useFlowActions).mockReturnValue(mockActions);
  });

  it('renders node toolbar', () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <ChatBuilder />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Available Nodes')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('User Input')).toBeInTheDocument();
    expect(screen.getByText('Condition')).toBeInTheDocument();
  });

  it('creates new nodes', async () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <ChatBuilder />
      </ThemeProvider>
    );
    
    const messageNode = screen.getByTestId('node-message');
    
    // Mock dataTransfer
    const dataTransfer = {
      setData: vi.fn(),
      getData: vi.fn().mockReturnValue('MESSAGE'),
      effectAllowed: 'move',
      dropEffect: 'move',
      types: ['application/reactflow'],
      items: [],
      files: [],
      clearData: vi.fn()
    };

    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0);
      return 0;
    });

    await act(async () => {
      fireEvent.dragStart(messageNode, { dataTransfer });
    });

    expect(mockStore.addNode).toHaveBeenCalledWith(
      expect.objectContaining({
        type: NodeType.MESSAGE,
        data: expect.objectContaining({
          label: 'Message',
          message: ''
        }),
        position: expect.objectContaining({ x: 100, y: 100 })
      })
    );
    expect(mockStore.setSelectedNode).toHaveBeenCalledWith(
      expect.objectContaining({
        type: NodeType.MESSAGE,
        position: expect.objectContaining({ x: 100, y: 100 })
      })
    );
  });

  it('updates node properties', async () => {
    const selectedNode: FlowNode = {
      id: 'node-1',
      type: NodeType.MESSAGE,
      position: { x: 100, y: 100 },
      data: { label: 'Message', message: '' }
    };

    mockStore.selectedNode = selectedNode;
    mockStore.nodes = [selectedNode];

    render(
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <ChatBuilder />
      </ThemeProvider>
    );

    // Wait for PropertiesPanel to render and find the message input
    const messageInput = await screen.findByTestId('message-input', {}, { timeout: 2000 }) as HTMLTextAreaElement;
    expect(messageInput).toBeInTheDocument();
    expect(messageInput).toHaveValue('');

    await act(async () => {
      fireEvent.change(messageInput, { target: { value: 'Hello, world!' } });
    });

    expect(mockStore.updateNode).toHaveBeenCalledWith(selectedNode.id, {
      label: 'Message',
      message: 'Hello, world!'
    });
  });

  it('saves flow changes', async () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <ChatBuilder />
      </ThemeProvider>
    );
    
    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);
    
    expect(mockActions.handleSave).toHaveBeenCalled();
  });

  it('deploys flow', async () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <ChatBuilder />
      </ThemeProvider>
    );
    
    const deployButton = screen.getByTestId('deploy-button');
    fireEvent.click(deployButton);
    
    expect(mockActions.handleDeploy).toHaveBeenCalled();
  });
});
