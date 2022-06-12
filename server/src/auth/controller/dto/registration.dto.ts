import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsNumber, Max, Min } from 'class-validator';

export class RegistrationDTO {
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

    @ApiProperty({
        example: 'John',
        description: 'user name',
    })
    @IsString({
        message: 'Should be string',
    })
    public readonly name: string;

    @ApiProperty({
        example: 'Doe',
        description: 'user surname',
    })
    @IsString({
        message: 'Should be string',
    })
    public readonly surname: string;

    @ApiProperty({
        example: 'I am a human',
        description: 'user summary',
    })
    @IsString({
        message: 'Should be string',
    })
    public readonly summary: string;

    @ApiProperty({
        example: 10,
        description: 'user age',
    })
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
    })
    @Max(100)
    @Min(0)
    public readonly age?: string;

    @ApiProperty({
        example: 'Software Engineer',
        description: 'user position',
    })
    @IsString({
        message: 'Should be string',
    })
    public readonly position?: string;
}
