import { injectable } from "inversify";
import { INodeRepository } from "../../../domain/interfaces/node-repository";
import { Node } from "../../../domain/entities/node";
import { NodeModel } from "../models/node-model";
import { AppError } from "../../errors/app-error";
import { ERRORS } from "../../constants/errors";
import mongoose, { ClientSession } from "mongoose";

@injectable()
export class NodeRepository implements INodeRepository {
  async create(node: Partial<Node>): Promise<Node> {
    const createdNode = await NodeModel.create(node);
    return {
      id: createdNode._id.toString(),
      name: createdNode.name,
      parentId: createdNode.parentId ? createdNode.parentId.toString() : null,
    };
  }

  async findAll(): Promise<Node[]> {
    const nodes = await NodeModel.find();
    return nodes.map((node) => ({
      id: node._id.toString(),
      name: node.name,
      parentId: node.parentId ? node.parentId.toString() : null,
    }));
  }

  async findById(id: string): Promise<Node | null> {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        ERRORS.INVALID_ID.message,
        ERRORS.INVALID_ID.statusCode,
        ERRORS.INVALID_ID.code
      );
    }
    const node = await NodeModel.findById(id);
    if (!node) {
      return null;
    }
    return {
      id: node._id.toString(),
      name: node.name,
      parentId: node.parentId ? node.parentId.toString() : null,
    };
  }

  async update(id: string, updates: Partial<Node>): Promise<Node> {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        ERRORS.INVALID_ID.message,
        ERRORS.INVALID_ID.statusCode,
        ERRORS.INVALID_ID.code
      );
    }
    const node = await NodeModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!node) {
      throw new AppError(
        ERRORS.NODE_NOT_FOUND.message,
        ERRORS.NODE_NOT_FOUND.statusCode,
        ERRORS.NODE_NOT_FOUND.code
      );
    }
    return {
      id: node._id.toString(),
      name: node.name,
      parentId: node.parentId ? node.parentId.toString() : null,
    };
  }

  async delete(id: string): Promise<void> {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        ERRORS.INVALID_ID.message,
        ERRORS.INVALID_ID.statusCode,
        ERRORS.INVALID_ID.code
      );
    }

    const session: ClientSession = await NodeModel.startSession();
    session.startTransaction();

    try {
      const node = await NodeModel.findById(id).session(session);
      if (!node) {
        throw new AppError(
          ERRORS.NODE_NOT_FOUND.message,
          ERRORS.NODE_NOT_FOUND.statusCode,
          ERRORS.NODE_NOT_FOUND.code
        );
      }

      const nodeIdsToDelete = await this.getDescendantIds(id, session);

      await NodeModel.deleteMany({ _id: { $in: nodeIdsToDelete } }).session(session);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error; 
    } finally {
      session.endSession();
    }
  }

  private async getDescendantIds(nodeId: string, session: ClientSession): Promise<string[]> {
    const descendantIds: string[] = [nodeId];
    const queue: string[] = [nodeId];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (visited.has(currentId)) continue;
      visited.add(currentId);

      const children = await NodeModel.find({ parentId: currentId })
        .select('_id')
        .session(session)
        .lean();

      for (const child of children) {
        const childId = child._id.toString();
        descendantIds.push(childId);
        queue.push(childId);
      }
    }

    return descendantIds;
  }
}