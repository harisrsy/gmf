import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [PrismaModule],
  providers: [FollowService, JwtStrategy],
  controllers: [FollowController],
})
export class FollowModule {}
