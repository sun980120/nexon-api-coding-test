import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { UserRole } from "../enums/condition-type.enum";

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        type: [String],
        enum: UserRole,
        default: UserRole.USER,
    })
    roles: string[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);