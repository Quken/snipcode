import 'dotenv/config';

import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    Req,
    UnauthorizedException,
    HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from '../service';
import { LoginDTO, RegistrationDTO } from './dto';
import {
    LoginResponse,
    RefreshResponse,
    RegistrationResponse,
} from './response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post('login')
    public async login(
        @Body() dto: LoginDTO,
        @Res({ passthrough: true }) response: Response,
    ): Promise<any> {
        const { user, accessToken, refreshToken } =
            await this._authService.login(dto);
        response.cookie('refreshToken', refreshToken, {
            maxAge: Date.now() + 90000,
            httpOnly: true,
        });
        const payload: LoginResponse = { user, accessToken };
        response.send(payload);
    }

    @Post('register')
    public async register(
        @Body() dto: RegistrationDTO,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const { user, accessToken, refreshToken } =
            await this._authService.register(dto);
        response.cookie('refreshToken', refreshToken, {
            maxAge: Date.now() + 90000,
            httpOnly: true,
        });
        const payload: RegistrationResponse = { user, accessToken };
        response.send(payload);
    }

    @Get('refresh')
    public async refresh(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        let payload: RefreshResponse;
        try {
            const { refreshToken } = request.cookies;
            const { user, tokens } = await this._authService.refresh(
                refreshToken,
            );
            response.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
            });
            payload = {
                user,
                accessToken: tokens.accessToken,
            };
            return payload;
        } catch (e) {
            throw new UnauthorizedException({
                message: 'User is not authorized',
            });
        }
    }

    @Post('logout')
    @HttpCode(204)
    public async logout(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        try {
            const { refreshToken } = request.cookies;
            if (!refreshToken) {
                throw new UnauthorizedException({
                    message: 'User is not authorized',
                });
            }
            response.clearCookie('refreshToken');
        } catch (e) {
            throw new UnauthorizedException({
                message: 'User is not authorized',
            });
        }
    }
}
