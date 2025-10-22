import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller,
   Get,
   UseGuards, 
   Req,
   UseInterceptors,
   ClassSerializerInterceptor 
    } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { User } from '../common/user.decorator'; 
import {User as UserEntity} from './user.entity'
import { UsersService } from './users.service';

@ApiBearerAuth('JWT-auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: UserEntity) {
    const userx = this.usersService.findById(user.id);
    return {
      message: 'Profile fetched sucessfully',
      user:userx,
   }
  }
}




