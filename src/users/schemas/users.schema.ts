import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum status {
  active = 'active',
  inactive = 'inactive',
}
export enum gender {
  male = 'male',
  female = 'female',
}
@Schema()
export class users {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  email: string;
  @Prop({
    default: Date.now,
  })
  createdAt: Date;
  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    enum: status,
    default: status.active,
  })
  status: status;

  @Prop({
    required: true,
  })
  age: number;

  @Prop({
    required: true,
  })
  birthdate: Date;

  @Prop({
    enum: gender,
  })
  gender: string;

  @Prop({
    required: true,
  })
  phone: string;
}
export const usersSchema = SchemaFactory.createForClass(users);
