import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CreateNodeUseCase } from '../../application/usecases/create-node';
import { DeleteNodeUseCase } from '../../application/usecases/delete-node';
import { GetNodesUseCase } from '../../application/usecases/get-nodes';
import { TYPES } from '../../infrastructure/config/types';
import { STATUS_CODES } from '../../infrastructure/constants/errors';
import { UpdateNodeUseCase } from '../../application/usecases/update-node';

@injectable()
export class NodeController {
  constructor(
    @inject(TYPES.CreateNodeUseCase) private createNodeUseCase: CreateNodeUseCase,
    @inject(TYPES.DeleteNodeUseCase) private deleteNodeUseCase: DeleteNodeUseCase,
    @inject(TYPES.GetNodesUseCase) private getNodesUseCase: GetNodesUseCase,
    @inject(TYPES.UpdateNodeUseCase) private updateNodeUseCase: UpdateNodeUseCase
  ) {}

  async getNodes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const nodes = await this.getNodesUseCase.execute();
      res.status(200).json({ success: true, nodes });
    } catch (error) {
      next(error);
    }
  }

  async createNode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, parentId } = req.body;
      console.log(name, parentId);
      const node = await this.createNodeUseCase.execute(name, parentId || null);
      res.status(201).json({ success: true, node });
    } catch (error: any) {
      next(error);
    }
  }


  async updateNode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, parentId } = req.body;
      const node = await this.updateNodeUseCase.execute(id, name, parentId || null);
      res.status(STATUS_CODES.OK).json({ success: true, node });
    } catch (error) {
      next(error);
    }
  }

  async deleteNode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteNodeUseCase.execute(req.params.id);
      res.status(200).json({ success: true, message: 'Node and descendants deleted' });
    } catch (error) {
      next(error);
    }
  }
}