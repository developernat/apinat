import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';



@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://natsudev:NFJvqQExLAaew9QG@cluster0.nxinxbp.mongodb.net/natdevDB?retryWrites=true&w=majority&appName=cluster0'), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
