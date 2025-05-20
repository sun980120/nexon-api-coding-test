import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../conf/roles.guard";
import { ClientProxy } from "@nestjs/microservices";
import { Roles } from "src/conf/roles.decorator";
import { RequestCreateEventDto } from "./dtos/request.create.event.dto";
import { AuthGuard } from "../conf/auth.guard";

@Controller('events')
@UseGuards(AuthGuard, RolesGuard)
export class EventController {
    constructor(@Inject('EVENT_SERVER') private readonly eventServiceClient: ClientProxy) {}

    @Post()
    @Roles('OPERATOR', 'ADMIN')
    createEvent(@Body() dto: RequestCreateEventDto) {
        return this.eventServiceClient.send({ cmd: 'create-event' }, dto);
    }

    @Get()
    @Roles('USER', 'OPERATOR', 'AUDITOR', 'ADMIN')
    getEvents() {
        return this.eventServiceClient.send({ cmd: 'get-events' }, {});
    }

    @Get(':id')
    @Roles('USER', 'OPERATOR', 'AUDITOR', 'ADMIN')
    getEventById(@Param('id') id: string) {
        return this.eventServiceClient.send({ cmd: 'get-event-by-id' }, { id });
    }
}
