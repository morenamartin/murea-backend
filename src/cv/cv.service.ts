import { Injectable, BadRequestException } from '@nestjs/common';
import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class CvService {
    constructor(
        private prisma: PrismaService,
        private storage: StorageService,
    ) { }

    async parseCV(file: Express.Multer.File, req: any) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        let text = '';

        if (file.mimetype === 'application/pdf') {
            const parser = new PDFParse({ data: file.buffer });
            const result = await parser.getText();
            text = result.text;
        }

        else if (
            file.mimetype ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            const result = await mammoth.extractRawText({
                buffer: file.buffer,
            });
            text = result.value;
        }

        else {
            throw new BadRequestException('Formato no soportado');
        }

        text = this.cleanText(text);

        // 1. Subir archivo a Supabase Storage
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${req.user.id}-${Date.now()}.${fileExt}`;
        const filePath = `cvs/${fileName}`;

        await this.storage.subirArchivo('cvs', filePath, file.buffer, file.mimetype);
        const fileUrl = await this.storage.obtenerUrl('cvs', filePath);

        // SOLO SE RETORNA, NO SE GUARDA EN DB TODAVÍA
        return {
            fileUrl,
            text,
        };
    }

    async createCV(userId: string, data: { file: string, text: string, summary: any }) {
        return this.prisma.cv.create({
            data: {
                usuarioId: userId,
                file: data.file,
                text: data.text,
                summary: data.summary,
            },
        });
    }

    async getLatestCV(userId: string) {
        return this.prisma.cv.findFirst({
            where: { usuarioId: userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    private cleanText(text: string): string {
        return text
            .replace(/\n+/g, '\n')
            .replace(/\s+/g, ' ')
            .trim();
    }
}
