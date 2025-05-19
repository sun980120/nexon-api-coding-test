import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EventDocument } from "./schemas/event.schema";
import { RequestCreateEventDto } from "./dto/request.create.event.dto";

@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

    async create(dto: RequestCreateEventDto): Promise<void> {
        const event = new this.eventModel(dto);
        await event.save();
    }
}
