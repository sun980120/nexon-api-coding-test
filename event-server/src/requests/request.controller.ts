import { Body, Controller, Post } from "@nestjs/common";
import { RequestService } from "./request.service";

@Controller("requests")
export class RequestController {
    constructor(private readonly requestService: RequestService) {}

    @Post('create-request')
    async handleCreateRequest(@Body() data: { userId: string; eventId: string }) {
        return this.requestService.createRequest(data.userId, data.eventId);
    }
}