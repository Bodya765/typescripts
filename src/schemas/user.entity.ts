import { Schema, Types, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  role: string;
}

export const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },
  },
  { timestamps: true }
);
