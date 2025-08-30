import axios from 'axios';
import type { Node } from '../types';

export class ApiService {
  private baseUrl = 'http://localhost:5000/api/nodes';

  async getNodes(): Promise<Node[]> {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data.nodes.map((node: any) => ({
        id: node.id,
        name: node.name,
        parentId: node.parentId,
        children: [],
      }));
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch nodes');
    }
  }

  async createNode(name: string, parentId: string | null): Promise<Node> {
    try {
      const response = await axios.post(this.baseUrl, { name, parentId });
      return {
        id: response.data.node.id,
        name: response.data.node.name,
        parentId: response.data.node.parentId,
        children: [],
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create node');
    }
  }

  async updateNode(id: string, name: string | undefined, parentId: string | null): Promise<Node> {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, { name, parentId });
      return {
        id: response.data.node.id,
        name: response.data.node.name,
        parentId: response.data.node.parentId,
        children: [],
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update node');
    }
  }

  async deleteNode(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete node');
    }
  }
}