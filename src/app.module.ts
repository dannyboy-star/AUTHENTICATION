import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './config/ormconfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';
import { JwtRefreshAuthGuard } from './common/jwt-refresh-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ormconfig, 
    }),
    AuthModule,
    UsersModule,
  ],
  providers:[JwtService, JwtRefreshAuthGuard]
})
export class AppModule {}


