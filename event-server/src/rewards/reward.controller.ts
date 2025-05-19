import { Controller, Get, Post } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RequestCreateRewardDto } from './dto/request.create-reward.dto';

@Controller("rewards")
export class RewardController {
    constructor(private readonly rewardService: RewardService) {}

    @Post("create-reward")
    create(dto: RequestCreateRewardDto) {
        return this.rewardService.create(dto);
    }

    @Get("get-rewards")
    findAll(data: { eventId?: string }) {
        return data.eventId
            ? this.rewardService.findByEvent(data.eventId)
            : this.rewardService.findAll();
    }
}
