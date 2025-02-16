import { useToast } from '@/components/ui/use-toast';
import { useFlowStore } from '@/lib/store/flowStore';

export function useFlowActions() {
  const { toast } = useToast();
  const { save, deploy } = useFlowStore();
  
  const handleSave = async () => {
    try {
      await save();
      toast({
        title: 'Flow saved successfully',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Failed to save flow',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive'
      });
    }
  };
  
  const handleDeploy = async () => {
    try {
      await deploy();
      toast({
        title: 'Flow deployed successfully',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Failed to deploy flow',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive'
      });
    }
  };
  
  return { handleSave, handleDeploy };
}
