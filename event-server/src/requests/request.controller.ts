import { Body, Controller, Get, Post } from "@nestjs/common";
import { RequestService } from "./request.service";
import { RewardRequestDto } from "./dtos/rewarod.request.dto";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class RequestController {
    constructor(private readonly requestService: RequestService) {}


    @MessagePattern({ cmd: 'create-request' })
    async handleCreateRequest(@Body() dto: RewardRequestDto) {
        return this.requestService.createRequest(dto.userId, dto.eventId);
    }

    @MessagePattern({ cmd: 'get-request' })
    findAll(@Body() dto: RewardRequestDto) {
        return dto.userId
        ? this.requestService.findByUser(dto.userId)
            : this.requestService.findAll();
    }
}