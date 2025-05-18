import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UsersService } from "../user/users.service";
import { RequestRegisterDto } from "./dto/request.register.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    async register(dto: RequestRegisterDto): Promise<string> {
        await this.usersService.exists(dto.username);
        const hashed: string = await bcrypt.hash(dto.password, 10);
        await this.usersService.create(dto.username, hashed, dto.roles);
        return "success";
    }
}
