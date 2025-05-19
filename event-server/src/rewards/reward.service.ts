import { Injectable } from '@nestjs/common';
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
        return this.rewardModel.create(createRewardDto);
    }

    async findAll(): Promise<Reward[]> {
        return this.rewardModel.find().exec();
    }

    async findByEvent(eventId: string): Promise<Reward[]> {
        return this.rewardModel.find({ eventId }).exec();
    }
}
