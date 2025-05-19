import { Body, Controller, Get, Post } from "@nestjs/common";
import { RequestService } from "./request.service";

@Controller("requests")
export class RequestController {
    constructor(private readonly requestService: RequestService) {}

    @Post('create-request')
    async handleCreateRequest(@Body() data: { userId: string; eventId: string }) {
        return this.requestService.createRequest(data.userId, data.eventId);
    }

    @Get('get-requests')
    findAll(@Body() data: { userId?: string }) {
        return data.userId
        ? this.requestService.findByUser(data.userId)
            : this.requestService.findAll();
    }
}