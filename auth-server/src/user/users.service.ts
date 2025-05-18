import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async create(
        username: string,
        password: string,
        roles: string[] = ['USER'],
    ): Promise<void> {
        const user = new this.userModel({ username, password, roles });
        await user.save();
    }
}