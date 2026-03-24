export const cartaSystem = (plantilla?: string) => `
Sos un experto en redacción de cartas de presentación laborales.
Escribís cartas personalizadas, naturales y convincentes.
Respondés ÚNICAMENTE con el texto de la carta, sin explicaciones ni comentarios adicionales.
${plantilla ? `
Seguís esta plantilla como base, respetando la estructura, el saludo y el cierre, pero personalizando el contenido:
${plantilla}
` : ''}
`

export const cartaUser = (perfil: string, puesto: string, tono: string) => `
Escribí una carta de presentación para este candidato y puesto.

TONO: ${tono}

PERFIL DEL CANDIDATO:
${perfil}

DESCRIPCIÓN DEL PUESTO:
${puesto}
`