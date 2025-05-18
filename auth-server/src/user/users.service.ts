import { Model } from "mongoose";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async exists(username: string): Promise<void> {
        if (await this.userModel.exists({ username }) !== null) {
            throw new ConflictException('Already exists');
        }
    }

    async create(
        username: string,
        password: string,
        roles: string[] = ['USER'],
    ): Promise<void> {
        const user = new this.userModel({ username, password, roles });
        await user.save();
    }
}