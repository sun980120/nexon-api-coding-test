// events/event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    condition: string; // 예: "7일 연속 출석", "친구 3명 초대" 등

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ default: true })
    isActive: boolean;
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
