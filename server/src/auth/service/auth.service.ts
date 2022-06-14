import * as bcrypt from 'bcryptjs';

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
import { EditorSettingsService } from '@settings/editor-settings-service';
import { TokenService } from '@token/service';

@Injectable()
export class AuthService {
    constructor(
        private readonly _userService: UserService,
        private readonly _tokenService: TokenService,
        private readonly _editorSettingsService: EditorSettingsService,
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

    public async login(
        dto: LoginDTO,
    ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
        const user = await this._validateUser(dto);
        const { accessToken, refreshToken } =
            await this._tokenService.generateTokens({
                email: user.email,
                id: user.id,
            });
        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    public async register(
        dto: RegistrationDTO,
    ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
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
        await this._editorSettingsService.createDefaultSettings(castedUser.id);
        const { accessToken, refreshToken } =
            await this._tokenService.generateTokens({
                email: castedUser.email,
                id: castedUser.id,
            });
        return {
            user: castedUser,
            accessToken,
            refreshToken,
        };
    }

    public async refresh(
        refreshToken: string,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        if (!refreshToken) {
            throw new UnauthorizedException({
                message: 'User is not authorized',
            });
        }
        const data = (await this._tokenService.validateRefreshToken(
            refreshToken,
        )) as { id: string };
        if (!data) {
            throw new UnauthorizedException({
                message: 'User is not authorized',
            });
        }
        const user = await this._userService.getById(data.id);
        return await this._tokenService.generateTokens({
            email: user.email,
            id: user._id,
        });
    }
}
