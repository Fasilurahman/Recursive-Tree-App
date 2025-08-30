import { injectable } from "inversify";
import { INodeRepository } from "../../../domain/interfaces/node-repository";
import { Node } from "../../../domain/entities/node";
import { NodeModel } from "../models/node-model";
import { AppError } from "../../errors/app-error";
import { ERRORS } from "../../constants/errors";
import mongoose from "mongoose";

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
    const deleteNodeRecursive = async (nodeId: string): Promise<void> => {
      const node = await NodeModel.findById(nodeId);
      if (!node) {
        throw new AppError(
          ERRORS.NODE_NOT_FOUND.message,
          ERRORS.NODE_NOT_FOUND.statusCode,
          ERRORS.NODE_NOT_FOUND.code
        );
      }
      const children = await NodeModel.find({ parentId: nodeId });
      for (const child of children) {
        await deleteNodeRecursive(child._id.toString());
      }
      await NodeModel.deleteOne({ _id: nodeId });
    };
    await deleteNodeRecursive(id);
  }
}
