import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from "./auth/auth.controller";
import { EventController } from "./events/event.controller";
import { RequestController } from "./requests/request.controller";
import { RewardController } from "./rewards/reward.controller";
import { UserActionLogsController } from "./user-action-log/user-action-logs.controller";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVER',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_SERVER_HOST'),
            port: configService.get<number>('AUTH_SERVER_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'EVENT_SERVER',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('EVENT_SERVER_HOST'),
            port: configService.get<number>('EVENT_SERVER_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [
      AppController,
      AuthController,
      EventController,
      RequestController,
      RewardController,
      UserActionLogsController
  ],
  providers: [AppService],
})
export class AppModule {}
