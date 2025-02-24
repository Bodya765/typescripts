import { Schema, Types, Document } from 'mongoose';

export interface Ad extends Document {
  title: string;
  description: string;
  price: number;
  date: Date;
  user: Types.ObjectId;
}

export const AdSchema = new Schema<Ad>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
}, { timestamps: true });

AdSchema.index({ price: 1 });
AdSchema.index({ date: 1 });

export default AdSchema;
