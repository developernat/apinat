import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { concat } from 'rxjs';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb+srv://'
      + process.env.MONGO_USER
      + ':'
      + process.env.MONGO_PASSWORD
      + '@'
      + process.env.MONGO_CLUSTER
      + '/'
      + process.env.MONGO_DATABASE
      + '?retryWrites=true&w=majority'
    ),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
