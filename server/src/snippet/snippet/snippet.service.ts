import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GUID } from '@shared/models';
import { UpdateSnippetResponse } from '@snippet/controller';
import { Model } from 'mongoose';
import { CreateSnippetDTO, UpdateSnippetDTO } from '../controller/dto';
import { Snippet, SnippetDocument } from '../schemas';

@Injectable()
export class SnippetService {
    constructor(
        @InjectModel(Snippet.name)
        private readonly _snippetRepository: Model<SnippetDocument>,
    ) {}

    public async getAll() {
        return await this._snippetRepository.find();
    }

    public async getByUserId(userId: string): Promise<Partial<Snippet>[]> {
        const data = await this._snippetRepository.find({
            createdByUserId: userId,
        });
        return data;
    }

    public async create(dto: CreateSnippetDTO): Promise<Snippet> {
        const payload = {
            createdAt: new Date().toUTCString(),
            createdByUserId: dto.createdByUserId,
            name: dto.name,
            srcRaw: dto.srcRaw,
            language: dto.language,
            extension: dto.extension,
            likedBy: [],
        };
        return await this._snippetRepository.create(payload);
    }

    public async update(
        dto: UpdateSnippetDTO,
        snippetId: GUID,
    ): Promise<Snippet> {
        const snippet = this._snippetRepository.findOne({ _id: snippetId });
        if ((await snippet).createdByUserId.toString() !== dto.userId) {
            throw new BadRequestException();
        }
        const update = {
            name: dto.name,
            srcRaw: dto.srcRaw,
            likedByUserIds: dto.likedBy.map(({ id }) => id),
            modifiedAt: dto.modifiedAt,
        };
        await snippet.update(update);
        (await snippet).save();
        console.log(snippet);
        return snippet;
    }
}
