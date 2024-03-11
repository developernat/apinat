import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Put,
  Param,
  Get,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body(new ValidationPipe()) users: CreateUsersDto) {
    return await this.usersService.create(users);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) users: UpdateUsersDto,
  ) {
    return this.usersService.update(users, id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const queryParams = req.query;

    let search = {};
    Object.keys(queryParams).forEach((clave) => {
      if (queryParams[clave] !== '') {
        search[clave] = queryParams[clave];
      }
    });

    const hasParams = Object.keys(search).length > 0;
    
    if (!hasParams) {
      return this.usersService.findAll();
    } else {
      return this.usersService.findSearch(search);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
