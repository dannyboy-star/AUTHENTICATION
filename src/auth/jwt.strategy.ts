import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt'
) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET'),  
      
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



