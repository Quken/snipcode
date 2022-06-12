import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@user/schemas';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly _userRepository: Model<User>,
    ) {}

    public async getByEmail(email: string): Promise<User> {
        return await this._userRepository.findOne({ email });
    }
}
