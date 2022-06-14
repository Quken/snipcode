import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private readonly _jwtService: JwtService) {}

    public async generateTokens(
        payload: object,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        return {
            accessToken: this._jwtService.sign(payload, {
                secret: process.env.ACCESS_TOKEN_SECRET,
                expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
            }),
            refreshToken: this._jwtService.sign(payload, {
                secret: process.env.REFRESH_TOKEN_SECRET,
                expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
            }),
        };
    }

    public async validateRefreshToken(token: string): Promise<object> {
        try {
            const data = await this._jwtService.verify(token, {
                secret: process.env.REFRESH_TOKEN_SECRET,
            });
            if (data) {
                return data;
            }
        } catch (e) {
            return null;
        }
    }
}
