import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient } from '@supabase/supabase-js'

@Injectable()
export class StorageService {
    private supabase: any

    constructor(private config: ConfigService) {
        this.supabase = createClient(
            this.config.get<string>('SUPABASE_URL')!,
            this.config.get<string>('SUPABASE_SERVICE_KEY')!,
        )
    }

    async subirArchivo(bucket: string, path: string, file: Buffer, mimetype: string) {
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(path, file, {
                contentType: mimetype,
                upsert: true,
            })

        if (error) throw new Error(error.message)
        return data
    }

    async obtenerUrl(bucket: string, path: string) {
        const { data } = this.supabase.storage
            .from(bucket)
            .getPublicUrl(path)

        return data.publicUrl
    }

    async eliminarArchivo(bucket: string, path: string) {
        const { error } = await this.supabase.storage
            .from(bucket)
            .remove([path])

        if (error) throw new Error(error.message)
    }
}