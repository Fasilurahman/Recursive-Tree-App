import { injectable, inject } from 'inversify';
import { Node } from '../../domain/entities/node';
import { INodeRepository } from '../../domain/interfaces/node-repository';
import { AppError } from '../../infrastructure/errors/app-error';
import { ERRORS } from '../../infrastructure/constants/errors';
import { TYPES } from '../../infrastructure/config/types';

@injectable()
export class CreateNodeUseCase {
  constructor(@inject(TYPES.INodeRepository) private nodeRepository: INodeRepository) {}

  async execute(name: string, parentId: string | null): Promise<Node> {
    if (!name.trim()) {
      throw new AppError(ERRORS.INVALID_NAME.message, ERRORS.INVALID_NAME.statusCode, ERRORS.INVALID_NAME.code);
    }
    if (parentId !== null) {
      const parent = await this.nodeRepository.findById(parentId);
      if (!parent) {
        throw new AppError(ERRORS.PARENT_NOT_FOUND.message, ERRORS.PARENT_NOT_FOUND.statusCode, ERRORS.PARENT_NOT_FOUND.code);
      }
    }

    return await this.nodeRepository.create({ name, parentId });
  }
}