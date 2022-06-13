import { RegistrationDTO } from '@auth/controller';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@user/schemas';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly _userRepository: Model<UserDocument>,
    ) {}

    public async getByEmail(email: string): Promise<User> {
        return await this._userRepository.findOne({ email }).lean();
    }

    public async create(dto: RegistrationDTO): Promise<User> {
        const user = await this._userRepository.create(dto);
        if (user) {
            return await this.getByEmail(dto.email);
        }
    }
}
