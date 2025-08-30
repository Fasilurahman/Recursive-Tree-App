import { Container, injectable } from 'inversify';
import { INodeRepository } from '../../domain/interfaces/node-repository';
import { NodeRepository } from '../database/repositories/node-repository';
import { CreateNodeUseCase } from '../../application/usecases/create-node';
import { DeleteNodeUseCase } from '../../application/usecases/delete-node';
import { GetNodesUseCase } from '../../application/usecases/get-nodes';
import { NodeController } from '../../presentation/controllers/node-controller';
import { TYPES } from './types';
import { UpdateNodeUseCase } from '../../application/usecases/update-node';


const container = new Container();

// Bind repository
container.bind<INodeRepository>(TYPES.INodeRepository).to(NodeRepository).inSingletonScope();

// Bind use cases
container.bind<CreateNodeUseCase>(TYPES.CreateNodeUseCase).to(CreateNodeUseCase).inSingletonScope();
container.bind<DeleteNodeUseCase>(TYPES.DeleteNodeUseCase).to(DeleteNodeUseCase).inSingletonScope();
container.bind<GetNodesUseCase>(TYPES.GetNodesUseCase).to(GetNodesUseCase).inSingletonScope();
container.bind<UpdateNodeUseCase>(TYPES.UpdateNodeUseCase).to(UpdateNodeUseCase).inSingletonScope();

// Bind controller
container.bind<NodeController>(TYPES.NodeController).to(NodeController).inSingletonScope();

export { container };