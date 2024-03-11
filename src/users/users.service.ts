import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { users } from './schemas/users.schema';
import { Model } from 'mongoose';

import { CreateUsersDto } from './dtos/create-users.dto';
import { UpdateUsersDto } from './dtos/update-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(users.name) private userModel: Model<users>) {}

  async create(users: CreateUsersDto) {
    const today = new Date();
    const birthDateObj = new Date(users.birthdate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    users.age = age;

    const createUser = new this.userModel(users);

    return createUser.save();
  }

  async update(users: UpdateUsersDto, id: string) {
    const today = new Date();

    const birthDateObj = new Date(users.birthdate);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    users.age = age;

    users.updatedAt = new Date();
    return this.userModel
      .findByIdAndUpdate(id, users, {
        new: true,
      })
      .exec();
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
  async findSearch(queryParams: any) {
    const find = {
      name: queryParams.NameSearch,
      gender: queryParams.GenderSearch,
      status: queryParams.StatusSearch,
      createdAt: undefined,
      updatedAt: undefined,
      birthdate: undefined,
    };
    let search = {};

    if (queryParams.createdAtSearchFrom || queryParams.createdAtSearchTo) {
      find.createdAt = {
        $gte: new Date(queryParams.createdAtSearchFrom),
        $lte: queryParams.createdAtSearchTo
          ? new Date(queryParams.createdAtSearchTo)
          : new Date(),
      };
    }

    if (queryParams.updatedAtSearchFrom || queryParams.updatedAtSearchTo) {
      find.updatedAt = {
        $gte: new Date(queryParams.updatedAtSearchFrom),
        $lte: queryParams.updatedAtSearchTo
          ? new Date(queryParams.updatedAtSearchTo)
          : new Date(),
      };
    }

    if (queryParams.birthdateSearchFrom || queryParams.birthdateSearchTo) {
      find.birthdate = {
        $gte: new Date(queryParams.birthdateSearchFrom),
        $lte: queryParams.birthdateSearchTo
          ? new Date(queryParams.birthdateSearchTo)
          : new Date(),
      };
    }

    Object.keys(find).forEach((clave) => {
      if (find[clave] !== undefined) {
        search[clave] = find[clave];
      }
    });
    console.log(search);
    return this.userModel

      .find(search)

      .exec();
  }
}
