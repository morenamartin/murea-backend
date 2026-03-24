# Murea — Backend

API REST para Murea, el asistente inteligente de búsqueda laboral. Construido con NestJS, Prisma y Supabase.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | NestJS |
| ORM | Prisma |
| Base de datos | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Auth | Supabase Auth + JWT |
| IA | OpenAI API (gpt-4.1-nano) |

---

## Instalación

### Requisitos

- Node.js 18+
- npm
- NestJS CLI — `npm install -g @nestjs/cli`
- Cuenta en [Supabase](https://supabase.com)
- API Key de [OpenAI](https://platform.openai.com)

### Pasos

```bash
npm install
```

Configurá las variables de entorno (ver sección siguiente), luego:

```bash
# Correr migraciones
npx prisma migrate dev

# Cargar plantillas default
npm run seed

# Iniciar en modo desarrollo
npm run start:dev
```

El servidor corre en `http://localhost:3000`.

---

## Variables de entorno

Creá un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres

# Supabase
SUPABASE_URL=https://[PROJECT].supabase.co
SUPABASE_SERVICE_KEY=tu_service_role_key
SUPABASE_JWT_SECRET=tu_jwt_secret

# OpenAI
OPENAI_API_KEY=tu_api_key
```

### Dónde encontrar cada variable en Supabase

| Variable | Ubicación |
|---|---|
| `DATABASE_URL` | Settings → Database → Connection string → URI |
| `SUPABASE_URL` | Settings → API → Project URL |
| `SUPABASE_SERVICE_KEY` | Settings → API → service_role key |
| `SUPABASE_JWT_SECRET` | Settings → JWT Keys → Legacy JWT Secret → Reveal |

---

## Endpoints

### Auth
| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/registrar` | Crea el usuario en la DB tras el registro con Supabase |

### Usuarios
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/usuarios/perfil` | Obtiene el perfil del usuario autenticado |
| PUT | `/usuarios/perfil` | Actualiza el perfil — recalcula gaps de IA automáticamente |

### Postulaciones
| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/postulaciones` | Crea una postulación — analiza fit con IA automáticamente |
| GET | `/postulaciones` | Lista todas las postulaciones del usuario |
| GET | `/postulaciones/estadisticas` | Estadísticas por estado |
| GET | `/postulaciones/:id` | Obtiene una postulación con entrevistas y carta |
| PUT | `/postulaciones/:id` | Actualiza una postulación |
| DELETE | `/postulaciones/:id` | Elimina una postulación |

### Entrevistas
| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/entrevistas` | Crea una ronda de entrevista |
| GET | `/entrevistas/postulacion/:id` | Lista las rondas de una postulación |
| PUT | `/entrevistas/:id` | Actualiza una ronda |
| DELETE | `/entrevistas/:id` | Elimina una ronda |

### Cartas
| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/cartas` | Genera una carta con IA para una postulación |
| GET | `/cartas/postulacion/:id` | Obtiene la carta de una postulación |
| PUT | `/cartas/postulacion/:id` | Actualiza el contenido de la carta |

### Plantillas
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/plantillas` | Lista plantillas del usuario y las default |
| POST | `/plantillas` | Crea una plantilla propia |
| PUT | `/plantillas/:id` | Actualiza una plantilla propia |
| DELETE | `/plantillas/:id` | Elimina una plantilla propia |

### Metas
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/metas` | Obtiene las metas del usuario |
| POST | `/metas` | Crea una meta (diaria o semanal) |
| PUT | `/metas/:tipo` | Actualiza la cantidad de una meta |

---

## Autenticación

Todos los endpoints excepto `POST /auth/registrar` requieren un JWT de Supabase en el header:

```
Authorization: Bearer <token>
```

---

## Supabase Storage

La app usa dos buckets:

| Bucket | Contenido |
|---|---|
| `cvs` | PDFs del CV del usuario |
| `linkedin` | ZIPs del export de LinkedIn |

---

## Módulo de IA

La IA se llama automáticamente en estos momentos:

- **Al crear una postulación** — analiza el fit entre el perfil del usuario y el puesto
- **Al generar una carta** — genera la carta personalizada según el tono y plantilla elegidos
- **Al actualizar el perfil** — recalcula los gaps entre CV, portfolio, GitHub y LinkedIn
- **Al preparar una entrevista** — genera preguntas técnicas, conductuales y cosas a investigar

---

## Roadmap v2

- Búsqueda automática en job boards (Adzuna, Remotive)
- Links inteligentes pre-configurados a LinkedIn y Glassdoor
