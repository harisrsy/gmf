import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, RolesGuard],
})
export class UsersModule {}
