import * as bcrypt from 'bcryptjs';

import { LoginResponse } from '@auth/controller';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@user/user';
import { LoginDTO } from '../controller/dto';
import { User } from '@user/schemas';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService,
    ) {}

    private async _validateUser(dto: LoginDTO): Promise<User> {
        const user = await this._userService.getByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(
            dto.password,
            user.password,
        );
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException(
            { message: `Invalid credentials` },
            HttpStatus.BAD_REQUEST.toString(),
        );
    }

    private async _generateToken(user: User): Promise<{ token: string }> {
        const payload = { email: user.email, id: user.id };
        return {
            token: this._jwtService.sign(payload),
        };
    }

    public async login(dto: LoginDTO): Promise<LoginResponse> {
        const user = await this._validateUser(dto);
        const { token: accessToken } = await this._generateToken(user);
        return {
            user,
            accessToken,
        };
    }
}
