import { Controller, Post } from "@nestjs/common";
import { RequestUserLogDto } from "./dto/request.user.log.dto";
import { LogService } from "./log.module";

@Controller("log")
export class LogController {
    constructor(private readonly logService: LogService) {}

    @Post("action")
    async createEvent(dto: RequestUserLogDto) {
        return this.logService.create(dto);
    }
}
