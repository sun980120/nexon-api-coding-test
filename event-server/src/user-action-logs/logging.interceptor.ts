import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UserActionLogsService } from "../user-action-logs/user-action-logs.service";
import { Reflector } from "@nestjs/core";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        private actionLogsService: UserActionLogsService,
        private reflector: Reflector
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler) {
        const actionType = this.reflector.get<string>(
            'logAction',
            context.getHandler()
        );

        if (!actionType) return next.handle();

        const request = context.switchToHttp().getRequest();
        const userId = request.user?.sub;

        // 비동기 로깅 (큐 활용)
        await this.actionLogsService.logUserAction({
            userId,
            actionType,
            metadata: {
                method: request.method,
                path: request.url,
                body: request.body,
            }
        });

        return next.handle();
    }
}
