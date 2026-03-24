import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { IsString, IsEmail } from 'class-validator'

class RegistrarDto {
    @IsString()
    id: string

    @IsString()
    nombre: string

    @IsEmail()
    email: string
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('registrar')
    registrar(@Body() dto: RegistrarDto) {
        return this.authService.registrar(dto.id, dto.nombre, dto.email)
    }
}