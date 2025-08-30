import { injectable, inject } from 'inversify';
import { Node } from '../../domain/entities/node';
import { INodeRepository } from '../../domain/interfaces/node-repository';
import { AppError } from '../../infrastructure/errors/app-error';
import { ERRORS } from '../../infrastructure/constants/errors';
import { TYPES } from '../../infrastructure/config/types';

@injectable()
export class UpdateNodeUseCase {
  constructor(@inject(TYPES.INodeRepository) private nodeRepository: INodeRepository) {}

  async execute(id: string, name: string | undefined, parentId: string | null): Promise<Node> {
    if (name && !name.trim()) {
      throw new AppError(ERRORS.INVALID_NAME.message, ERRORS.INVALID_NAME.statusCode, ERRORS.INVALID_NAME.code);
    }
    if (parentId !== null) {
      const parent = await this.nodeRepository.findById(parentId);
      if (!parent) {
        throw new AppError(ERRORS.PARENT_NOT_FOUND.message, ERRORS.PARENT_NOT_FOUND.statusCode, ERRORS.PARENT_NOT_FOUND.code);
      }
      if (parentId === id) {
        throw new AppError('Node cannot be its own parent', ERRORS.SELF_REFERENCE_ERROR.statusCode, 'SELF_REFERENCE_ERROR');
      }
    }
    const updates: Partial<Node> = {};
    if (name) updates.name = name;
    if (parentId !== undefined) updates.parentId = parentId;
    return await this.nodeRepository.update(id, updates);
  }
}