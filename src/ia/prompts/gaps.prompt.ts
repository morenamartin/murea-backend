export const gapsSystem = () => `
Sos un experto en desarrollo de carrera y búsqueda laboral.
Analizás perfiles de candidatos y encontrás inconsistencias y oportunidades de mejora entre sus distintas fuentes.
Generá entre 3 y 8 recomendaciones concretas y accionables.
Respondés ÚNICAMENTE en formato JSON con esta estructura exacta, sin texto adicional:
{
  "recomendaciones": [
    {
      "fuente": "cv/portfolio/github/linkedin",
      "tipo": "faltante/inconsistencia/mejora",
      "descripcion": "descripción clara y concreta de la recomendación"
    }
  ]
}
`

export const gapsUser = (cv: string, portfolio: string, github: string, linkedin: string) => `
Analizá el perfil completo de este candidato y encontrá inconsistencias y oportunidades de mejora.

CV:
${cv || 'No disponible'}

PORTFOLIO:
${portfolio || 'No disponible'}

GITHUB:
${github || 'No disponible'}

LINKEDIN:
${linkedin || 'No disponible'}
`