import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import * as jwksRsa from 'jwks-rsa'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKeyProvider: jwksRsa.passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${config.get('SUPABASE_URL')}/auth/v1/.well-known/jwks.json`,
            }),
            algorithms: ['ES256'],
        })
    }

    async validate(payload: any) {
        return {
            id: payload.sub,
            email: payload.email,
        }
    }
}