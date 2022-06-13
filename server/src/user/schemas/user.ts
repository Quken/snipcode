import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
    _id?: string;

    @Prop({
        required: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    surname: string;

    @Prop({
        required: true,
    })
    summary: string;

    @Prop()
    age: number;

    @Prop()
    position: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
