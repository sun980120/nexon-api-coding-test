import { Controller } from "@nestjs/common";
import { RequestCreateEventDto } from "./dtos/request.create.event.dto";
import { EventService } from "./event.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @MessagePattern({ cmd: 'create-event' })
    async createEvent(dto: RequestCreateEventDto) {
        return await this.eventService.create(dto);
    }

    @MessagePattern({ cmd: 'get-events' })
    async getEvents() {
        return this.eventService.findAll();
    }

    @MessagePattern({ cmd: 'get-event-by-id' })
    getEventById(data: { id: string }) {
        return this.eventService.findById(data.id);
    }
}
