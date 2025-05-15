import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.TCP,
            options: {
                host: process.env.HOST ?? '0.0.0.0',
                port: parseInt(process.env.PORT ?? '3000', 10),
            },
        },
    )
    await app.listen();
}
bootstrap();
