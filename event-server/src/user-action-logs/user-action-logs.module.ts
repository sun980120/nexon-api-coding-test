import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventDocument } from "../events/schemas/event.schema";
import { RequestCreateEventDto } from "../events/dto/request.create.event.dto";
import { UserActionLogDocument } from "./schemas/user.action.log.schema";

@Injectable()
export class LogService {
    constructor(@InjectModel(Event.name) private userActionLog: Model<UserActionLogDocument>) {}

    async create(dto: RequestCreateEventDto) {
        const userActionLog = new this.userActionLog(dto);
        await userActionLog.save();
    }
}
