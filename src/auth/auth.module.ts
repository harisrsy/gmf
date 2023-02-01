import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RolesGuard } from './guards/roles/roles.guard';

@Module({
  imports: [PrismaModule],
  providers: [
    AuthService,
    UserService,
    RolesGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
