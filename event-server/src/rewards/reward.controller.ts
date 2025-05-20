import { Controller } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RequestCreateRewardDto } from './dtos/request.create-reward.dto';
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class RewardController {
    constructor(private readonly rewardService: RewardService) {}


    @MessagePattern({ cmd: 'create-reward' })
    create(dto: RequestCreateRewardDto) {
        return this.rewardService.create(dto);
    }

    @MessagePattern({ cmd: 'get-rewards' })
    findAll(data: { eventId?: string }) {
        return data.eventId
            ? this.rewardService.findByEvent(data.eventId)
            : this.rewardService.findAll();
    }

}
