import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

@Schema()
export class UserActionLog {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true, enum: ['ATTENDANCE', 'INVITE', 'QUEST_COMPLETE'] })
    actionType: string;

    @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
    metadata: any;

    @Prop({ type: Date, default: Date.now, index: true })
    timestamp: Date;
}

export type UserActionLogDocument = UserActionLog & Document;
export const UserActionLogSchema = SchemaFactory.createForClass(UserActionLog);