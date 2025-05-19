import { Body, Controller, Post } from "@nestjs/common";
import { RequestCreateEventDto } from "./dto/request.create.event.dto";
import { EventService } from "./event.service";

@Controller("events")
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post("create-event")
    async createEvent(@Body() dto: RequestCreateEventDto) {
        return this.eventService.create(dto);
    }
}
