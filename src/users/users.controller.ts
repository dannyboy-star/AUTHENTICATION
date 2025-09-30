import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { User } from '../common/user.decorator'; 
import {User as UserEntity} from './user.entity'

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: UserEntity) {
    return {
      message: 'Profile fetched sucessfully',
      user,
    }
  }
}




