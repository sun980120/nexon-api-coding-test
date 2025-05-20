import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RewardRequest, RewardRequestSchema } from "./schemas/request.schema";
import { RequestService } from "./request.service";
import { RequestController } from "./request.controller";
import { UserActionLogsModule } from "../user-action-logs/user-action-logs.module";
import { EventsModule } from "../events/event.module";

@Module({
    imports: [
        UserActionLogsModule,
        EventsModule,
        MongooseModule.forFeature([
            { name: RewardRequest.name, schema: RewardRequestSchema }
        ])
    ],
    controllers: [RequestController],
    providers: [RequestService],
    exports: []
})
export class RequestModule {}
