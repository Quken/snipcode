import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    Req,
    UnauthorizedException,
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
    ): Promise<void> {
        const { user, accessToken, refreshToken } =
            await this._authService.login(dto);
        response.cookie('refreshToken', refreshToken, { httpOnly: true });
        response.send({ user, accessToken });
        return;
    }

    @Post('registration')
    public async registration(
        @Body() dto: RegistrationDTO,
        @Res({ passthrough: true }) response: Response,
    ): Promise<RegistrationResponse> {
        const { user, accessToken, refreshToken } =
            await this._authService.register(dto);
        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        });
        response.send({ user, accessToken });
        return;
    }

    @Get('refresh')
    public async refresh(
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        try {
            const { refreshToken } = request.cookies;
            const tokens = await this._authService.refresh(refreshToken);
            console.log(tokens);
            response.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
            });
            response.send({ accessToken: tokens.accessToken });
            return;
        } catch (e) {
            throw new UnauthorizedException({
                message: 'User is not authorized',
            });
        }
    }

    @Post('logout')
    public async logout(
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        try {
            const { refreshToken } = request.cookies;
            if (!refreshToken) {
                throw new UnauthorizedException({
                    message: 'User is not authorized',
                });
            }
            response.clearCookie('refreshToken');
            response.sendStatus(204);
        } catch (e) {
            throw new UnauthorizedException({
                message: 'User is not authorized',
            });
        }
    }
}
