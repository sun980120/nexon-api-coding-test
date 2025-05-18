import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./user/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,         // 전체 모듈에서 환경변수 사용 가능
            expandVariables: true,  // 변수 확장 지원
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
            }),
        }),
        AuthModule,
        UsersModule
    ],
})
export class AppModule {}
