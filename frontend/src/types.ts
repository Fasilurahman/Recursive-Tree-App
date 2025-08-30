export interface Node {
  id: string;
  name: string;
  parentId: string | null;
  children?: Node[];
  isExpanded?: boolean;
}

export type TreeNode = Node;

export interface TreeOperations {
  addNode: (parentId: string | null, name: string) => void;
  deleteNode: (nodeId: string) => void;
  updateNode: (nodeId: string, name: string | undefined, parentId: string | null) => void;
  toggleExpanded: (nodeId: string) => void;
}

export type ThemeMode = 'light' | 'dark' | 'system';