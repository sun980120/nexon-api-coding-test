import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserActionLog, UserActionLogSchema } from "./schemas/user.action.log.schema";
import { UserActionLogsService } from "./user-action-logs.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserActionLog.name, schema: UserActionLogSchema }
        ])
    ],
    providers: [UserActionLogsService],
    exports: [UserActionLogsService]
})
export class UserActionLogsModule {}
