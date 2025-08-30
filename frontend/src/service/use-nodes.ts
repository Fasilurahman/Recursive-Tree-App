import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Node } from '../types';
import { ApiService } from './api-service';

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const apiService = new ApiService();

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const flatNodes = await apiService.getNodes();
        const tree = buildTree(flatNodes);
        setNodes(tree);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message);
        setLoading(false);
      }
    };
    fetchNodes();
  }, []);

  const buildTree = (flatNodes: Node[]): Node[] => {
    const map: { [key: string]: Node } = {};
    flatNodes.forEach(node => {
      // Preserve existing expansion state if node already exists
      const existingNode = findNodeById(nodes, node.id);
      map[node.id] = { 
        ...node, 
        children: [],
        isExpanded: existingNode?.isExpanded || false
      };
    });
    flatNodes.forEach(node => {
      if (node.parentId && map[node.parentId]) {
        map[node.parentId].children!.push(map[node.id]);
      }
    });
    return flatNodes.filter(node => !node.parentId).map(node => map[node.id]);
  };

  // Helper function to find a node by ID in the tree
  const findNodeById = (nodeList: Node[], targetId: string): Node | null => {
    for (const node of nodeList) {
      if (node.id === targetId) {
        return node;
      }
      if (node.children) {
        const found = findNodeById(node.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const addNode = async (parentId: string | null, name: string) => {
    try {
      const newNode = await apiService.createNode(name, parentId);
      console.log(newNode,'newNode');
      const flatNodes = await apiService.getNodes();
      setNodes(buildTree(flatNodes));
      toast.success('Node added successfully');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const updateNode = async (id: string, name: string | undefined, parentId: string | null) => {
    try {
      await apiService.updateNode(id, name, parentId);
      const flatNodes = await apiService.getNodes();
      setNodes(buildTree(flatNodes));
      toast.success('Node updated successfully');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const deleteNode = async (id: string) => {
    try {
      await apiService.deleteNode(id);
      const flatNodes = await apiService.getNodes();
      setNodes(buildTree(flatNodes));
      toast.success('Node deleted successfully');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const toggleExpanded = (nodeId: string) => {
    const toggleNodeExpansion = (nodeList: Node[]): Node[] => {
      return nodeList.map(node => {
        if (node.id === nodeId) {
          return { ...node, isExpanded: !node.isExpanded };
        }
        if (node.children && node.children.length > 0) {
          return { ...node, children: toggleNodeExpansion(node.children) };
        }
        return node;
      });
    };
    
    setNodes(prev => toggleNodeExpansion(prev));
  };

  

  return { nodes, loading, addNode, updateNode, deleteNode, toggleExpanded };
}