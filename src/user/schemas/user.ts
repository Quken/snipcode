import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
    _id?: string;

    @Prop({
        required: true,
        type: String,
    })
    email: string;

    @Prop({
        required: true,
        type: String,
    })
    password: string;

    @Prop({
        required: true,
        type: String,
    })
    name: string;

    @Prop({
        required: true,
        type: String,
    })
    surname: string;

    @Prop({
        required: true,
        type: String,
    })
    summary: string;

    @Prop({
        type: Number,
    })
    age: number;

    @Prop({
        type: String,
    })
    position: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
