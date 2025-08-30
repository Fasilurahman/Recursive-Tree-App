import mongoose, { Schema } from 'mongoose';
import { Node } from '../../../domain/entities/node';


const nodeSchema: Schema = new Schema<Node>({
  name: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'Node', default: null },
}, { timestamps: true });

 
export const NodeModel = mongoose.model<Node>('Node', nodeSchema);