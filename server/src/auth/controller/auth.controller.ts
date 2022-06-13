import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '../service';
import { LoginDTO, RegistrationDTO } from './dto';
import { LoginResponse, RegistrationResponse } from './response';

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
}
