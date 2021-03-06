import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GUID } from '@shared/models';
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
        if (snippetId !== dto.id) {
            throw new BadRequestException();
        }
        const snippet = await this._snippetRepository.findOne({
            _id: dto.id.toString(),
        });

        const update = {
            name: dto.name,
            srcRaw: dto.srcRaw,
            likedByUserIds: dto?.likedBy?.map(({ id }) => id),
            modifiedAt: dto.modifiedAt,
        };
        try {
            await snippet.update(update);
        } catch (e) {
            console.log(e);
            throw e;
        }
        return await this._snippetRepository.findById({ _id: snippetId });
    }

    public async delete(id: GUID): Promise<void> {
        const data = await this._snippetRepository.deleteOne({ _id: id });
        if (data.deletedCount) {
            return;
        }
        throw new NotFoundException();
    }
}
