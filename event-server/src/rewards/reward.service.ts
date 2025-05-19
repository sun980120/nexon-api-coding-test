import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { RequestCreateRewardDto } from './dto/request.create-reward.dto';

@Injectable()
export class RewardService {
    constructor(
        @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    ) {}

    async create(createRewardDto: RequestCreateRewardDto): Promise<Reward> {
        return await this.rewardModel.create(createRewardDto);
    }

    async findAll(): Promise<Reward[]> {
        return await this.rewardModel.find().exec();
    }

    async findByEvent(eventId: string): Promise<RewardDocument[]> {
        const rewards = await this.rewardModel.find({ eventId }).exec();
        if (rewards.length === 0) {
            throw new NotFoundException("해당 이벤트의 보상을 찾을 수 없습니다.");
        }
        return rewards;
    }
}
