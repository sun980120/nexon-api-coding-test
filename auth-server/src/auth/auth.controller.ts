import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RequestAuthDto } from "./dtos/request.auth.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ResponseTokenDto } from "./dtos/response.token.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({ cmd: 'register' })
    async register(dto: RequestAuthDto): Promise<string> {
        return await this.authService.register(dto)
    }
    @MessagePattern({ cmd: 'login' })
    async login(dto: RequestAuthDto): Promise<string> {
        return this.authService.login(dto);
    }
    @MessagePattern({ cmd: 'validate-token' })
    async validateToken(
        @Payload() token: string,
    ): Promise<ResponseTokenDto | null> {
        return await this.authService.validateToken(token);
    }
}
