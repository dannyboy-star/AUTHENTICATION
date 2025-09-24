import { Controller, Post, Body, UseGuards, Req, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('auth')
export class AuthController {
 private readonly logger = new Logger (AuthController.name);  
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const response = await this.authService.register(dto);
    this.logger.log(`✅ User registered: ${dto.email}`);
    return response;
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const response = await this.authService.login(dto);
    this.logger.debug(`✅ User logged in: ${dto.email}`);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Req() req) {
    const response = await this.authService.refresh(req.user);
    this.logger.debug(`♻️ Token refreshed for userId: ${req.user.id}`);
    return response;
  }
















}




