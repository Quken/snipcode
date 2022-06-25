import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SnippetExtensionsEnum, SnippetLanguagesEnum } from '../enum';

export type SnippetDocument = Snippet & Document;

@Schema()
export class Snippet {
    _id?: string;

    @Prop({
        required: true,
        type: String,
    })
    createdAt: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    createdByUserId: mongoose.Schema.Types.ObjectId;

    @Prop({
        required: true,
        type: String,
    })
    name: string;

    @Prop({
        type: String,
    })
    modifiedAt: string;

    @Prop({
        type: String,
        required: true,
    })
    srcRaw: string;

    @Prop({
        enum: SnippetLanguagesEnum,
        required: true,
    })
    language: SnippetLanguagesEnum;

    @Prop({
        enum: SnippetExtensionsEnum,
        required: true,
    })
    extension: SnippetExtensionsEnum;

    @Prop([String])
    likedByUserIds: string[];
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);
