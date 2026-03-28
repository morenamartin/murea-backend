// cv.controller.ts
import {
    Controller,
    Post,
    Get,
    Body,
    UseInterceptors,
    UploadedFile,
    Request,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CvService } from './cv.service';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('cv')
export class CvController {
    constructor(private readonly cvService: CvService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadCV(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
        return this.cvService.parseCV(file, req);
    }

    @Post()
    async createCV(@Request() req: any, @Body() data: { file: string, text: string, summary: any }) {
        return this.cvService.createCV(req.user.id, data);
    }

    @Get()
    async getCV(@Request() req: any) {
        return this.cvService.getLatestCV(req.user.id);
    }
}
