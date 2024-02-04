import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {

  }


  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    console.log(createUserDto, 'createUserDto user service___')
    const createdUser = await new this.userModel(createUserDto).save();
    return createdUser;
  }

  findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  findOne(_id: string): Promise<UserDocument> {
    return this.userModel.findById(_id);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  update(_id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(_id, updateUserDto, { new: true })
      .exec();
  }

  remove(_id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(_id).exec();
  }

}
