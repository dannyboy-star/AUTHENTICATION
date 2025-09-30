import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); 
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.usersService.create({ ...dto, password: hashed });
    
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

const payload = { sub: user.id, email: user.email, role: user.role };
return {
  accessToken: this.jwtService.sign(payload, {
    secret: this.config.get<string>('JWT_SECRET'), 
    expiresIn: '15m',
  }),
  refreshToken: this.jwtService.sign(payload, {
    secret: this.config.get<string>('JWT_REFRESH_WILLIAMS'), 
    expiresIn: '7d',
  }),
};
  }

   async refresh(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.config.get<string>('JWT_SECRET'), 
        expiresIn: '15m',
      }),
      refreshToken: this.jwtService.sign(payload,{
        secret: this.config.get<string>('JWT_REFRESH_WILLIAMS'),
        expiresIn: '7d',
      })
    };
  }
} 



