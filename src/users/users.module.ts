import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { usersSchema, users } from './schemas/users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: users.name, schema: usersSchema }])
    ],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule { }
