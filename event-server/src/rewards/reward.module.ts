// src/rewards/reward.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
    ],
    providers: [RewardService],
    controllers: [RewardController],
    exports: [RewardService],
})
export class RewardsModule {}
