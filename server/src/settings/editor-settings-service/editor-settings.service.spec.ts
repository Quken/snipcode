import { Test, TestingModule } from '@nestjs/testing';
import { EditorSettingsService } from './editor-settings.service';

describe('ServiceService', () => {
    let service: EditorSettingsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EditorSettingsService],
        }).compile();

        service = module.get<EditorSettingsService>(EditorSettingsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
