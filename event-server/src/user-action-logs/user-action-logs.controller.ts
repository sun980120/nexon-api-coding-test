import { Body, Controller, Post } from "@nestjs/common";
import { RequestUserLogDto } from "./dto/request.user.log.dto";
import { UserActionLogsService } from "./user-action-logs.service";

@Controller("user-action-logs")
export class UserActionLogsController {
    constructor(private readonly userActionLogsService: UserActionLogsService) {}

    // 출석, 초대, 퀘스트 등 모든 행동 로그 기록
    @Post("action")
    async createLog(@Body() dto: RequestUserLogDto) {
        return await this.userActionLogsService.create(dto);
    }
}
