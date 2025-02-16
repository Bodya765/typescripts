import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity'; 

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User> 
  ) {}

  async createUser(username: string, password: string, email: string, role: string = 'user'): Promise<User> {
    const createdUser = new this.userModel({ username, password, email, role });
    return createdUser.save(); 
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
