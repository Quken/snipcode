import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
    @Get()
    getPage(@Res() response: Response) {
        const indexPath = join(__dirname, '..', 'front', 'index.html');
        console.log(indexPath);
        response.sendFile(indexPath);
    }
}
