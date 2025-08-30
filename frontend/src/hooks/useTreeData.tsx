import { useNodes } from '../service/use-nodes';
import type { TreeOperations } from '../types';

export const useTreeData = () => {
  const { nodes, loading, addNode, updateNode, deleteNode, toggleExpanded } = useNodes();

  const operations: TreeOperations = {
    addNode,
    deleteNode,
    updateNode: (nodeId: string, name: string | undefined) => {
      // Find the node to get its current parentId
      const findNodeParent = (nodes: any[], targetId: string): string | null => {
        for (const node of nodes) {
          if (node.children?.some((child: any) => child.id === targetId)) {
            return node.id;
          }
          if (node.children) {
            const found = findNodeParent(node.children, targetId);
            if (found !== null) return found;
          }
        }
        return null;
      };

      const parentId = findNodeParent(nodes, nodeId);
      updateNode(nodeId, name, parentId);
    },
    toggleExpanded,
  };

  return { nodes, operations, loading };
};