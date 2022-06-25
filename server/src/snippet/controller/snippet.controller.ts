import { JWTAuthGuard } from '@auth/guard';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { UserService } from '@user/user';
import { Request, Response } from 'express';
import { SnippetService } from '../snippet';
import { CreateSnippetDTO } from './dto';
import { LikedBy, Snippet } from './model';
import { CreateSnippetResponse } from './response';

@Controller('snippet')
@UseGuards(JWTAuthGuard)
export class SnippetController {
    constructor(
        private readonly _snippetService: SnippetService,
        private readonly _userService: UserService,
    ) {}

    @Get('userid/:id')
    public async snippetsByUserId(@Param() params, @Res() response: Response) {
        const data = await this._snippetService.getByUserId(params.id);
        let body = [];
        if (data?.length) {
            const createdBy = await this._userService.getById(params.id);
            const snippets = await Promise.all(
                data.map(async (snippet) => {
                    const likedBy = await snippet.likedByUserIds.map(
                        async (id): Promise<LikedBy> => {
                            const user = await this._userService.getById(id);
                            return {
                                id: user._id,
                                name: user.name,
                                surname: user.surname,
                            };
                        },
                    );
                    const payload = {
                        id: snippet._id,
                        createdAt: snippet.createdAt,
                        createdBy: {
                            id: createdBy._id,
                            email: createdBy.email,
                            name: createdBy.name,
                            surname: createdBy.surname,
                            summary: createdBy.summary,
                            age: createdBy.age,
                            position: createdBy.position,
                        },
                        name: snippet.name,
                        modifiedAt: snippet?.modifiedAt,
                        srcRaw: snippet.srcRaw,
                        language: snippet.language,
                        extension: snippet.extension,
                        likedBy,
                    };
                    return payload;
                }),
            );
            body = snippets;
        }
        response.send(body);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(
        @Body() dto: CreateSnippetDTO,
        @Res() response: Response,
    ): Promise<void> {
        const snippet = await this._snippetService.create(dto);
        const createdBy = await this._userService.getById(dto.createdByUserId);
        const payload: CreateSnippetResponse = {
            id: snippet._id,
            createdAt: snippet.createdAt,
            createdBy: {
                ...createdBy,
                id: createdBy._id,
            },
            name: snippet.name,
            srcRaw: snippet.srcRaw,
            language: snippet.language,
            extension: snippet.extension,
            likedBy: [],
        };
        response.send(payload);
    }
}
