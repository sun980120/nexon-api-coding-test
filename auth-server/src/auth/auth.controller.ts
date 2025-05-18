import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RequestAuthDto } from "./dto/request.auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RequestAuthDto): Promise<string> {
        return await this.authService.register(dto)
    }

    @Post('login')
    async login(@Body() dto: RequestAuthDto): Promise<string> {
        return this.authService.login(dto);
    }
}
