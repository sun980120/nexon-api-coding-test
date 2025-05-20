import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RequestStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

@Schema({ timestamps: true })
export class RewardRequest {
    @Prop({ required: true, index: true })
    userId: string;

    @Prop({ required: true, index: true })
    eventId: string;

    @Prop({
        required: true,
        enum: RequestStatus,
        default: RequestStatus.PENDING,
    })
    status: string;

    @Prop()
    reason?: string; // 거부 사유 or 승인 메모
}

export type RewardRequestDocument = RewardRequest & Document;
export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
