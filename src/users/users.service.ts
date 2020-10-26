import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashSync, genSaltSync } from 'bcrypt';

import { User, UserDocument } from './users.schema';
import { CreateUserForm } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}


  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async findOne(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async create(userPayload: CreateUserForm): Promise<UserDocument>{
    const user = await this.findByEmail(userPayload.email);

    if (user) {
      throw new Error('User Already exist')
    }

    const encryptedPassword = hashSync(
      userPayload.password,
      genSaltSync(8),
    );

    const newUser = new this.userModel({
      ...userPayload,
      password: encryptedPassword
    });

    return newUser.save();
  }
}
