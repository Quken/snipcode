import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service';
import { LoginDTO } from './dto';
import { LoginResponse } from './response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post('login')
    public login(@Body() dto: LoginDTO): Promise<LoginResponse> {
        return this._authService.login(dto);
    }
}
