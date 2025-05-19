import { Controller, Get, Post, Query } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RequestCreateRewardDto } from './dto/request.create-reward.dto';

@Controller("rewards")
export class RewardController {
    constructor(private readonly rewardService: RewardService) {}

    @Post("create-reward")
    create(@Body() dto: RequestCreateRewardDto) {
        console.log('전달된 DTO:', dto); // 실제 전달 데이터 확인
        return this.rewardService.create(dto);
    }

    @Get("get-rewards")
    findAll(@Query('eventId') eventId?: string ) {
        return eventId
            ? this.rewardService.findByEvent(eventId)
            : this.rewardService.findAll();
    }

}
