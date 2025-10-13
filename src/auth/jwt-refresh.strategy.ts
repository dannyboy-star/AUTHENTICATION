import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  private readonly logger = new Logger(JwtRefreshStrategy.name);
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_REFRESH_WILLIAMS'),  
      
    });
    this.logger.debug(
      `🔐 JwtStrategy initialized with secret: ${config.get<string>('JWT_SECRET')}`,
    );
  }
async validate(payload: any) {
  this.logger.debug(`✅ JWT validated, payload: ${JSON.stringify(payload)}`);
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}



