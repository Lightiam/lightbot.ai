export interface DecisionNode {
  id: string;
  message: string;
  children: DecisionNode[];
  action?: () => void;
}
