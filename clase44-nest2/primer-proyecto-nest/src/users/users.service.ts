import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model <UserDocument>){}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto) 
  }

  async findAll() {
    return await this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}


// mvc -> modelo o persistencia (hacen la persistencia de dato -> Dao)