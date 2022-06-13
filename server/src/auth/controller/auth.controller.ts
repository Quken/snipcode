import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service';
import { LoginDTO, RegistrationDTO } from './dto';
import { LoginResponse, RegistrationResponse } from './response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post('login')
    public login(@Body() dto: LoginDTO): Promise<LoginResponse> {
        return this._authService.login(dto);
    }

    @Post('registration')
    public registration(
        @Body() dto: RegistrationDTO,
    ): Promise<RegistrationResponse> {
        return this._authService.register(dto);
    }
}
