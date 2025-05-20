import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RequestAuthDto } from "./dtos/request.auth.dto";

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVER') private readonly authServiceClient: ClientProxy) {}

    @Post('register')
    async register(@Body() dto: RequestAuthDto) {
        return this.authServiceClient.send({ cmd: 'register' }, dto);
    }

    @Post('login')
    login(@Body() dto: RequestAuthDto) {
        return this.authServiceClient.send({ cmd: 'login' }, dto);
    }
}
