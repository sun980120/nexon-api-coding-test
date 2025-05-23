import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './events/event.module';
import { RequestModule } from "./requests/request.module";
import { RewardsModule } from "./rewards/reward.module";
import { UserActionLogsModule } from "./user-action-logs/user-action-logs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전체 모듈에서 환경변수 사용 가능
      expandVariables: true, // 변수 확장 지원 (예: SUPPORT_EMAIL=support@${APP_URL})
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    EventsModule,
    RequestModule,
    RewardsModule,
    UserActionLogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
