// events/events.schemas.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ConditionType } from "../enums/condition-type.enum";

@Schema()
export class Event {
    @Prop({ required: true })
    name: string;

    @Prop({
        required: true,
        enum: ConditionType
    })
    conditionType: ConditionType;

    @Prop({ required: true })
    conditionValue: number; // 예: "7(일)", "3(명)" 등

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: Boolean, default: false })
    autoApprove: boolean; // 자동 승인 여부 (기본값: false)
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
