import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UpdateUsersDto } from './dtos/update-users.dto';



@Injectable()
export class UsersService {
    constructor(@InjectModel(users.name) private userModel: Model<users>) { }

    async create(users: CreateUsersDto) {
        const createUser = new this.userModel(users);
        return createUser.save();

    }

    async update(users: UpdateUsersDto, id: string) {
        return this.userModel.findByIdAndUpdate(id, users, {
            new: true
        }).exec();

    }

    async findAll() {
        return this.userModel.find().exec();
    }

    async findOne(id: string) {
  
       return this.userModel.findById(id).exec();
    }

    async delete(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
