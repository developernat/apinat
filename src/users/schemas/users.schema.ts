import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum status {
    active = 'active',
    inactive = 'inactive'

}
@Schema()
export class users {
    @Prop({
        required: true
    })
    name: string;
    @Prop({
        required: true
    })
    email: string;
    @Prop({
        default: Date.now
    })
    createdAt: Date;
    @Prop({
        default: Date.now
    })
    updatedAt: Date;
    @Prop({
        enum: status.active
    })
    status: status
}
export const usersSchema = SchemaFactory.createForClass(users)

