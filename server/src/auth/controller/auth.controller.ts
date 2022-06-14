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
    ): Promise<LoginResponse> {
        const { user, accessToken, refreshToken } =
            await this._authService.login(dto);
        response.cookie('refreshToken', refreshToken, { httpOnly: true });
        return { user, accessToken };
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
        return { user, accessToken };
    }

    @Get('refresh')
    public async refresh(
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<RefreshResponse> {
        try {
            const { refreshToken } = request.cookies;
            const tokens = await this._authService.refresh(refreshToken);
            response.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
            });
            return { accessToken: tokens.accessToken };
        } catch (e) {
            throw new UnauthorizedException({
                message: 'User is not authorized',
            });
        }
    }
}
