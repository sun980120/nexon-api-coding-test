import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RequestRegisterDto } from "./dto/request.register.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RequestRegisterDto): Promise<string> {
        return await this.authService.register(dto)
    }
}
