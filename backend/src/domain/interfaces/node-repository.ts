import { Node } from '../entities/node';

export interface INodeRepository {
  create(node: Partial<Node>): Promise<Node>;
  findAll(): Promise<Node[]>;
  findById(id: string): Promise<Node | null>;
  update(id: string, updates: Partial<Node>): Promise<Node>;
  delete(id: string): Promise<void>;
}   