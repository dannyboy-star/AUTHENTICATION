import { Controller, Post, Body, UseGuards, Req, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshAuthGuard } from 'src/common/jwt-refresh-auth.guard'
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import{User as UserEntity} from 'src/users/user.entity'
import {User} from 'src/common/user.decorator'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
 private readonly logger = new Logger (AuthController.name);  
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const response = await this.authService.register(dto);
    this.logger.log(`✅ User registered: ${dto.email}`);
    return response;
  }

  @ApiResponse({status: 201})
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const response = await this.authService.login(dto);
    this.logger.debug(`✅ User logged in: ${dto.email}`);
    return response;
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refresh(@User() user: UserEntity) {
    const response = await this.authService.refresh(user);
    this.logger.debug(`♻️ Token refreshed for userId: ${user.id}`);
    return response;
  }

}




