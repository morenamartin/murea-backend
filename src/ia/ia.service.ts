import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import Groq from 'groq-sdk';
import { fitSystem, fitUser } from './prompts/fit.prompt';
import { cartaSystem, cartaUser } from './prompts/carta.prompt';
import { entrevistaSystem, entrevistaUser } from './prompts/entrevista.prompt';
import { gapsSystem, gapsUser } from './prompts/gaps.prompt';
import { cvSummarySystem, cvSummaryUser, githubSummarySystem, githubSummaryUser, linkedinSummarySystem, linkedinSummaryUser, portfolioSummarySystem, portfolioSummaryUser } from './prompts/perfil.prompt';

@Injectable()
export class IaService {
    private openai: OpenAI
    private groq: Groq

    constructor(private config: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.config.get('OPENAI_API_KEY'),
        })
        this.groq = new Groq({
            apiKey: this.config.get('GROQ_API_KEY'),
        })
    }

    // private mockFit() {
    //     return {
    //         matchPorcentaje: 78,
    //         skillsMatch: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    //         skillsFaltantes: ['AWS', 'Docker'],
    //         redFlags: [],
    //         veredicto: 'El perfil matchea bien con el puesto. Tenés las skills principales requeridas. Te falta experiencia en cloud pero es algo que podés aprender en el trabajo.'
    //     }
    // }

    private armarPerfil(usuario: any): string {
        return `
            CV:
            ${usuario.cvTexto || 'No disponible'}

            PORTFOLIO:
            ${usuario.portfolioContenido || 'No disponible'}

            GITHUB:
            ${JSON.stringify(usuario.githubData) || 'No disponible'}

            LINKEDIN:
            ${JSON.stringify(usuario.linkedinData) || 'No disponible'}
            `.trim()
    }

    private async llamarIA(systemPrompt: string, userPrompt: string, temperature = 0.5): Promise<string> {
        const response = await this.groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature,
        })
        return response.choices[0].message.content || ''
    }

    // async analizarFit(usuario: any, puesto: string) {
    //     if (process.env.NODE_ENV !== 'production') {
    //         return this.mockFit()
    //     }

    //     const perfil = this.armarPerfil(usuario)
    //     const respuesta = await this.llamarIA(fitSystem(), fitUser(perfil, puesto), 0.3)

    //     try {
    //         return JSON.parse(respuesta)
    //     } catch {
    //         throw new Error('Error al parsear respuesta de IA')
    //     }
    // }

    async analizarFit(usuario: any, puesto: string) {
        const perfil = this.armarPerfil(usuario)
        const respuesta = await this.llamarIA(fitSystem(), fitUser(perfil, puesto), 0.3)

        try {
            return JSON.parse(respuesta)
        } catch {
            throw new Error('Error al parsear respuesta de IA')
        }
    }

    async generarCarta(usuario: any, puesto: string, tono: string, plantilla?: string) {
        const perfil = this.armarPerfil(usuario)
        const respuesta = await this.llamarIA(cartaSystem(plantilla), cartaUser(perfil, puesto, tono), 0.7)
        return respuesta
    }

    async prepararEntrevista(usuario: any, puesto: string) {
        const perfil = this.armarPerfil(usuario)
        const respuesta = await this.llamarIA(entrevistaSystem(), entrevistaUser(perfil, puesto), 0.5)

        try {
            return JSON.parse(respuesta)
        } catch {
            throw new Error('Error al parsear respuesta de IA')
        }
    }


    // RESUMEN CV
    async analizarCV(cvTexto: string) {
        const respuesta = await this.llamarIA(
            cvSummarySystem(),
            cvSummaryUser(cvTexto),
            0.3,
        )

        try {
            return JSON.parse(respuesta)
        } catch {
            throw new Error('Error al parsear respuesta de IA')
        }
    }

    // RESUMEN GITHUB
    async analizarGithub(usuario: any) {
        const respuesta = await this.llamarIA(
            githubSummarySystem(),
            githubSummaryUser(JSON.stringify(usuario.githubData)),
            0.3,
        )

        try {
            return JSON.parse(respuesta)
        } catch {
            throw new Error('Error al parsear respuesta de IA')
        }
    }

    // RESUMEN LINKEDIN
    async analizarLinkedin(usuario: any) {
        const respuesta = await this.llamarIA(
            linkedinSummarySystem(),
            linkedinSummaryUser(JSON.stringify(usuario.linkedinData)),
            0.3,
        )

        try {
            return JSON.parse(respuesta)
        } catch {
            throw new Error('Error al parsear respuesta de IA')
        }
    }

    // RESUMEN PORTFOLIO
    async analizarPortfolio(usuario: any) {
        const respuesta = await this.llamarIA(
            portfolioSummarySystem(),
            portfolioSummaryUser(JSON.stringify(usuario.portfolioContenido)),
            0.3,
        )

        try {
            return JSON.parse(respuesta)
        } catch {
            throw new Error('Error al parsear respuesta de IA')
        }
    }


    async analizarGaps(usuario: any) {
        const respuesta = await this.llamarIA(
            gapsSystem(),
            gapsUser(
                usuario.cvTexto,
                usuario.portfolioContenido,
                JSON.stringify(usuario.githubData),
                JSON.stringify(usuario.linkedinData),
            ),
            0.3,
        )

        try {
            return JSON.parse(respuesta)
        } catch {
            throw new Error('Error al parsear respuesta de IA')
        }
    }
}
