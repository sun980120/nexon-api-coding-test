// user-action-logs.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserActionLog, UserActionLogDocument } from "./schemas/user.action.log.schema";
import { Model } from "mongoose";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from 'bull';
import { RequestUserLogDto } from "./dto/request.user.log.dto";

@Injectable()
export class UserActionLogsService {
    constructor(
        @InjectQueue('logging') private readonly loggingQueue: Queue,
        @InjectModel(UserActionLog.name) private readonly actionLogModel: Model<UserActionLogDocument>
    ) {}
    async create(dto: RequestUserLogDto): Promise<string> {
        await this.actionLogModel.create(dto);
        return "success";
    }

    // 특정 이벤트 보상 수령 여부 확인
    async hasReceivedReward(userId: string, eventId: string): Promise<boolean> {
        return !!(await this.actionLogModel.exists({
            userId,
            eventId,
            actionType: 'REWARD'
        }))
    }

    // 보상 수령 로그 기록
    async logReward(userId: string, eventId: string, metadata?: any): Promise<void> {
        await this.actionLogModel.create({
            userId,
            eventId,
            actionType: 'REWARD',
            metadata
        })
    }
    async logUserAction(dto: RequestUserLogDto): Promise<void> {
        await this.actionLogModel.create(dto);
    }
    async logUserActionAsync(dto: RequestUserLogDto): Promise<void> {
        // 비동기 큐에 추가 (실패 시 재시도 정책 적용)
        await this.loggingQueue.add('log-action', dto, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000
            }
        });
    }
}
