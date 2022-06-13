import * as bcrypt from 'bcryptjs';

import { LoginResponse, RegistrationResponse } from '@auth/controller';
import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@user/user';
import { LoginDTO, RegistrationDTO } from '../controller/dto';

import { JwtService } from '@nestjs/jwt';
import { User } from '@user/models';

@Injectable()
export class AuthService {
    constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService,
    ) {}

    private async _validateUser(dto: LoginDTO): Promise<User> {
        const { _id, ...user } = await this._userService.getByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(
            dto.password,
            user.password,
        );
        if (user && passwordEquals) {
            return {
                id: _id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                summary: user.summary,
                age: user.age,
                position: user.position,
            };
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

    public async register(dto: RegistrationDTO): Promise<RegistrationResponse> {
        const candidate = await this._userService.getByEmail(dto.email);
        if (candidate) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hash = await bcrypt.hash(dto.password, 10);
        const { _id, ...user } = await this._userService.create({
            ...dto,
            password: hash,
        });
        const castedUser = {
            id: _id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            summary: user.summary,
            age: user.age,
            position: user.position,
        };
        const { token: accessToken } = await this._generateToken(castedUser);
        return {
            user: castedUser,
            accessToken,
        };
    }
}
