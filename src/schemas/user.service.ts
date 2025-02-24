import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserModel } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.modelName) private userModel: Model<UserDocument> 
  ) {}

  async createUser(username: string, password: string, email: string, role: string = 'user'): Promise<UserDocument> {
    const createdUser = new this.userModel({ username, password, email, role });
    return createdUser.save();
  }

  async findUserByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
