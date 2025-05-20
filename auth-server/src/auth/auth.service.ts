import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UsersService } from "../user/users.service";
import { RequestAuthDto } from "./dto/request.auth.dto";
import { UserDocument } from "../user/schemas/user.schema";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}


    async register(dto: RequestAuthDto): Promise<string> {
        await this.usersService.exists(dto.username);
        const hashed: string = await bcrypt.hash(dto.password, 10);
        await this.usersService.create(dto.username, hashed, dto.roles);
        return "success";
    }

    async login(dto: RequestAuthDto): Promise<string> {
        const user: UserDocument = await this.validateUser(dto.username, dto.password);
        const payload = {
            sub: user._id,
            username: user.username,
            roles: user.roles,
        };
        return await this.jwtService.signAsync(payload);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user: UserDocument | null = await this.usersService.findByUsername(
            username,
        );
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}
