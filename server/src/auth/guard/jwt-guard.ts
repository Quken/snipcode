import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JWTAuthGuard implements CanActivate {
    constructor(private readonly _jwtService: JwtService) {}

    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.header.authorization;
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: 'User is not authorized',
                });
            }
            const signed = this._jwtService.verify(token);
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
