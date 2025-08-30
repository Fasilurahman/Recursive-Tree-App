import { injectable, inject } from 'inversify';
import { Node } from '../../domain/entities/node';
import { INodeRepository } from '../../domain/interfaces/node-repository';
import { TYPES } from '../../infrastructure/config/types';

@injectable()
export class GetNodesUseCase {
  constructor(@inject(TYPES.INodeRepository) private nodeRepository: INodeRepository) {}

  async execute(): Promise<Node[]> {
    return await this.nodeRepository.findAll();
  }
}