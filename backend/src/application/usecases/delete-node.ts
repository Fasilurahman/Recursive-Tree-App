import { injectable, inject } from 'inversify';
import { INodeRepository } from '../../domain/interfaces/node-repository';
import { TYPES } from '../../infrastructure/config/types';

@injectable()
export class DeleteNodeUseCase {
  constructor(@inject(TYPES.INodeRepository) private nodeRepository: INodeRepository) {}

  async execute(id: string): Promise<void> {
    await this.nodeRepository.delete(id);
  }
}