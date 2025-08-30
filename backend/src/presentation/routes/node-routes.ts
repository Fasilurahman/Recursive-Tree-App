import { Router } from 'express';
import { container } from '../../infrastructure/config/container';
import { NodeController } from '../controllers/node-controller';
import { TYPES } from '../../infrastructure/config/types';


const router = Router();
const nodeController = container.get<NodeController>(TYPES.NodeController);

router.get('/', nodeController.getNodes.bind(nodeController));
router.post('/', nodeController.createNode.bind(nodeController));
router.put('/:id', nodeController.updateNode.bind(nodeController));
router.delete('/:id', nodeController.deleteNode.bind(nodeController));

export default router;