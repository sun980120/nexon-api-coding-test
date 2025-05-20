import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { RequestUserLogDto } from "./dtos/request.user.log.dto";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "../conf/auth.guard";
import { RolesGuard } from "../conf/roles.guard";
import { Roles } from "../conf/roles.decorator";

@Controller("user-action-logs")
@UseGuards(AuthGuard, RolesGuard)
export class UserActionLogsController {
    constructor(
        @Inject('EVENT_SERVER') private readonly eventServiceClient: ClientProxy) {}

    // 출석, 초대, 퀘스트 등 모든 행동 로그 기록
    @Post()
    @Roles('USER')
    createLog(@Body() dto: RequestUserLogDto) {
        return this.eventServiceClient.send({ cmd: 'create-user-action-log' }, {dto});
    }
}
