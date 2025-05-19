import { Controller, Get, Post, Query } from '@nestjs/common';
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
    findAll(@Query('eventId') eventId?: string ) {
        return eventId
            ? this.rewardService.findByEvent(eventId)
            : this.rewardService.findAll();
    }

}
