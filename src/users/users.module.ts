import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtRefreshAuthGuard } from 'src/common/jwt-refresh-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, JwtService, JwtRefreshAuthGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}




