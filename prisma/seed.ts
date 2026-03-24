import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const plantillas = [
        {
            nombre: 'Clásica formal',
            esDefault: true,
            contenido: `Estimado/a equipo de selección,

Me dirijo a ustedes para postularme al puesto mencionado.

[CUERPO]

Quedo a disposición para una entrevista cuando lo consideren conveniente.

Saludos cordiales,
[NOMBRE]`,
        },
        {
            nombre: 'Cercana',
            esDefault: true,
            contenido: `¡Hola! Espero que estén bien.

[CUERPO]

Quedo a la espera de su respuesta. ¡Muchas gracias!

[NOMBRE]`,
        },
        {
            nombre: 'Corta y concisa',
            esDefault: true,
            contenido: `Hola,

[CUERPO]

Gracias por su tiempo.

[NOMBRE]`,
        },
        {
            nombre: 'Estilo bootcamp',
            esDefault: true,
            contenido: `Buenas [MOMENTO], espero que estés bien.

Mi nombre es [NOMBRE], escribo para postularme al puesto de [ROL] que vi publicado en [PLATAFORMA].

[CUERPO]

Quedo a la espera de su respuesta.

Saludos,
[NOMBRE]`,
        },
    ]

    for (const plantilla of plantillas) {
        await prisma.plantilla.upsert({
            where: { nombre: plantilla.nombre },
            update: {},
            create: plantilla,
        })
    }

    console.log('Plantillas default creadas')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())