import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service';
import { LoginDTO, RegistrationDTO } from './dto';
import { LoginResponse, RegistrationResponse } from './response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post('login')
    public async login(
        @Req() request: Request,
        @Body() dto: LoginDTO,
        @Res() response: Response,
    ): Promise<LoginResponse> {
        const { user, accessToken, refreshToken } =
            await this._authService.login(dto);
        response.headers.append('Authorization', `Bearer ${accessToken}`);
        // request.cookies['refreshToken'] = refreshToken;
        // response.setCookie();
    }

    @Post('registration')
    public registration(
        @Body() dto: RegistrationDTO,
    ): Promise<RegistrationResponse> {
        return this._authService.register(dto);
    }
}
