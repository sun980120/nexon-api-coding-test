import { Body, Controller, Get, Inject, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../conf/auth.guard";
import { RolesGuard } from "../conf/roles.guard";
import { ClientProxy } from "@nestjs/microservices";
import { Roles } from "../conf/roles.decorator";
import { RequestCreateRewardDto } from "./dtos/request.create-reward.dto";

@Controller('rewards')
@UseGuards(AuthGuard, RolesGuard)
export class RewardController {
    constructor(@Inject('EVENT_SERVER') private readonly eventServiceClient: ClientProxy) {}

    @Post()
    @Roles('OPERATOR', 'ADMIN')
    createReward(@Body() dto: RequestCreateRewardDto) {
        return this.eventServiceClient.send({ cmd: 'create-reward' }, dto);
    }

    @Get()
    @Roles('USER', 'OPERATOR', 'AUDITOR', 'ADMIN')
    getRewards(@Query('eventId') eventId?: string) {
        return this.eventServiceClient.send({ cmd: 'get-rewards' }, { eventId });
    }
}
