export type EditorSettingsDocument = EditorSettings & Document;

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EditorThemes, EditorFontFamilies } from '../enums';

@Schema()
export class EditorSettings {
    _id?: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({
        required: true,
        enum: EditorThemes,
        // type: EditorThemes,
    })
    theme: EditorThemes;

    @Prop({
        required: true,
        type: Number,
    })
    fontSize: number;

    @Prop({
        required: true,
        enum: EditorFontFamilies,
        // type: EditorFontFamilies,
    })
    fontFamily: EditorFontFamilies;
}

export const EditorSettingsSchema =
    SchemaFactory.createForClass(EditorSettings);
