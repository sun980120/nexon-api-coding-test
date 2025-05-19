import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Reward {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Event', required: true })
    eventId: string;

    @Prop({ required: true })
    type: string; // 포인트, 아이템, 쿠폰 등

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    quantity: number;
}

export type RewardDocument = Reward & Document;
export const RewardSchema = SchemaFactory.createForClass(Reward);
