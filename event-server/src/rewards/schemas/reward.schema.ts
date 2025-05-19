import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RewardType {
    POINT = 'POINT',
    ITEM = 'ITEM',
    COUPON = 'COUPON'
}

@Schema()
export class Reward {
    @Prop({ required: true })
    name: string;

    @Prop({ ref: 'Event', required: true })
    eventId: string;

    @Prop({ required: true , enum: RewardType})
    type: string; // 포인트, 아이템, 쿠폰 등

    @Prop({ required: true })
    quantity: number;
}

export type RewardDocument = Reward & Document;
export const RewardSchema = SchemaFactory.createForClass(Reward);
