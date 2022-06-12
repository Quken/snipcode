import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDTO {
    @ApiProperty({
        example: 'user@gmail.com',
        description: 'user email',
    })
    @IsString({
        message: 'Should be string',
    })
    @IsEmail(
        {},
        {
            message: 'Should be email format',
        },
    )
    public readonly email: string;

    @ApiProperty({
        example: 'somepassword',
        description: 'user password',
    })
    @IsString({
        message: 'Should be string',
    })
    @Length(6, 100, { message: 'Should be (6,100)' })
    public readonly password: string;
}
