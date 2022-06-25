import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@token/service';
import { Observable } from 'rxjs';

@Injectable()
export class JWTAuthGuard implements CanActivate {
    constructor(private readonly _tokenService: TokenService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: 'User is not authorized',
                });
            }
            const signed = await this._tokenService.validateAccessToken(token);
            if (!signed) {
                throw new UnauthorizedException({
                    message: 'User is not authorized',
                });
            }
            return true;
        } catch (e) {
            throw new UnauthorizedException({
                message: 'User is not authorized',
            });
        }
    }
}
